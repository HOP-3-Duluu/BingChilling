import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { dynamoClient, headers } from "../utils";

export const getLocs = async(e: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    
    let datas: any;
    try {
       const params = {
          TableName: 'locations'
       }; 

       await dynamoClient.scan(params).then((res) => {
          datas = res?.Items;
       });
    } catch(e) {
        console.log(e);
    }
    return {
       statusCode: 200,
       headers: headers,
       body: JSON.stringify({data: datas})
    };
};