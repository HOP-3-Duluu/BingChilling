import { APIGatewayProxyEvent , APIGatewayProxyResult } from 'aws-lambda';

export const HelloBing = async (e: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    return {
        statusCode: 200,
        body: JSON.stringify(`Hello from Bing!`)
    };
};