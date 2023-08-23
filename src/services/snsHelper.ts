import { SNSClient, PublishCommand } from '@aws-sdk/client-sns';

const snsClient = new SNSClient({ region: 'us-east-1' }); // Set your desired region
const TopicArn = 'arn:aws:sns:us-east-1:864500403850:OrderNotifications';

export const publishToSNS = async (Message: string): Promise<void> => {
  try {
    const snsParams = {
      TopicArn,
      Message
    };

    const publishCommand = new PublishCommand(snsParams);
    await snsClient.send(publishCommand);

    console.log('Message published to SNS successfully');
  } catch (error) {
    console.error('Error publishing message to SNS:', error);
    throw error;
  }
};
