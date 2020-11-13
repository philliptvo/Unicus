import mongoose from 'mongoose';

const fieldOptions = {
  descriminatorKey: 'fieldType',
  collection: 'Field',
};

const Field = mongoose.model(
  'Field',
  new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      },
      fieldType: {
        type: String,
        required: true,
        enum: ['TextField', 'SelectField', 'MSelectField', 'FilesField', 'CheckboxField'],
      },
    },
    fieldOptions
  )
);

const TextFieldSchema = Field.discriminator(
  'TextField',
  new mongoose.Schema({
    value: {
      type: String,
      default: '',
    },
  })
);

const SelectFieldSchema = Field.discriminator(
  'SelectField',
  new mongoose.Schema({
    options: [String],
    value: {
      type: String,
      default: '',
    },
  })
);

const MSelectFieldSchema = Field.discriminator(
  'MSelectField',
  new mongoose.Schema({
    options: [String],
    value: {
      type: [String],
      default: [],
    },
  })
);

const FilesFieldSchema = Field.discriminator(
  'FilesField',
  new mongoose.Schema({
    value: {
      type: [String],
      default: [],
    },
  })
);

const CheckboxFieldSchema = Field.discriminator(
  'CheckboxField',
  new mongoose.Schema({
    value: {
      type: Boolean,
      default: false,
    },
  })
);

const TextField = mongoose.model('TextField', TextFieldSchema);
const SelectField = mongoose.model('SelectField', SelectFieldSchema);
const MSelectField = mongoose.model('MSelectField', MSelectFieldSchema);
const FilesField = mongoose.model('FilesField', FilesFieldSchema);
const CheckboxField = mongoose.model('CheckboxField', CheckboxFieldSchema);

export { Field, TextField, SelectField, MSelectField, FilesField, CheckboxField };
