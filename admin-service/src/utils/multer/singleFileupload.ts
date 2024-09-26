import multer from "multer";

const storage = multer.diskStorage({
    destination: (request, file, cb) => {
        cb(null, "public/uploads");
    },
    filename: (request, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    }
})

export const upload = multer({ storage });