const buildFormData = (formData, data, namespace) => {
  if (data && typeof data === 'object') {
    Object.keys(data).forEach((key) => {
      if (key === 'image') {
        // send image data as an object
        return formData.append(namespace ? `${namespace}[${key}]` : key, data[key]);
      }
      buildFormData(formData, data[key], namespace ? `${namespace}[${key}]` : key);
    });
  } else {
    const value = data === null ? '' : data;
    formData.append(namespace, value);
  }
};

const objectToFormData = (data) => {
  const formData = new FormData();
  buildFormData(formData, data);

  return formData;
};

const processData = (data) => {
  const processFields = data.fields.map((field) => {
    if (field.fieldType === 'SelectField' || field.fieldType === 'MSelectField') {
      const { name, fieldType, options } = field;
      return {
        name,
        fieldType,
        options: options.tagsArray || [],
      };
    }
    return {
      ...field,
    };
  });
  return { ...data, fields: processFields };
};

export { processData, objectToFormData };
