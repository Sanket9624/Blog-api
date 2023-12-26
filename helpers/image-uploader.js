const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
            destination:(req,file,cb)=>{
                        cb(null ,'./upload')
            },
            filename:(req,file,cb)=>{
                        cb(null , new Date().getTime() + path.extname(file.originalname))
            }
})

const fileFilter = (req,file,cb)=>{
            if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
                        cb(null,true)
            }else{
                        cb(new Error("Unsupported Files"),false)
            }
}

const upload = multer({
            storage : storage,
            limits :{
                        fileSize : 1024*1024*10
            },
            fileFilter : fileFilter
})

module.exports = {
            upload: upload
}