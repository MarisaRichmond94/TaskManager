#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';

import APIGatewayStack from '../lib/api_gateway_stack';
import BackEndStack from '../lib/backend_stack';
import FrontEndStack from '../lib/frontend_stack';

const STACK_NAMES = {
  apiGateway: 'APIGatewayStack',
  backend: 'BackEndStack',
  frontEnd: 'FrontEndStack',
};

const app = new cdk.App();
const apiGatewayStack = new APIGatewayStack(app, STACK_NAMES.apiGateway);
const backEndStack = new BackEndStack(app, STACK_NAMES.backend, {});
const frontEndStack = new FrontEndStack(app, STACK_NAMES.frontEnd, {});

apiGatewayStack.addDependency(backEndStack);
apiGatewayStack.addDependency(frontEndStack);
