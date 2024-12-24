import axios from "axios";

// import { getToken } from '../helpers/storage';
import { Numbering } from "../constants";

const BASE_API_URL =
  Numbering.ENV === "test"
    ? "http://149.28.151.182:4242/api/v1/"
    : "https://bhdc.ct-bvntd.gov.vn/api/v1/";
export const apiRoot = axios.create({
  baseURL: BASE_API_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
    Accept: "*/*",
    Connection: "keep-alive",
  },
  // httpsAgent
});

export const apiRootVCCA = axios.create({
  timeout: 30000,
});

// export const postVCCA = (soapAction) => {
//     try{
//         return axios.post(
//                             BASE_API_URL_VCCA,
//                             null,
//                             {
//                                 "Content-Type": "text/xml; charset=utf-8",
//                                 "SOAPAction": soapAction
//                             }
//                         );
//     }catch(error){
//         console.warn(error);
//     }
// }
