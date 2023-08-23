import schema from './schema';
import { handlerPath } from '@libs/handler-resolver';

export const orderProcessor =  {
  handler: `${handlerPath(__dirname)}/handler.process`,
  events: [
    {
      http: {
        method: 'post',
        path: 'orders',
        request: {
          schemas: {
            'application/json': schema,
          }
        }
      }
    }
  ]
};

export const orderNotifier = {
  handler: `${handlerPath(__dirname)}/handler.notify`,
  events: [
    {
      sns: {
        topicName: 'OrderNotifications'
      }
    }
  ]
};
