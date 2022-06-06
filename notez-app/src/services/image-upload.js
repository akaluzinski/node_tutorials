const multer = require("multer");

const maxAvatarSizeBytes = 2 * 1024 * 2024;
const allowedImageMimeTypes = ['image/jpeg', 'image/png'];

const avatarUpload = multer({
    dest: 'avatars',
    limits: {
        fileSize: maxAvatarSizeBytes
    },
    fileFilter(req, file, callback) {
        console.log(file)
        if (!allowedImageMimeTypes.includes(file.mimetype)) {
            return callback(new Error('Invalid file type. Only JPG/PNG images are allowed.'))
        }
        return callback(undefined, true);
    }
});

module.exports = {
    avatarUpload
};
