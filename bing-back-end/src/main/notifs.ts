import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { dynamoClient, headers, uid } from "../utils";
import { marshall } from "@aws-sdk/util-dynamodb";

export const notifications = async(e: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => { 
    //types: parkings , account 
    // console.log(date.includes('Today') ? date : moment(new Date(date)).format('LL')); 
    // const date = moment(new Date('2023-4-19')).calendar(); 
    let data: any;
    try {
        const params = {
            TableName: 'notifications', 
            indexName: 'userId', 
            KeyConditionExpression: `#pk = :val`, 
            ExpressionAttributeNames: {'#pk' : 'userId'},
            ExpressionAttributeValues: marshall({':val' : e?.pathParameters?.userId})
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