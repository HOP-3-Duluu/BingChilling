import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda"

export const updateUser = async(e: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    return {
        statusCode: 200,
        body: ''
    };
};