import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { dynamoClient } from "../utils";

export const setLocation = async(e: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    //tbc 
    return {
        statusCode: 200,
        body: ''
    };
};