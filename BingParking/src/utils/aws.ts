import { CognitoIdentityProvider } from "@aws-sdk/client-cognito-identity-provider";
import { CognitoUserPool } from "amazon-cognito-identity-js";

// let poolData = {
// 	UserPoolId: process?.env.POOL_ID as string,
// 	ClientId: process?.env.CLIENT_ID as string,
// };

// export const userPool = new CognitoUserPool(poolData);
// export const cognitoClient = new CognitoIdentityProvider({ region: "ap-northeast-2", credentials: {accessKeyId: process.env.AWS_ACCESS_KEY as string, secretAccessKey: process.env.AWS_SECRET_KEY as string}});