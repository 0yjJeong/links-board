import type { DocumentClient } from 'aws-sdk/clients/dynamodb';
import dynamoClient from '../common/dynamoClient';
import lambda from '../common/lambda';
import bodyParser from '../common/bodyParser';
import { TableName } from '../common/config';
import { headers } from '../common/headers';

const createBoardHandler = async (event) => {
  const body = bodyParser(event);

  if (body) {
    try {
      const params: DocumentClient.PutItemInput = {
        Item: body,
        TableName,
      };

      await dynamoClient.put(params).promise();

      const response = {
        body: JSON.stringify(params.Item),
        statusCode: 200,
        headers,
      };
      return { response, error: null };
    } catch (error) {
      const response = {
        body: JSON.stringify(error),
        statusCode: 500,
        headers,
      };
      return { response, error };
    }
  } else {
    const response = {
      body: JSON.stringify({
        input: body,
        message: 'Bad input data or missing text',
      }),
      statusCode: 422,
      headers,
    };
    return { response, error: null };
  }
};

export const createBoard = lambda(createBoardHandler);
