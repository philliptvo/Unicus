import React from 'react';
import { LogBox } from 'react-native';

import { CollectionForm } from '../../components/Forms';

// NOTE: Warning occurs be callback (onSubmit) is passed through route params. This
//  affects state persistence and deeplinking to screen that accept functions in params
LogBox.ignoreLogs(['Non-serializable values were found in the navigation state']);

const FormScreen = ({ route, navigation }) => {
  const { title, onSubmit } = route.params;

  return (
    <>
      {title === 'Collection' ? (
        <CollectionForm onSubmit={onSubmit} onCancel={() => navigation.pop()} />
      ) : (
        <CollectionForm onSubmit={onSubmit} onCancel={() => navigation.pop()} />
      )}
    </>
  );
};

export default FormScreen;
