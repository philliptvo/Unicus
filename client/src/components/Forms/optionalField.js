import React from 'react';
import { useWatch, Controller } from 'react-hook-form';

const OptionalField = ({ control, index, cond, defaultValue, renderItem }) => {
  const value = useWatch({
    control,
    name: `fields[${index}].${cond.key}`,
  });

  return cond.value.includes(value) ? (
    <Controller
      control={control}
      name={`fields[${index}].${cond.label}`}
      defaultValue={defaultValue}
      render={renderItem}
    />
  ) : null;
};

export default OptionalField;
