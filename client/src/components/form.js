import React, { useRef, createElement } from 'react';
import { Controller } from 'react-hook-form';

const Form = ({ control, errors, children }) => {
  const Inputs = useRef([]);

  return (
    <>
      {(Array.isArray(children) ? [...children] : [children]).map((child, i) => {
        return child.props.name ? (
          <Controller
            key={child.props.name}
            name={child.props.name}
            defaultValue=""
            control={control}
            render={({ onChange, onBlur }) =>
              createElement(child.type, {
                ...{
                  ...child.props,
                  ref: (e) => {
                    Inputs.current[i] = e;
                  },
                  onChangeText: (val) => {
                    onChange(val);
                  },
                  onBlur,
                  onSubmitEditing: () => {
                    Inputs.current[i + 1]
                      ? Inputs.current[i + 1].focus()
                      : Inputs.current[i].blur();
                  },
                  blurOnSubmit: false,
                  error: errors[child.props.name],
                },
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

export default Form;
