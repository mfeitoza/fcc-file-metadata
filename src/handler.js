const multer  = require('multer')

const upload = multer().single('upfile')

function fileMetadaHandler(req, res) {
    const file = req.file
    if (file) {
        res.json({
            name: file.originalname,
            type: file.mimetype,
            size: file.size
        })
    } else {
        res.json({
            errror: 'no file selected'
        })
    }
}

module.exports = [upload, fileMetadaHandler]