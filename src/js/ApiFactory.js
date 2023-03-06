import axios from 'axios'
import {getToken} from "@/js/Token";
import {REQUEST_METHOD} from "@/js/ConstantApi";

const TOKEN_FIELD = 'minhducctchv'

axios.defaults.baseURL = 'http://localhost:8080';

export async function callApi(api, param, body) {
    switch (api.method) {
        case REQUEST_METHOD.GET: return callGet(api.url, param).then(rs => rs.data)
        case REQUEST_METHOD.POST: return callPost(api.url, param, body).then(rs => rs.data)
        case REQUEST_METHOD.PUT: return callPost(api.url, param, body, false).then(rs => rs.data)
        case REQUEST_METHOD.DELETE: return callDelete(api.url, param).then(rs => rs.data)
    }
}

async function callGet(url, param) {
    return axios.get(url, {
        headers: {
            TOKEN_FIELD: getToken()
        },
        params: param
    })
}

async function callPost(url, param, body, isPost = true) {
    return axios[isPost ? 'post' : 'put'](url, body,
        {
            headers: {
                TOKEN_FIELD: getToken()
            },
            params: param
        })
}

async function callDelete(url, param) {
    return axios.delete(url, {
        headers: {
            TOKEN_FIELD: getToken()
        },
        params: param
    })
}