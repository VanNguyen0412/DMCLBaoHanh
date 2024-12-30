import axios from "axios";

const username = 'nam';
const password = '123456';
export const basicAuth = `Basic ${btoa(`${username}:${password}`)}`;
const BASE_URL = 'http://112.78.12.245:8999'

export const endpoints = {
    'site': '/sysLogin/'
};
export const authAPI = () => {
    return axios.create({
        baseURL: BASE_URL,
        headers: {
            Authorization: basicAuth,
            ContentType: 'application/json'
        },
    });
};

export default axios.create({
    baseURL: BASE_URL,
});