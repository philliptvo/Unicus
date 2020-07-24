import express from 'express';
import mongoose from 'mongoose';

import { ErrorHandler } from '../middlewares/error';
import upload from '../middlewares/upload';

const FilesRouter = express.Router();

let gfs;
const { mongo, connection } = mongoose;
connection.once('open', () => {
  gfs = new mongo.GridFSBucket(connection.db, { bucketName: 'uploads' });
});

FilesRouter.get('/', getAllFileOrMedia);
FilesRouter.get('/:filename', getFileOrMedia);
FilesRouter.get('/image/:filename', getImage);
FilesRouter.post('/', upload.single('file'), uploadFileOrMedia);

function getAllFileOrMedia(req, res, next) {
  gfs.find().toArray((err, files) => {
    if (!files || files.length === 0) {
      // FIXME: error throwing does not work while wrapped in "connection.once"
      //   throw new ErrorHandler(404, 'No files found');
      return res.status(404).json({ message: 'No files found' });
    }

    return res.status(200).json({ message: 'Retrieve success', files });
  });
}

function getFileOrMedia(req, res, next) {
  const { filename } = req.params;
  gfs.find({ filename }).toArray((err, files) => {
    if (!files || files.length === 0) {
      // FIXME: "connection.once" breaks error throwing
      return res.status(404).json({ message: 'No file found' });
    }
    res.status(200).json({ message: 'Retrieve success', file: files[0] });
  });
}

function getImage(req, res, next) {
  const { filename } = req.params;
  gfs.find({ filename }).toArray((err, files) => {
    if (!files || files.length === 0) {
      // FIXME: "connection.once" breaks error throwing
      return res.status(404).json({ message: 'No image found' });
    }
    if (
      files[0].contentType === 'image/jpeg' ||
      files[0].contentType === 'image/png' ||
      files[0].contentType === 'image/svg+xml'
    ) {
      gfs.openDownloadStreamByName(filename).pipe(res);
    } else {
      // FIXME: "connection.once" breaks error throwing
      res.status(404).json({ message: 'Not an image' });
    }
  });
}

function uploadFileOrMedia(req, res, next) {
  if (!req.file) {
    // FIXME: "connection.once" breaks error throwing
    res.status(500).json({ message: 'Upload failed' });
  }
  return res.status(201).json({ message: 'Upload success', file: req.file });
}

export default FilesRouter;
