# Setup
https://docs.aws.amazon.com/cdk/v2/guide/home.html
To get started using this CDK package:
1) Download and install the AWS CLI https://aws.amazon.com/cli/
2) Configure your workstation with your AWS Credentials
    -- Sign into AWS with your development account
    -- Click your name in the top right corner -> then click security credentials
    -- Expand the accordion that says "Access keys (access key ID and secret access key)"
    -- Create a new access key and download the key (please don't close the popup after you create the key)
    -- In a new terminal, run "aws configure" and input the access key information you just created. You can leave the "output format" prompt blank.
3) run >> npm -g install typescript
       >> npm install -g aws-cdk
       >> cdk --version
4) Find your AWS account number with >> aws sts get-caller-identity
5) Replace your account number in the following commands:
       >> cdk bootstrap aws://ACCOUNT-NUMBER/us-west-2
6) Optional Steps:
    -- Install the VS Code plugin for AWS CDK: https://aws.amazon.com/visualstudiocode/
    -- Search the Constructs you can create using CDK here: https://constructs.dev

## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `cdk deploy`      deploy this stack to your default AWS account/region
* `cdk deploy --hotswap` faster deployment (if possible)
* `cdk watch` watches code for changes, and when any are found runs a hotswap deployment
* `cdk diff`        compare deployed stack with current state
* `cdk synth`       emits the synthesized CloudFormation template
