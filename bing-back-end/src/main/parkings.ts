import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { dynamoClient, headers, uid } from "../utils";
import { marshall } from "@aws-sdk/util-dynamodb";

export const ParkingSpots = async(e: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

   const params = {
      TableName: `parkings`, 
      Index: 'userId',
      KeyConditionExpression: '#pk = :val',
      ExpressionAttributeNames: {'#pk': 'userId'}, 
      ExpressionAttributeValues: marshall({':val' : e?.pathParameters?.userId})
   };

   try {
      await dynamoClient.query(params).then((res) => {
         console.log(res?.Items);
      });
   } catch(e) {
      console.log(e?.message);
      return {
          statusCode: 503,
          headers: headers,
          body: JSON.stringify(`Error Occured: ${e?.message}`)
      };
   }

   return {
      statusCode: 200,
      headers: headers,
      body: JSON.stringify(`Parkings Spot for user: ${e?.pathParameters?.userId}`)
   };
};