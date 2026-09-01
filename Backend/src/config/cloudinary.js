import { v2 as cloudinary } from "cloudinary";
import { ENV } from "./env.js";

// Configure Cloudinary
cloudinary.config({
    cloud_name: ENV.Cloud_Name,
    api_key: ENV.Cloud_API_KEY,
    api_secret: ENV.Cloud_API_SECRET,
    secure: true,
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
        console.error("Cloudinary upload error:", error);
        throw new Error("Failed to upload to Cloudinary");
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
        console.error("Cloudinary multiple upload error:", error);
        throw new Error("Failed to upload multiple files to Cloudinary");
    }
};


// Get Cloudinary URL
export const getCloudinaryUrl = (publicId, options = {}) => {
    try {
        return cloudinary.url(publicId, {
            secure: true,
            resource_type: options.resource_type || "image",
            transformation: options.transformation || [],
            ...options,
        });
    } catch (error) {
        console.error("Cloudinary URL error:", error);
        throw new Error("Failed to generate Cloudinary URL");
    }
};


// Delete file from Cloudinary
export const deleteFromCloudinary = async (
    publicId,
    resourceType = "image"
) => {
    try {
        const result = await cloudinary.uploader.destroy(publicId, {
            resource_type: resourceType,
        });

        return result;
    } catch (error) {
        console.error("Cloudinary delete error:", error);
        throw new Error("Failed to delete file from Cloudinary");
    }
};