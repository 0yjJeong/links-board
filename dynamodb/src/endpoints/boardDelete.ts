import type { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { TableName } from '../common/config';
import dynamoClient from '../common/dynamoClient';
import { headers } from '../common/headers';
import lambda from '../common/lambda';

const deleteBoardHandler = async (event) => {
  if (event.pathParameters.id) {
    try {
      const { id } = event.pathParameters;
      const params: DocumentClient.DeleteItemInput = {
        Key: {
          id,
        },
        TableName,
      };
      await dynamoClient.delete(params).promise();
      const response = {
        body: JSON.stringify({
          input: id,
          message: 'Deleted successfully',
        }),
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
        message: 'Missing the id from the path',
      }),
      statusCode: 400,
      headers,
    };
    return { response, error: null };
  }
};

export const deleteBoard = lambda(deleteBoardHandler);
