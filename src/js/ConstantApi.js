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
    },
    VOCA_SEARCH: {
        url: 'vocabulary',
        method: REQUEST_METHOD.GET
    },
    VOCA_DELETE: {
        url: 'vocabulary',
        method: REQUEST_METHOD.DELETE
    },
    VOCA_CREATE: {
        url: 'vocabulary',
        method: REQUEST_METHOD.POST
    },
    VOCA_UPDATE: {
        url: 'vocabulary',
        method: REQUEST_METHOD.PUT
    }
}