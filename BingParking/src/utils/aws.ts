import { CognitoIdentityProvider } from "@aws-sdk/client-cognito-identity-provider";
import { CognitoUserPool } from "amazon-cognito-identity-js";
import AsyncStorage from '@react-native-async-storage/async-storage';

let poolData = {
	UserPoolId: '' as string,
	ClientId: '' as string
};

export const asyncStorage = AsyncStorage;
export const userPool = new CognitoUserPool(poolData);
export const cognitoClient = new CognitoIdentityProvider({ region: "ap-northeast-2", credentials: {accessKeyId: `` as string, secretAccessKey: `` as string}});