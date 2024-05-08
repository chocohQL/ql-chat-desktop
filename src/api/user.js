import request from "../utils/request.js";

export async function login(data) {
    return request({
        method: 'POST',
        url: 'user/login',
        data: JSON.stringify(data)
    })
}

export async function logout() {
    return request({
        method: 'POST',
        url: 'user/logout'
    })
}

export async function me() {
    return request({
        method: 'GET',
        url: '/user/me'
    })
}
