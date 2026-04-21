import multer from "multer";
import path from "path";


const storage = multer.diskStorage(
    {
        destination: (req, file, cb) => {
            cb(null, './profilePic')
        },
        filename: (req, file, cb) => {
            const fileExtension = path.extname(file.originalname);

            cb(null, `${Date.now()}-${file.fieldname}${fileExtension}`)

        }
    })

const uploadFile = multer({ storage });

export default uploadFile;

