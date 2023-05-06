import { APIGatewayProxyEvent , APIGatewayProxyResult } from "aws-lambda";
import { dynamoClient, env, pv, s3Client } from "../utils";
// console.log(date.includes('Today') ? date : moment(new Date(date)).format('LL')); 
// const date = moment(new Date('2023-4-19')).calendar(); 
// env;
export const createUsr = async(e: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const { fname , name, mail , phone , pic , gender, role } = JSON.parse(e?.body as string);
    try {
        
    } catch(err) {
        console.log(err);
    }
    return {
        statusCode: 200,
        body: 'Transfer'
    };  
};  
