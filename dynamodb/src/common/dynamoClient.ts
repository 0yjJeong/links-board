import { DynamoDB } from 'aws-sdk';

let options = {};
if (process.env.NODE_ENV === 'development') {
  options = {
    region: process.env.API_HOST,
    endpoint: process.env.API_URI,
  };
}

const dynamoClient = new DynamoDB.DocumentClient(options);

export default dynamoClient;
