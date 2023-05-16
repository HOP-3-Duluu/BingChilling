import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda"
import { dynamoClient, headers } from "../utils";
import { marshall } from "@aws-sdk/util-dynamodb";

export const getUser = async(e: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    let data: any;
    try {
        const params = {
            TableName: 'users', 
            Key: marshall({name: e?.pathParameters?.id})
        }; 

       data = await dynamoClient.getItem(params);
    } catch(e) {
        console.log(e);
    }
    return {
        statusCode: 200,
        headers: headers,
        body: JSON.stringify({data: data?.Item})
    };
}; 