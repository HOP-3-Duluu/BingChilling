import { APIGatewayProxyEvent , APIGatewayProxyResult } from "aws-lambda";
import { dynamoClient, env, pv, s3Client } from "../utils";
import moment = require("moment");
// env;
export const createUsr = async(e: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const { fname , name , date , mail , phone , pic , gender } = JSON.parse(e?.body as string);
    try {
        // console.log(date.includes('Today') ? date : moment(new Date(date)).format('LL')); 
        // const date = moment(new Date('2023-4-19')).calendar(); 
    } catch(err) {
        console.log(err);
    }
    return {
        statusCode: 200,
        body: 'Transfer'
    };  
};  
