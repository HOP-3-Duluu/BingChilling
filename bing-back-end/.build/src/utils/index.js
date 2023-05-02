"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sqsClient = exports.s3Client = exports.dynamoClient = exports.headers = exports.pv = exports.env = void 0;
var client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
var client_s3_1 = require("@aws-sdk/client-s3");
var client_sqs_1 = require("@aws-sdk/client-sqs");
var dotenv = require("dotenv");
exports.env = dotenv.config();
exports.pv = process === null || process === void 0 ? void 0 : process.env;
var region = 'ap-northeast-2';
exports.headers = { 'Access-Control-Allow-Origin': '*' };
exports.dynamoClient = new client_dynamodb_1.DynamoDB({ region: region });
exports.s3Client = new client_s3_1.S3({ region: region });
exports.sqsClient = new client_sqs_1.SQS({ region: region });
//# sourceMappingURL=index.js.map