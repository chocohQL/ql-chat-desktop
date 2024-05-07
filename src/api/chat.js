import request from "../utils/request.js";

export async function listChatHistory(userId, targetId, type) {
    return await request({
        method: 'GET',
        url: 'chat/listChatHistory?userId=' + userId + "&targetId=" + targetId + "&type=" + type
    })
}

export async function lisConversation(userId) {
    return await request({
        method: 'GET',
        url: 'chat/lisConversation?userId=' + userId
    })
}
