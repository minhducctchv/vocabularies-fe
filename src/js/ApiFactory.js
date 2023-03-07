import axios from 'axios'
import {getToken} from "@/js/Token";
import {REQUEST_METHOD} from "@/js/ConstantApi";

axios.defaults.baseURL = 'https://vocabularies-be.herokuapp.com';

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
            'minhducctchv': getToken()
        },
        params: param
    })
}

async function callPost(url, param, body, isPost = true) {
    return axios[isPost ? 'post' : 'put'](url, body,
        {
            headers: {
                'minhducctchv': getToken()
            },
            params: param
        })
}

async function callDelete(url, param) {
    return axios.delete(url, {
        headers: {
            'minhducctchv': getToken()
        },
        params: param
    })
}