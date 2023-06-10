import { StatusCodes } from 'http-status-codes'

import { ResultCode } from "../constant/ResultCode.js"


export async function make(response, status, code, message) {
    return response
        .status(status)
        .json({
            code: code,
            message: message
        })
}

export async function ok(response, message) {
    return make(response, StatusCodes.OK, ResultCode.SUCCESS, message)
}

export async function fail(response, status, message) {
    return response
        .status(status)
        .json({
            message: message
        })
}
