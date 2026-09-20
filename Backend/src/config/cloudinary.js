import { v2 as cloudinary } from "cloudinary";
import { ENV } from "./env.js";

// Configure Cloudinary
cloudinary.config({
    cloud_name: ENV.Cloud_Name,
    api_key: ENV.Cloud_API_KEY,
    api_secret: ENV.Cloud_API_SECRET,
    secure: true,
});

const getCloudinaryError = (error) => ({
  message: error?.error?.message || error?.message || 'Unknown Cloudinary error',
  httpCode: error?.http_code || error?.error?.http_code,
});

// Upload single file to Cloudinary
export const uploadToCloudinary = async (file, options = {}) => {
    try {
        const result = await cloudinary.uploader.upload(file.path, {
            folder: options.folder || "cmsfolder",
            public_id: options.public_id,
            resource_type: options.resource_type || "auto",
            transformation: options.transformation || [],
            ...options,
        });

        return result;
    } catch (error) {
        const details = getCloudinaryError(error);
        console.error("Cloudinary upload error:", error);
        const uploadError = new Error('CLOUDINARY_UPLOAD_FAILED');
        uploadError.cause = details;
        throw uploadError;
    }
};


// Upload multiple files to Cloudinary
export const uploadMulterToCloudinary = async (files, options = {}) => {
    try {
        const uploadPromises = files.map((file) =>
            uploadToCloudinary(file, {
                ...options,
                public_id: `${Date.now()}-${file.originalname.split(".")[0]}`,
            })
        );

        return await Promise.all(uploadPromises);
    } catch (error) {
         const details = getCloudinaryError(error);
        console.error("Cloudinary multiple upload error:", error);
        const uploadError = new Error('CLOUDINARY_UPLOAD_FAILED');
        uploadError.cause = details;
        throw uploadError;
    }
};


// ==================== DELETE FILE ====================
export const deleteFromCloudinary = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    console.error('Cloudinary delete error:', error);
    throw new Error('Failed to delete from Cloudinary');
  }
};

// ==================== GET CLOUDINARY URL ====================
export const getCloudinaryUrl = (publicId, options = {}) => {
  return cloudinary.url(publicId, { secure: true, ...options });
};

export default cloudinary;