import { ErrorHandler } from '../middlewares/error';
import Collection from '../models/collection';

const getAll = async (user) => {
  const collections = await Collection.find({ userId: user.id }, 'name image');
  return collections;
};

const getById = async (collectionId) => {
  const collection = await getCollection(collectionId);
  return collection;
};

const create = async (user, params) => {
  const foundCollection = await Collection.findOne({ name: params.name });
  if (foundCollection) {
    throw new ErrorHandler(400, 'Collection already exists');
  }

  const newCollection = new Collection({
    ...params,
    userId: user.id,
  });

  const collection = await newCollection.save();
  return collection;
};

const updateById = async (collectionId, params) => {
  const collection = await getCollection(collectionId);

  Object.assign(collection, params);
  collection.updated = Date.now();
  await collection.save();

  return collection;
};

const deleteById = async (collectionId) => {
  const collection = await getCollection(collectionId);
  await collection.remove();

  return collection;
};

// Helper functions
const getCollection = async (id) => {
  const collection = Collection.findById(id);
  if (!collection) throw new ErrorHandler(400, 'Collection not found');
  return collection;
};

export { getAll, getById, create, updateById, deleteById };
