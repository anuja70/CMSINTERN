import { STATUS_CODES } from "../constans/statusCode.js";

export const successResponse = (
    res,
    message,
    data = null,
    statusCode = STATUS_CODES.OK
) => {
    return res.status(statusCode).json({
        success: true,
        message,
        data
    });
};


// Created response
export const createdResponse = (
    res,
    message,
    data = null
) => {
    return successResponse(
        res,
        message,
        data,
        STATUS_CODES.CREATED
    );
};


// Error response
export const errorResponse = (
    res,
    error,
    statusCode = STATUS_CODES.INTERNAL_SERVER_ERROR,
    errors = null
) => {
    return res.status(statusCode).json({
        success: false,
        message: error.message || error,
        errors
    });
};