export async function hi(_, response) {
    response
        .status(200)
        .end('Hi! sms-send-service')
}
