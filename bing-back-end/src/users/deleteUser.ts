import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda"
import { dynamoClient, headers, s3Client } from "../utils";
import { marshall , unmarshall } from "@aws-sdk/util-dynamodb";

export const deleteUser = async(e: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    
    try {
       const params = {
          TableName: 'users', 
          Key: marshall({userId: e?.pathParameters?.id as string})
       };

       await dynamoClient.getItem(params).then(async(res) => {
          if(res?.Item != undefined) {
              const items = unmarshall(res?.Item);
              const s3Params = {
                Bucket: 'bing-bucket01', 
                Key: `${items?.photo.slice(items?.photo?.length - 16)}`
              };
              await s3Client.deleteObject(s3Params).then(async() => {
                 await dynamoClient.deleteItem(params);
              });
          };
       });
    } catch(e){
       console.log(e);
    };
    return {
        statusCode: 200,
        headers: headers,
        body: `User: ${e?.pathParameters?.id} has been deleted!`
    }; 
}; 