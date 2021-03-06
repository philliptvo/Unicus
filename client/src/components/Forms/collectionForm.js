import React from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { useForm, useFieldArray } from 'react-hook-form';

import StaticForm from './staticForm';
import { TextField, ImageField } from './staticFields';
import ButtonText from '../buttonText';
import DynaField from './dynaField';

const CollectionForm = (props) => {
  const theme = useTheme();
  const { onSubmit, onCancel } = props;

  const { control, handleSubmit, errors } = useForm();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'fields',
  });

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, flexDirection: 'column' }}
      behavior={Platform.OS === 'android' ? undefined : 'padding'}
    >
      <ScrollView style={{ padding: 20 }}>
        <StaticForm {...{ control, errors }}>
          <TextField
            label="Collection Name"
            name="name"
            placeholder="Collection"
            rules={{ required: 'You must provide a name for the collection.' }}
          />
          <ImageField label="Collection Image" name="image" defaultValue={{}} size={150} />
        </StaticForm>

        {fields.map(({ id }, index) => {
          return (
            <View key={id} style={styles.fieldContainer}>
              <DynaField control={control} index={index} remove={remove} />
            </View>
          );
        })}

        <ButtonText
          buttonActionStyles={{ backgroundColor: theme.colors.border }}
          handlePress={() => append({})}
          label="+ Add Field"
        />

        <View style={{ flexDirection: 'row', marginBottom: 40 }}>
          <ButtonText
            buttonActionStyles={{ borderColor: theme.colors.accent, borderWidth: 1 }}
            handlePress={onCancel}
            label="Cancel"
            textStyles={styles.text}
          />

          <ButtonText
            buttonActionStyles={{ backgroundColor: theme.colors.accent }}
            handlePress={handleSubmit(onSubmit)}
            label="Create"
            textStyles={styles.text}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  fieldContainer: {
    flex: 1,
    marginTop: 10,
    padding: 20,
    borderRadius: 5,
    borderWidth: 1,
  },
  input: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 5,
    height: 40,
    padding: 10,
    paddingVertical: 5,
    paddingLeft: 5,
  },
  inputText: {
    fontSize: 16,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 15,
    paddingHorizontal: 10,
  },
  buttonAction: {
    borderRadius: 10,
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default CollectionForm;
