import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import schema from './schema';
import { createLogger } from '@libs/logger';
import { publishToSNS } from 'src/services/snsHelper';
import { SNSEvent, SNSEventRecord } from 'aws-lambda';

const logger = createLogger('orderLogging');

const processHandler: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  try {
    const request = event.body

    logger.info('Receiving body parameters', { body: request });

    const Message = JSON.stringify({
      id: Date.now(),
      orderStatus: 'Shipped',
      phoneNumber: request.phone_number
    }); 

    logger.info('Sending message to SNS', { Message })

    await publishToSNS(Message);

    return formatJSONResponse({
      'message': 'Order process',
      event
    });
  } catch (error) {
    logger.error('Error occured', { error })
    return formatJSONResponse({
      message : error.message
    }, 500); 
  }
};


export const notify = async (event: SNSEvent) => {
  try {
    const record: SNSEventRecord = event.Records[0];
    logger.info('Reading event', { event })
    
    const message = JSON.parse(record.Sns.Message);

    logger.info('Reading message to SNS', { message })
    
  } catch (error) {
    logger.error('Error occured', { error }) 
  }
};


const process = middyfy(processHandler);

export { process }


