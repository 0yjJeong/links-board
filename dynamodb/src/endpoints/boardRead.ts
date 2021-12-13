import urlMetadata from 'url-metadata';
import type { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { TableName } from '../common/config';
import dynamoClient from '../common/dynamoClient';
import lambda from '../common/lambda';

const readBoardHandler = async (event) => {
  if (event.pathParameters.id) {
    try {
      const { id } = event.pathParameters;
      const params: DocumentClient.GetItemInput = {
        Key: {
          id,
        },
        TableName,
      };
      const data = await dynamoClient.get(params).promise();
      data.Item.elements = await Promise.all(
        data.Item.elements.map(async (card) => {
          if (card.url) {
            const result: urlMetadata.Result = await urlMetadata(card.url);
            return {
              ...card,
              data: {
                image: result.image,
                title: result.title,
                description: result.description,
              },
            };
          }
          return card;
        })
      );
      const response = {
        body: JSON.stringify(data),
        statusCode: 200,
      };
      return { response, error: null };
    } catch (error) {
      const response = {
        body: JSON.stringify(error),
        statusCode: 500,
      };
      return { response, error };
    }
  } else {
    const response = {
      body: JSON.stringify({
        message: 'Missing the id from the path',
      }),
      statusCode: 400,
    };
    return { response, error: null };
  }
};

export const readBoard = lambda(readBoardHandler);
