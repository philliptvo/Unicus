import path from 'path';
import crypto from 'crypto';
import multer from 'multer';
import GridFsStorage from 'multer-gridfs-storage';

const db = process.env.MONGODB_URI;

// Create storage engine
const storage = new GridFsStorage({
  url: db,
  options: {
    useUnifiedTopology: true,
  },
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename,
          bucketName: 'uploads',
        };
        resolve(fileInfo);
      });
    });
  },
});

const upload = multer({ storage });

export default upload;
