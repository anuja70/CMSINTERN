import { validationResult } from "express-validator";
import { errorResponse } from "../utils/response.js";
import { BAD_REQUEST } from "../constans/statusCodes.js";
import { MESSAGES } from "../constans/messages.js";

export const validate = (req, res, next) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return errorResponse(
                res,
                new Error(errors.array()[0].msg),
                BAD_REQUEST
            );
        }

        next();
    } catch (error) {
        console.log("Validation middleware error:", error);

        return errorResponse(
            res,
            new Error(MESSAGES.INTERNAL_SERVER_ERROR),
            500
        );
    }
};