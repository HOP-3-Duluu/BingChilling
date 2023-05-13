import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

export const notifications = async(e: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => { 
    //types: payment , parkings , account   
    return {
       statusCode: 200,
       body: ''
    };
};