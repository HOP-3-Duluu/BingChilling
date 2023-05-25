import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { dynamoClient, headers } from "../utils";
import { marshall } from "@aws-sdk/util-dynamodb";

export const deleteNotif = async(e: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

   try {
      const delParams = {TableName: 'notifications', Key: marshall({id: e?.pathParameters?.id})}; 

      await dynamoClient.deleteItem(delParams).then((res) => {
         console.log(`Deleted Notification: ${e?.pathParameters?.id}`)
      }).catch(e => console.log(e));

   } catch(e) {
      console.log(e); 
      return {
         statusCode: 503, 
         headers: headers,
         body: JSON.stringify(`Error occured: ${e?.message}`)
      }
   }
   return {
      statusCode: 200, 
      headers: headers,
      body: JSON.stringify(`Deleted!`)      
   }
}