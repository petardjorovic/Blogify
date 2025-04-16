const path = require('path');
const CustomError = require('./CustomError');

class FileUpload {
    static KB = 1024;
    static MB = 1024 * 1024;
    fileErrors = {};
    constructor(file, validType, validSize) {
        this.file = file;
        this.validType = validType;
        this.validSize = validSize;
        this.filesize = file.size;
        this.fileType = file.mimetype;
        this.fileExt = path.extname(file.name).toLowerCase();
        this.validate();
    }

    validate = () => {
        if (!this.validType.includes(this.fileExt)) {
            this.fileErrors.fileType = `File type is not valid, valid types are ${this.validType.join(', ')}`;
        }
        if (this.filesize > this.validSize) {
            this.fileErrors.fileSize = `File size iz too large`;
        }
    };

    isValid = () => Object.keys(this.fileErrors).length === 0;

    save = async () => {
        let nameOfFile = this.file.name.split('.');
        this.storeName = nameOfFile[0] + new Date().getTime().toString() + this.fileExt;
        try {
            let resultSave = await this.file.mv(__dirname + '../uploads/posts' + this.storeName);
            return resultSave;
        } catch (err) {
            throw new CustomError('An error occurred, plaese try later', 500);
        }
    };
}

module.exports = FileUpload;
