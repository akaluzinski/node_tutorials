const sharp = require("sharp");

async function cropImage(buffer) {
    return await sharp(buffer)
        .resize(128, 128)
        .jpeg()
        .toBuffer();
}

module.exports = {
    cropImage
};
