import { STATUS_CODES } from "../constans/statusCode.js";
import { errorResponse } from "../utils/response.js";
import { MESSAGES } from "../constans/message.js";

export const validate = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body, {
            abortEarly: false
        });

        if (error) {
            const errors = error.details.map((detail) => detail.message);

            return errorResponse(
                res,
                new Error(MESSAGES.VALIDATION_FAILED),
                STATUS_CODES.BAD_REQUEST,
                errors
            );
        }

        next();
    };
};