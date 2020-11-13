import React from 'react';

import UnicIcon from './unicIcon';

const NavigationDrawerIcon = (props) => {
  const { type, name, color, ...restProps } = props;

  return (
    <UnicIcon type={type || 'MaterialIcons'} name={name} size={24} color={color} {...restProps} />
  );
};

export default NavigationDrawerIcon;
