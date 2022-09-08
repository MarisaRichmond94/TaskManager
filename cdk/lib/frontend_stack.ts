import { Stack, StackProps } from 'aws-cdk-lib';
import { AllowedMethods, Distribution, ViewerProtocolPolicy } from 'aws-cdk-lib/aws-cloudfront';
import { S3Origin } from 'aws-cdk-lib/aws-cloudfront-origins';
import { Bucket } from 'aws-cdk-lib/aws-s3';
import { BucketDeployment, Source } from 'aws-cdk-lib/aws-s3-deployment';
import { Construct } from 'constructs';

import { getBasePath } from '../utils/path';

const IDS = {
  bucket: 'www.taskmanager.com',
  bucketDeployment: 'TaskManagerClientDeploymentBucket',
  cloudFrontDistribution: 'TaskManagerCloudFrontDistribution',
};

interface FrontEndStackProps extends StackProps {
};

class FrontEndStack extends Stack {
  constructor(scope: Construct, id: string, props: FrontEndStackProps) {
    super(scope, id, props);

    const staticAssetsBucket = new Bucket(this, IDS.bucket, {
      bucketName: IDS.bucket,
      publicReadAccess: true,
      websiteIndexDocument: 'index.html',
    });

    new BucketDeployment(this, IDS.bucketDeployment, {
      sources: [Source.asset(`${getBasePath()}/client/build`)],
      destinationBucket: staticAssetsBucket,
    });

    new Distribution(this, IDS.cloudFrontDistribution, {
      defaultBehavior: {
        origin: new S3Origin(staticAssetsBucket),
        allowedMethods: AllowedMethods.ALLOW_ALL,
        viewerProtocolPolicy: ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
      },
    });
  };
};

export default FrontEndStack;
