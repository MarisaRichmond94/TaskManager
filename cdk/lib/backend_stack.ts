import { CfnOutput, Duration, Stack, StackProps } from 'aws-cdk-lib';
import * as EC2 from 'aws-cdk-lib/aws-ec2';
import * as IAM from 'aws-cdk-lib/aws-iam';
import * as RDS from 'aws-cdk-lib/aws-rds';
import { Asset } from 'aws-cdk-lib/aws-s3-assets';
import { Construct } from 'constructs';
import * as fs from 'fs';

import { getBasePath } from '../utils/path';

const IDS = {
  database: 'TaskManagerDatabase',
  databaseEndpointKey: 'TaskManagerDatabaseEndpoint',
  databaseSecretKey: 'TaskManagerDatabaseSecretName',
  ec2Instance: 'TaskManagerEC2Instance',
  TaskManagerEC2InstanceKey: 'TaskManagerEC2InstanceOutput',
  ec2Role: 'TaskManagerEC2AssumedRole',
  isolatedSubnet: 'TaskManagerIsolated',
  publicSubnet: 'TaskManagerPublic',
  securityGroup: 'TaskManagerSecurityGroup',
  serverJarAsset: 'ServerJarAsset',
  vpc: 'TaskManagerVPC',
};

interface BackEndStackProps extends StackProps {
};

class BackEndStack extends Stack {
  constructor(scope: Construct, id: string, props: BackEndStackProps) {
    super(scope, id, props);

    // initial vpc configuration
    const vpc = new EC2.Vpc(this, IDS.vpc, {
      cidr: '10.0.0.0/16',
      natGateways: 0,
      subnetConfiguration: [{
        name: IDS.publicSubnet,
        subnetType: EC2.SubnetType.PUBLIC,
        cidrMask: 24,
      },{
        name: IDS.isolatedSubnet,
        subnetType: EC2.SubnetType.PRIVATE_ISOLATED,
        cidrMask: 28,
      }],
    });

    // create an iam role that will be assumed by ec2 to setup the server via ssh
    const ec2AssumedRole = new IAM.Role(this, IDS.ec2Role, {
      assumedBy: new IAM.ServicePrincipal('ec2.amazonaws.com'),
    });

    // create security group to act as a virtual firewall for the vpc
    const securityGroup = new EC2.SecurityGroup(this, IDS.securityGroup, {
      vpc,
      allowAllOutbound: true,
      securityGroupName: IDS.securityGroup,
    });
    securityGroup.addIngressRule(
      EC2.Peer.anyIpv4(),
      EC2.Port.tcp(22),
      'allow SSH access from anywhere',
    );
    securityGroup.addIngressRule(
      EC2.Peer.anyIpv4(),
      EC2.Port.tcp(80),
      'allow HTTP traffic from anywhere',
    );
    securityGroup.addIngressRule(
      EC2.Peer.anyIpv4(),
      EC2.Port.tcp(443),
      'allow HTTPS traffic from anywhere',
    );

    // provision an ec2 instance where we will eventually run the server
    const serverJarAsset = new Asset(this, IDS.serverJarAsset, {
        path: `${getBasePath()}/server/build/libs/server-0.0.1-SNAPSHOT.jar`,
    });

    const ec2Instance = new EC2.Instance(this, IDS.ec2Instance, {
      detailedMonitoring: false,
      init: EC2.CloudFormationInit.fromConfigSets({
        configSets: {
          default: ['install', 'installServerJar'],
        },
        configs: {
          install: new EC2.InitConfig([
            EC2.InitCommand.shellCommand('yum -y update'),
            EC2.InitPackage.yum('java-11'),
          ]),
          installServerJar: new EC2.InitConfig([
            EC2.InitFile.fromExistingAsset('server.jar', serverJarAsset)
          ])
        }
      }),
      instanceName: IDS.ec2Instance,
      instanceType: EC2.InstanceType.of(EC2.InstanceClass.T2, EC2.InstanceSize.MICRO),
      keyName: `${IDS.ec2Instance}Key`,
      machineImage: new EC2.AmazonLinuxImage({
        generation: EC2.AmazonLinuxGeneration.AMAZON_LINUX_2,
      }),
      role: ec2AssumedRole,
      securityGroup,
      vpc,
      vpcSubnets: {
        subnetType: EC2.SubnetType.PUBLIC,
      },
    });

    // output endpoint for the ec2 instance that was just created so we can ssh into it to setup the server
    new CfnOutput(this, IDS.TaskManagerEC2InstanceKey, {
      value: ec2Instance.instancePublicIp,
    });

    // database configuration (rds)
    const database = new RDS.DatabaseInstance(this, IDS.database, {
      autoMinorVersionUpgrade: true,
      backupRetention: Duration.days(0),
      databaseName: IDS.database,
      deleteAutomatedBackups: true,
      deletionProtection: false,
      credentials: RDS.Credentials.fromGeneratedSecret('postgres'),
      engine: RDS.DatabaseInstanceEngine.postgres({ version: RDS.PostgresEngineVersion.VER_12 }),
      iamAuthentication: true,
      instanceType: EC2.InstanceType.of(EC2.InstanceClass.T2, EC2.InstanceSize.MICRO),
      publiclyAccessible: false,
      vpc,
      vpcSubnets: {
        subnetType: EC2.SubnetType.PRIVATE_ISOLATED,
      },
    });
    database.connections.allowFrom(ec2Instance, EC2.Port.tcp(5432));
    new CfnOutput(this, IDS.databaseEndpointKey, {
      value: database.instanceEndpoint.hostname,
    });
    new CfnOutput(this, IDS.databaseSecretKey, {
      value: database.secret?.secretName!,
    });
  };
};

export default BackEndStack;
