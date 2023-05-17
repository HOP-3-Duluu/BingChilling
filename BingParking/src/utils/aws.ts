import { CognitoIdentityProvider } from "@aws-sdk/client-cognito-identity-provider";
import { CognitoUserPool } from "amazon-cognito-identity-js";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { access_key, access_secret, client_id, pool_id } from "../../env";

let poolData = {
	UserPoolId: pool_id as string,
	ClientId: client_id as string
};

export const asyncStorage = AsyncStorage;
export const userPool = new CognitoUserPool(poolData);
export const cognitoClient = new CognitoIdentityProvider({ region: "ap-northeast-2", credentials: {accessKeyId: access_key as string, secretAccessKey: access_secret as string}});