import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { dynamoClient, headers } from "../utils";
import { marshall } from "@aws-sdk/util-dynamodb";

export const getSpecloc = async(e: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    let data: any;
    try {
       const params = {TableName: 'locations', Key: marshall({id: e?.pathParameters?.id})}; 

       await dynamoClient.getItem(params).then((res) => {
           data = res?.Item;
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