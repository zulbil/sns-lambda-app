import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

import schema from './schema';

const processHandler: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  try {
    return formatJSONResponse({
      'message': 'Order process',
      event
    });
  } catch (error) {
    return formatJSONResponse({
      message : error.message
    }, 500); 
  }
};


const notifyHandler: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  try {
    return formatJSONResponse({
      'message': 'Order process',
      event
    });
  } catch (error) {
    return formatJSONResponse({
      message : error.message
    }, 500); 
  }
};


const process = middyfy(processHandler);
const notify = middyfy(notifyHandler);

export { process, notify }


