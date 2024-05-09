const baseIp = 'localhost'
const basePort = 8686

const requestConfig = {
    baseURL: 'http://' + baseIp + ':' + basePort + '/ql/chat/',
    socketURL: 'ws://' + baseIp + ':' + basePort + '/ql/chat/ws',
    timeout: 10000
}

const constant = {
    SEND_CHAT_HISTORY: 101,
    DELETE_CHAT_HISTORY: 102,
}

export default {
    constant,
    requestConfig,
}
