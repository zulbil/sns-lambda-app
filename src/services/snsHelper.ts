import { SNSClient, PublishCommand } from '@aws-sdk/client-sns';

const snsClient = new SNSClient({ region: 'us-east-1' }); // Set your desired region

export const publishToSNS = async (topicArn: string, message: string): Promise<void> => {
  try {
    const snsParams = {
      TopicArn: topicArn,
      Message: message,
    };

    const publishCommand = new PublishCommand(snsParams);
    await snsClient.send(publishCommand);

    console.log('Message published to SNS successfully');
  } catch (error) {
    console.error('Error publishing message to SNS:', error);
    throw error;
  }
};
