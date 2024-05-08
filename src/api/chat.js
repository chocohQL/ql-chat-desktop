import request from "../utils/request.js";

export async function listChatHistory(userId, targetId, type) {
    return request({
        method: 'GET',
        url: 'chat/listChatHistory?userId=' + userId + "&targetId=" + targetId + "&type=" + type
    })
}

export async function lisConversation(userId) {
    return request({
        method: 'GET',
        url: 'chat/lisConversation?userId=' + userId
    })
}

export async function sendChatHistory(data) {
    return request({
        method: 'POST',
        url: 'chat/sendChatHistory',
        data: JSON.stringify(data)
    });
}
