import express from 'express';
import mongoose from 'mongoose';

import { ErrorHandler } from '../middlewares/error';
import upload from '../middlewares/upload';

const FilesRouter = express.Router();

let gfs;
mongoose.connection.once('open', () => {
  gfs = new mongoose.mongo.GridFSBucket(mongoose.connection.db, { bucketName: 'uploads' });
});

FilesRouter.get('/', getAllFileOrMedia);
FilesRouter.get('/:fileId', getFileOrMedia);
FilesRouter.get('/img/:fileId', getImage);
FilesRouter.post('/', upload.single('file'), uploadFileOrMedia);
FilesRouter.delete('/:fileId', deleteFileOrMedia);

function getAllFileOrMedia(req, res, next) {
  gfs.find().toArray((err, files) => {
    if (!files || files.length === 0) {
      return next(new ErrorHandler(404, 'No files found'));
    }

    res.status(200).json({ message: 'Retrieve success', files });
  });
}

function getFileOrMedia(req, res, next) {
  gfs.find(new mongoose.Types.ObjectId(req.params.fileId)).toArray((err, files) => {
    if (!files || files.length === 0) {
      return next(new ErrorHandler(404, 'No file found'));
    }
    res.status(200).json({ message: 'Retrieve success', file: files[0] });
  });
}

function getImage(req, res, next) {
  gfs.find(new mongoose.Types.ObjectId(req.params.fileId)).toArray((err, files) => {
    if (!files || files.length === 0) {
      return next(new ErrorHandler(404, 'No image found'));
    }
    if (
      files[0].contentType === 'image/jpg' ||
      files[0].contentType === 'image/jpeg' ||
      files[0].contentType === 'image/png' ||
      files[0].contentType === 'image/svg+xml'
    ) {
      gfs.openDownloadStreamByName(files[0].filename).pipe(res);
    } else {
      next(new ErrorHandler(404, 'Not an image'));
    }
  });
}

function uploadFileOrMedia(req, res, next) {
  if (!req.file) {
    return next(new ErrorHandler(500, 'Upload failed'));
  }
  res.status(201).json({ message: 'Upload success', file: req.file });
}

function deleteFileOrMedia(req, res, next) {
  gfs.delete(new mongoose.Types.ObjectId(req.params.fileId), (err, files) => {
    if (err) {
      return next(new ErrorHandler(404, err));
    }
    res.status(200).json({ message: 'Delete success', files });
  });
}

export default FilesRouter;
