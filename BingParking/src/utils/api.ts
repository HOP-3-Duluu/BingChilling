import axios from "axios";
import { apiUrl } from "../../env";

export const AWSAPI = axios.create({
    baseURL: apiUrl,
    headers: {'Access-Control-Allow-Origin': '*'}
}); 

export default AWSAPI;