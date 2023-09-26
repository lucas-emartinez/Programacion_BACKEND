import multer from 'multer';

const storage = multer.diskStorage({
    destination: (req, file, cb) =>  {
        cb(null, './public/img')
    },
    filename: (req, file, cb) =>  {
        cb(null, file.originalname)
    }
});



const uploader = multer({ storage: storage });

export default uploader;