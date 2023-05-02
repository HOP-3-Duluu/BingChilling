import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { dynamoClient } from "../utils";

export const getLocs = async(e: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    return {
       statusCode: 200,
       body: ''
    };
};