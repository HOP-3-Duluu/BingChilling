import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { dynamoClient, headers } from "../utils";

export const ParkingSpots = async(e: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
   //Status: 1. OnGoing , 2. Completed , 3. Cancelled
   // console.log(date.includes('Today') ? date : moment(new Date(date)).format('LL')); 
   // const date = moment(new Date('2023-4-19')).calendar(); 
   return {
      statusCode: 200,
      headers: headers,
      body: ''
   };
};