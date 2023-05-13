import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda"
import { dynamoClient, headers } from "../utils";
import { marshall } from "@aws-sdk/util-dynamodb";

export const getUser = async(e: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    let data: any;
    try {
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

       data = await dynamoClient.query(params); 
    } catch(e) {
        console.log(e);
    }
    return {
        statusCode: 200,
        headers: headers,
        body: JSON.stringify({data: data?.Items[0]})
    };
}; 