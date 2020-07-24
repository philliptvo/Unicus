import mongoose from 'mongoose';

const CollectionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  fields: [
    {
      propType: {
        type: String,
        enum: ['Text', 'Select', 'Multi-Select', 'Files & Media', 'Checkbox'],
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      values: [String],
    },
  ],
  image: {
    type: String,
    default: '',
  },
  userId: {
    type: String,
    required: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
  updated: {
    type: Date,
  },
});

const Collection = mongoose.model('Collections', CollectionSchema);

export default Collection;
