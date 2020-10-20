import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme, Title } from 'react-native-paper';
import axios from 'axios';

import { useForm } from 'react-hook-form';

import { useAuthState, useAuthDispatch } from '../../common/contexts/auth';
import { objectToFormData } from '../../common/utils/formdata';
import { StaticForm, TextField } from '../../components/Forms';
import Loader from '../../components/loader';
import ButtonText from '../../components/buttonText';
import ImageInput from '../../components/imageInput';

const EditProfileScreen = ({ navigation }) => {
  const theme = useTheme();
  const { control, handleSubmit, errors, reset } = useForm();
  const [state, setState] = useState({
    isLoading: false,
    fileChanged: null,
  });

  const { userFirstName, userLastName, userEmail, userProfile } = useAuthState();
  const dispatch = useAuthDispatch();

  const avatarChangeHandler = (imageObj) => {
    setState({ ...state, fileChanged: imageObj });
  };

  const profileChangeHandler = async (userInfo) => {
    setState({ ...state, isLoading: true });
    try {
      const formData = objectToFormData(userInfo);
      if (state.fileChanged) {
        formData.append('image', state.fileChanged);
      }

      const { data } = await axios.put('/users', formData);
      dispatch({ type: 'SET_CURRENT_USER', user: data.user });
      reset();
    } catch (err) {
      // Do nothing
    } finally {
      setTimeout(() => {
        setState({
          isLoading: false,
          fileChanged: null,
        });
        navigation.pop();
      }, 1000);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.surface }]}>
      <ImageInput
        initialImage={{
          ...(userProfile && {
            uri: `https://unicusapp.herokuapp.com/api/files/img/${userProfile}`,
            headers: {
              Authorization: axios.defaults.headers.common.Authorization,
            },
          }),
        }}
        onImageChange={avatarChangeHandler}
        style={{ paddingTop: 20 }}
        size={150}
      />
      <View style={{ alignItems: 'center' }}>
        <Title style={styles.title}>{`${userFirstName} ${userLastName}`}</Title>
      </View>

      <StaticForm {...{ control, errors }}>
        <TextField name="firstName" label="First Name" defaultValue={userFirstName} />
        <TextField name="lastName" label="Last Name" defaultValue={userLastName} />
        <TextField name="email" label="Email" autoCapitalize="none" defaultValue={userEmail} />

        <ButtonText
          buttonStyles={styles.button}
          buttonActionStyles={[{ backgroundColor: theme.colors.accent }]}
          handlePress={handleSubmit(profileChangeHandler)}
          label="Save"
          textStyles={styles.buttonText}
        />
      </StaticForm>

      <Loader isLoading={state.isLoading} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default EditProfileScreen;
