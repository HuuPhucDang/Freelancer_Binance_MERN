import multer from "multer";
import { GridFsStorage } from "multer-gridfs-storage";
import config from "../config/config";

const storage = new GridFsStorage({ url: config.mongoose.url });
const upload = multer({ storage });

export default upload;
