export const REQUEST_METHOD = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
}

export const API = {
    LOGIN: {
        url: 'login',
        method: REQUEST_METHOD.POST
    },
    CHECK_TOKEN: {
        url: 'login/check-token',
        method: REQUEST_METHOD.GET
    },
    //
    VOCA_GET_ALL: {
        url: 'vocabulary/all',
        method: REQUEST_METHOD.GET
    }
}