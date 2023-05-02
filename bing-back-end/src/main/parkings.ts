import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { dynamoClient } from "../utils";

export const ParkingSpots = async(e: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
   //Status: 1. OnGoing , 2. Completed , 3. Cancelled
   return {
      statusCode: 200,
      body: ''
   };
};