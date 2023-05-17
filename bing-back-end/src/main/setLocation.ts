import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { dynamoClient, headers, s3Client, uid } from "../utils";
import { marshall } from "@aws-sdk/util-dynamodb";

export const setLocation = async(e: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const { lat , lon , photos , phone , name , adrs , time } = JSON.parse(e?.body as string); 
    const picId = uid.slice(0 , 4);

    try {

       const s3Params = {
         Bucket: 'bing-bucket01', 
         Key: `users/${picId}.jpeg`, 
         Body: Buffer.from(photos.replace(/^data:image\/\w+;base64,/, ""), "base64"),
         ContentType: "image/jpeg", 
         ACL: 'public-read' 
        };

        await s3Client.putObject(s3Params).then(async() => {
            const locParams = {
               TableName: 'locations', 
               Item: marshall({
                 id: uid.slice(0, 4),
                 locationId: e?.pathParameters?.id, 
                 photos: `https://bing-bucket01.s3.ap-northeast-2.amazonaws.com/users/${picId}.jpeg`, 
                 phone: phone, 
                 name: name,
                 address: adrs,
                 lat: lat,
                 lon: lon,
               })
            }; 
            await dynamoClient.putItem(locParams).then((res) => {
               console.log(res);
            }); 
        })

    } catch(e) {
        console.log(e);
    }
    return {
        statusCode: 200,
        headers: headers,
        body: `Location has been added!`
    };
};