import { APIGatewayProxyResult, APIGatewayProxyEvent } from "aws-lambda";
import { env, headers, pv, sqsClient } from "../utils";
env

module.exports.mainSqsHandler = async (e: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const { userId , type , msg , status , dataId } = JSON.parse(e?.body as string);
    const params = {
        QueueUrl: pv.SQS,
        MessageBody: Buffer.from(JSON.stringify({ userId: userId, type: type, msg: msg , status: status , dataId: dataId})) as any
    };

    try {
        await sqsClient.sendMessage(params);
    } catch (err) {
        console.log(err);
    };

    return {
        statusCode: 200,
        headers: headers,
        body: JSON.stringify('Sent to SQS Service.'),
    };
};