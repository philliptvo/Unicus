import express from 'express';
import { body } from 'express-validator';

import validateRequest from '../middlewares/validateRequest';
import * as CollectionController from '../controllers/collection';

const CollectionsRouter = express.Router();

CollectionsRouter.get('/', getAllCollections);
CollectionsRouter.get('/:collectionId', getCollection);
CollectionsRouter.post('/create', collectionSchema(), validateRequest, createCollection);
CollectionsRouter.put('/:collectionId', collectionSchema(), validateRequest, updateCollection);
CollectionsRouter.delete('/:collectionId', deleteCollection);

function collectionSchema() {
  return [
    body('name', 'Name field is required').not().isEmpty(),
    body('fields[*].name', 'Missing name in field object').not().isEmpty(),
    body('fields[*].propType', 'Field property type not supported')
      .not()
      .isEmpty()
      .isIn(['Text', 'Select', 'Multi-Select', 'Files & Media', 'Checkbox']),
  ];
}

function getAllCollections(req, res, next) {
  CollectionController.getAll(req.user)
    .then((collections) => res.status(200).json({ message: 'Retrieve success', collections }))
    .catch(next);
}

function getCollection(req, res, next) {
  CollectionController.getById(req.params.collectionId)
    .then((collection) => res.status(200).json({ message: 'Retrieve success', collection }))
    .catch(next);
}

function createCollection(req, res, next) {
  CollectionController.create(req.user, req.body)
    .then((collection) => res.status(201).json({ message: 'Creation success', collection }))
    .catch(next);
}

function updateCollection(req, res, next) {
  CollectionController.updateById(req.params.collectionId, req.body)
    .then((collection) => res.status(200).json({ message: 'Update success', collection }))
    .catch(next);
}

function deleteCollection(req, res, next) {
  CollectionController.deleteById(req.params.collectionId)
    .then((collection) => res.status(200).json({ message: 'Delete success', collection }))
    .catch(next);
}

export default CollectionsRouter;
