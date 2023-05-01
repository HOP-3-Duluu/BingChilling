import { SQSEvent } from "aws-lambda"

export const NotifSqs = async(e: SQSEvent) => {
    try {
        console.log(e?.Records[0]?.body);
    } catch(err) {
        console.log(err); 
    };
};