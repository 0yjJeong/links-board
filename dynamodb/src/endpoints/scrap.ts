import urlMetadata from 'url-metadata';
import type { DocumentClient } from 'aws-sdk/clients/dynamodb';
import dynamoClient from '../common/dynamoClient';
import lambda from '../common/lambda';
import bodyParser from '../common/bodyParser';
import { TableName } from '../common/config';
import { headers } from '../common/headers';

const scrapHandler = async (event) => {
  const body = bodyParser(event);
  if (body) {
    try {
      const { id } = event.pathParameters;
      const metadata = await urlMetadata(body.url);
      const params: DocumentClient.UpdateItemInput = {
        TableName,
        Key: {
          id,
        },
        UpdateExpression: `set elements = list_append(if_not_exists(elements, :empty_list), :card)`,
        ExpressionAttributeValues: {
          ':empty_list': [],
          ':card': [body],
        },
        ReturnValues: 'UPDATED_NEW',
      };
      await dynamoClient.update(params).promise();
      const response = {
        body: JSON.stringify({
          title: metadata.title,
          description: metadata.description,
          image: metadata.image,
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
        input: event.body,
        message: 'Bad input data or missing text',
      }),
      statusCode: 422,
      headers,
    };
    return { response, error: null };
  }
};

export const scrap = lambda(scrapHandler);
