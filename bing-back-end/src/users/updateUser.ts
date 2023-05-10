import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda"
import { dynamoClient, headers } from "../utils";
import { marshall } from "@aws-sdk/util-dynamodb";

export const updateUser = async(e: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

    const { fName , name , mail , phone , gender } = JSON.parse(e?.body as string);

    try {
       const params = {
          TableName: 'users', 
          Key: marshall({userId: e?.pathParameters?.id}), 
          UpdateExpression: "SET fullName = :flName, name = :name, email = :mail, phone = :num, gender = :gen", 
          ExpressionAttributeValues: marshall({
            ':flName': fName,':name': name,':mail': mail,':num': phone,':gen': gender})
          };
       await dynamoClient.updateItem(params).then((res) => {
          console.log(res);
       }).catch(err => console.log(err));
    } catch(e) {
        console.log(e);
    }
    return {
        statusCode: 200,
        headers: headers,
        body: `User ${e?.pathParameters?.id} has been updated!`
     };
};