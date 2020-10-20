import React from 'react';
import * as Icon from 'react-native-vector-icons';

const UnicIcon = (props) => {
  const { type, name, color, size } = props;
  switch (type) {
    case 'AntDesign': {
      return <Icon.AntDesign name={name} size={size} color={color} />;
    }
    case 'Entype': {
      return <Icon.Entype name={name} size={size} color={color} />;
    }
    case 'Ionicons': {
      return <Icon.Ionicons name={name} size={size} color={color} />;
    }
    case 'EvilIcons': {
      return <Icon.EvilIcons name={name} size={size} color={color} />;
    }
    case 'MaterialIcons': {
      return <Icon.MaterialIcons name={name} size={size} color={color} />;
    }
    case 'MaterialCommunityIcons': {
      return <Icon.MaterialCommunityIcons name={name} size={size} color={color} />;
    }
    case 'FontAwesome': {
      return <Icon.FontAwesome name={name} size={size} color={color} />;
    }
    default: {
      return <Icon.MaterialIcon name={name} size={size} color={color} />;
    }
  }
};

export default UnicIcon;
