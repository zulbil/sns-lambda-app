import type { AWS } from '@serverless/typescript';

import { orderNotifier, orderProcessor } from '@functions/orders';

const serverlessConfiguration: AWS = {
  service: 'sns-lambda-app',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild'],
  provider: {
    name: 'aws',
    runtime: 'nodejs18.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    },
  },
  // import the function via paths
  functions: { 
    orderNotifier: {
      ...orderNotifier,
      role: 'OrderProcessorRole'
    },
    orderProcessor: {
      ...orderProcessor,
      role: 'OrderProcessorRole'
    }
  },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node18',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
  },
  resources: {
    Resources: {
      OrderNotifications: {
        Type: 'AWS::SNS::Topic',
        Properties: {
          DisplayName: 'Order Notifications'
        }
      },
      OrderProcessorRole: {
        Type: 'AWS::IAM::Role',
        Properties: {
          RoleName: 'OrderProcessorRole',
          AssumeRolePolicyDocument: {
            Version: '2012-10-17',
            Statement: [
              {
                Effect: 'Allow',
                Principal: {
                  Service: 'lambda.amazonaws.com',
                },
                Action: 'sts:AssumeRole'
              }
            ]
          },
          Policies: [
            {
              PolicyName: 'OrderProcessorPolicy',
              PolicyDocument: {
                Version: '2012-10-17',
                Statement: [
                  {
                    Effect: 'Allow',
                    Action: ['sns:Publish'],
                    Resource: ['*']
                  },
                  {
                    Effect: "Allow",
                    Action: [
                      "logs:CreateLogGroup",
                      "logs:CreateLogStream",
                      "logs:PutLogEvents"
                    ],
                    Resource: ["arn:aws:logs:*:*:*"]
                  }
                ]
              }
            }
          ]
        }
      }
    }
  }
};

module.exports = serverlessConfiguration;
