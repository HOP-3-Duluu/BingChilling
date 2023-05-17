import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda"
import { dynamoClient, headers } from "../utils";
import { marshall } from "@aws-sdk/util-dynamodb";

export const getUser = async(e: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    let data: any;
    const params = {
        TableName: 'users', 
        IndexName: 'userId', 
        KeyConditionExpression: '#pk = :val',
        ExpressionAttributeNames: {
        '#pk': 'userId',
         },
         ExpressionAttributeValues: marshall({
        ':val': e?.pathParameters?.id as string,
         })
    }; 
    
    try {
       data = await dynamoClient.query(params);
    } catch(err) {
        console.log(err); 
    }
    return {
        statusCode: 200,
        headers: headers,
        body: JSON.stringify({data: data?.Items[0]})
    };
}; 