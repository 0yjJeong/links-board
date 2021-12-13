import { APIGatewayEvent, Callback, Context, Handler } from 'aws-lambda';

const lambda =
  (resolver: (e: APIGatewayEvent) => Promise<{ response; error }>): Handler =>
  (event: APIGatewayEvent, context: Context, callback?: Callback) => {
    return resolver(event).then(({ response, error }) => {
      if (error) {
        callback && callback(error);
      } else {
        callback && callback(null, response);
      }
    });
  };

export default lambda;
