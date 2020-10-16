import mongoose from 'mongoose';

const CollectionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  fields: [
    {
      name: {
        type: String,
        required: true,
      },
      fieldType: {
        type: String,
        require: true,
        enum: ['TextField', 'SelectField', 'MSelectField', 'FilesField', 'CheckboxField'],
      },
      options: {
        type: [String],
        default: [],
      },
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

const Collection = mongoose.model('Collection', CollectionSchema);

export default Collection;
