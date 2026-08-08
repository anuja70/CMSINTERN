import { STATUS_CODES } from "../constans/statusCode.js";
import { MESSAGES } from "../constans/message.js";
import { verifyACCESSTOKEN } from "../utils/jwt.js";
import { errorResponse } from "../utils/response.js";
import { prisma } from "../config/database.js";

export const authenticate = async (req, res, next) => {
    try {
        // Get token from Authorization header
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            return errorResponse(
                res,
                new Error(MESSAGES.UNAUTHORIZED),
                STATUS_CODES.UNAUTHORIZED
            );
        }

        // Verify access token
        const decoded = verifyACCESSTOKEN(token);

        if (!decoded) {
            return errorResponse(
                res,
                new Error(MESSAGES.INVALID_ACCESS_TOKEN),
                STATUS_CODES.UNAUTHORIZED
            );
        }

        // Find user in database
        const user = await prisma.user.findUnique({
            where: {
                id: decoded.id
            }
        });

        if (!user) {
            return errorResponse(
                res,
                new Error(MESSAGES.USER_NOT_FOUND),
                STATUS_CODES.UNAUTHORIZED
            );
        }

        // Check if user is active
        if (!user.isActive) {
            return errorResponse(
                res,
                new Error(MESSAGES.ACCOUNT_INACTIVE),
                STATUS_CODES.FORBIDDEN
            );
        }

        // Attach user to request
        req.user = user;

        next();

    } catch (error) {
        console.log("Authentication error:", error);

        return errorResponse(
            res,
            new Error(MESSAGES.INTERNAL_SERVER_ERROR),
            STATUS_CODES.INTERNAL_SERVER_ERROR
        );
    }
};