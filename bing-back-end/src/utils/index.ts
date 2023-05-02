import { DynamoDB } from "@aws-sdk/client-dynamodb";
import { S3 } from "@aws-sdk/client-s3";
import { SQS } from "@aws-sdk/client-sqs";
import { v4 as uuidv4 } from 'uuid';
const region = 'ap-northeast-2'; 
export const headers = {'Access-Control-Allow-Origin': '*'};
export const dynamoClient = new DynamoDB({region: region}); 
export const s3Client = new S3({region: region}); 
export const sqsClient = new SQS({region: region}); 