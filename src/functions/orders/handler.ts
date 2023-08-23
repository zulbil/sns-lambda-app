import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

import schema from './schema';

export const process: ValidatedEventAPIGatewayProxyEvent<typeof schema> = middyfy(async (event) => {
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
});


export const notify: ValidatedEventAPIGatewayProxyEvent<typeof schema> = middyfy(async (event) => {
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
});
