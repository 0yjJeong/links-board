import { APIGatewayEvent } from 'aws-lambda';

const bodyParser = (event: APIGatewayEvent) => {
  let body = null;
  if (event.body) {
    try {
      body = JSON.parse(event.body);
    } catch (e) {
      console.log('Invalid body', e);
    }
  } else {
    console.log('Body is not in the event');
  }
  return body;
};

export default bodyParser;
