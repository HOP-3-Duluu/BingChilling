import { marshall } from "@aws-sdk/util-dynamodb";
import { SQSEvent } from "aws-lambda"
import { dynamoClient, uid } from "../utils";
import { v4 as uuidv4 } from 'uuid';

export const NotifSqs = async(e: SQSEvent) => {

    const { userId , type , msg , status , dataId } = JSON.parse(e?.Records[0]?.body as string);

    try {
        if(userId != undefined && type != undefined && msg != null) {
            const params = {
                TableName: 'notifications', 
                Item: marshall({
                    id: uuidv4().slice(0 , 2),
                    userId: userId, 
                    type: type,
                    context: msg,
                    when: new Date().toISOString()
                })}; 
        
            await dynamoClient.putItem(params).then((res) => {console.log(res)});
        }
        else {
            if(userId != undefined && status != undefined && dataId != undefined) {
                const params = {
                    TableName: 'parkings',
                    Item: marshall({
                       id: uid.slice(0 , 2),
                       userId: userId,
                       datas: dataId, 
                       status: 'active'
                    })
                };

                await dynamoClient.putItem(params).then((res) => {console.log(res)}) 
            }

            else if(userId != undefined && status == 'confirmed') {
                const updateParams = {
                    TableName: "parkings", 
                    Key: marshall({userId: userId}), 
                    UpdateExpression: "SET status = :stat", 
                    ExpressionAttributeValues: marshall({
                    ':stat': status,
                   }),
                 }; 

                 await dynamoClient.updateItem(updateParams).then((res) => {
                     console.log(res);
                 });
            }
            else if(userId != undefined && status == 'cancelled') {
                const updateParams = {
                    TableName: "parkings", 
                    Key: marshall({userId: userId}), 
                    UpdateExpression: "SET status = :stat", 
                    ExpressionAttributeValues: marshall({
                    ':stat': status,
                   }),
                 }; 

                 await dynamoClient.updateItem(updateParams).then((res) => {
                     console.log(res);
                 });
            }
        }
    } catch(err) {
        console.log(err); 
    };
};