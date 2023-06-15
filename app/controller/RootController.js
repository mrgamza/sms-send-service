export async function hi(_, response) {
    return response
        .status(200)
        .end('Hi! sms-send-service')
}
