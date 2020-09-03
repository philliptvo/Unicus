import React from 'react';
import { YellowBox } from 'react-native';

import CreateForm from '../../components/Forms/createForm';

// NOTE: Warning occurs be callback (onSubmit) is passed through route params. This
//  affects state persistence and deeplinking to screen that accept functions in params
YellowBox.ignoreWarnings(['Non-serializable values were found in the navigation state']);

const FormScreen = ({ route, navigation }) => {
  const { title, onSubmit } = route.params;

  return <CreateForm title={title} onSubmit={onSubmit} onCancel={() => navigation.pop()} />;
};

export default FormScreen;
