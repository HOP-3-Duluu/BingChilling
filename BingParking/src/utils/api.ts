import axios from "axios";

export const AWSAPI = axios.create({
    baseURL: ``,
    headers: {'Access-Control-Allow-Origin': '*'}
}); 

export default AWSAPI;