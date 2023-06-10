import StatusCodes from 'http-status-codes'
import Axios from 'axios'
import CryptoJS from 'crypto-js'

import * as ResponseHelper from '../helper/ResponseHelper.js'
import { ResultCode } from '../constant/ResultCode.js'


export async function send(request, response) {
    const body = request.body
    const message = body.message
    const phoneNumber = body.phoneNumber

    if (message == undefined) {
        return ResponseHelper.fail(response, StatusCodes.BAD_REQUEST, 'Missing parameter')
    }

    if (phoneNumber == undefined) {
        return ResponseHelper.fail(response, StatusCodes.BAD_REQUEST, 'Missing parameter')
    }

    const result = await send_message(message, phoneNumber)
    const status = result.status || 500
    if (status == 202) {
        return ResponseHelper.make(response, status, ResultCode.SUCCESS, 'SMS sent successfully')
    } else {
        return ResponseHelper.make(response, status, ResultCode.EXTERNAL_ERROR, 'SENS service error')
    }
}

async function send_message(message, phoneNumber) {
    const serviceId = process.env.SENS_SERVICE_ID
    const secretKey = process.env.SENS_SECRET_KEY
    const accessKey = process.env.SENS_ACCESS_KEY
    const myNumber = process.env.SENS_MY_NUMBER
    
    const api = `/sms/v2/services/${serviceId}/messages`
    const date = Date.now().toString()

    const signature = makeSignature(api, date, accessKey, secretKey)

    return await Axios({
        method: 'POST',
        url: `https://sens.apigw.ntruss.com${api}`,
        headers: {
            'Contenc-type': 'application/json; charset=utf-8',
            'x-ncp-iam-access-key': accessKey,
            'x-ncp-apigw-timestamp': date,
            'x-ncp-apigw-signature-v2': signature,
        },
        data: {
            type: 'SMS',
            countryCode: '82',
            from: myNumber,
            content: message,
            messages: [
                { to: `${phoneNumber}`, }
            ]
        }
    })
}

function makeSignature(api, date, accessKey, secretKey) {
    const space = ' '
    const newLine = '\n'

    const hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, secretKey);
    hmac.update('POST')
    hmac.update(space)
    hmac.update(api)
    hmac.update(newLine)
    hmac.update(date)
    hmac.update(newLine)
    hmac.update(accessKey)
    const hash = hmac.finalize()
    return hash.toString(CryptoJS.enc.Base64)
}