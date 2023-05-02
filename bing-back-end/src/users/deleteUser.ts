import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda"

export const deleteUser = async(e: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    
    return {
        statusCode: 200,
        body: ''
    }; 
}; 