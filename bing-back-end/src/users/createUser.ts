import { APIGatewayProxyEvent , APIGatewayProxyResult } from "aws-lambda";
<<<<<<< Updated upstream
import { dynamoClient, env, headers, pv, s3Client } from "../utils";
import { v4 as uuidv4 } from 'uuid';
import { marshall } from "@aws-sdk/util-dynamodb";
// env;
export const createUsr = async(e: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const { fname , name, mail , phone , pic , gender, role } = JSON.parse(e?.body as string);
    const uid = uuidv4();
    try {
        const s3Params = {
            Bucket: 'bing-bucket01', 
            Key: `users/${uid.slice(0, 4)}.jpeg`, 
            Body: Buffer.from(pic.replace(/^data:image\/\w+;base64,/, ""), "base64"),
            ContentType: "image/jpeg", 
            ACL: 'public-read' 
        };
        await s3Client.putObject(s3Params).then(async(res) => {
            const params = {
                TableName: 'users', 
                Item: marshall({
                  userId: uid.slice(0, 5),
                  fullName: fname,
                  name: name,
                  email: mail,
                  phone: phone,
                  photo: `https://bing-bucket01.s3.ap-northeast-2.amazonaws.com/users/${uid}.jpeg`, 
                  gender: gender,
                  type: role,
                })
            };
            await dynamoClient.putItem(params).then(() => {
                console.log(`Created in dynamo Table`);
            }).catch(err => console.log(err));
        });
=======
import { dynamoClient, env, pv, s3Client, uid } from "../utils";
import { marshall } from '@aws-sdk/util-dynamodb';
// env;
// console.log(date.includes('Today') ? date : moment(new Date(date)).format('LL')); 
// const date = moment(new Date('2023-4-19')).calendar(); 
export const createUsr = async(e: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const { fname , name , mail , phone , pic , gender , role } = JSON.parse(e?.body as string);
    try {
        const params = {
        Bucket: 'fs-bucket01', 
        Key: `users/${uid}.jpeg`, 
        Body: Buffer.from(pic.replace(/^data:image\/\w+;base64,/, ""), "base64"),
        ContentType: "image/jpeg", 
        ACL: 'public-read' 
        };
        
        await s3Client.putObject(params).then(async() => {
            const params1 = {
                TableName: 'users',
                Item: marshall({
                 fullname : fname,
                 name: name,
                 email: mail,
                 phone: phone,
                 photo: `https://fs-bucket01.s3.ap-northeast-2.amazonaws.com/users/${uid}.jpeg`,
                 gender: gender,
                 role: role
                })
            };
            await dynamoClient.putItem(params1).then(() => {
                console.log(`Sent.`); 
            });        
        });

>>>>>>> Stashed changes
    } catch(err) {
        console.log(err);
    }
    return {
        statusCode: 200,
        headers: headers,
        body: `User has been created!`
    };  
};  
