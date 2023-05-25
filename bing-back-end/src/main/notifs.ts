import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { dynamoClient, headers, uid } from "../utils";
import { marshall } from "@aws-sdk/util-dynamodb";

export const notifications = async(e: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => { 

    let data: any;
    try {
        const params = {
            TableName: 'notifications', 
            IndexName: 'userId', 
            KeyConditionExpression: 'userId = :val', 
            ExpressionAttributeValues: marshall({':val' : e?.pathParameters?.userId as string}),
            ScanIndexForward: true,
        };
        
        await dynamoClient.query(params).then((res) => {
            data = res?.Items;
        });
        
    } catch(e) {
        console.log(e);
        return {
            statusCode: 503,
            headers: headers,
            body: JSON.stringify(`Error occured: ${e}`)
        };
    };

    return {
       statusCode: 200,
       headers: headers,
       body: JSON.stringify({data: data})
    };
};