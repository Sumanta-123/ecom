const router = require('express').Router();
const cloudinary = require('cloudinary');
const fs = require('fs')
const {userAuth, checkRole} = require('../utils/Auth');



//Upload images
router.post('/upload', (req, res) => {
    try
    {
        // console.log(req.files)
        if (!req.files || Object.keys(req.files).length === 0)
        {   
            return res.status(400).json({ msg: 'No file were uploaded' })
        }
        const file = req.files.file;
        console.log(file)
        if (file.size > 1024 * 1024)
        {
            removeTmp(file.tempFilePath);
            return res.status(400).json({ msg: 'Size too large' });
        }
        if (file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png')
        {

            removeTmp(file.tempFilePath);
            return res.status(400).json({ msg: 'File format is incorrect' });
        }

        cloudinary.v2.uploader.upload(file.tempFilePath, { folder: "imgstore" }, async (err, result) => {
            if (err) throw err;
            
            removeTmp(file.tempFilePath)

            return res.json({public_id: result.public_id, url: result.secure_url})

        } );


    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
})

//Delete Image
router.post('/destroy', (req, res) => {
    const { public_id } = req.body;
    if (!public_id)
    {
        return res.status(500).json({ msg: 'No image selected'})
    }
    cloudinary.v2.uploader.destroy(public_id, async (err, result) => {
        if (err) throw err;

        return res.status(200).json({ msg: "Image deleted" });
    })
})

const removeTmp = (path) =>{
    fs.unlink(path, err=>{
        if(err) throw err;
    })
};



module.exports = router