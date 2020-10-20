import React, { createElement } from 'react';
import { Controller } from 'react-hook-form';

const StaticForm = (props) => {
  const { control, errors, children } = props;

  return (
    <>
      {(Array.isArray(children) ? [...children] : [children]).map((child) => {
        return child.props.name ? (
          <Controller
            key={child.props.name}
            control={control}
            name={child.props.name}
            defaultValue={child.props.defaultValue || ''}
            rules={child.props.rules ? child.props.rules : {}}
            render={({ onChange, onBlur, value }) =>
              createElement(child.type, {
                ...child.props,
                onChange,
                onBlur,
                value,
                error: errors[child.props.name],
              })
            }
          />
        ) : (
          child
        );
      })}
    </>
  );
};

export default StaticForm;
