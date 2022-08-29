import { Stack, StackProps } from 'aws-cdk-lib';
import { RestApi } from 'aws-cdk-lib/aws-apigateway';
import { Construct } from 'constructs';

class APIGatewayStack extends Stack {
  apiGateway: RestApi;

  constructor (scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);
    this.apiGateway = new RestApi(this, 'AppGateway');
    this.apiGateway.root.addResource('hello_world').addMethod('GET');
  };
};

export default APIGatewayStack;
