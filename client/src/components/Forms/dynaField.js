import React from 'react';
import { Picker, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import TagInput from 'react-native-tags-input';
import { Controller } from 'react-hook-form';

import { MaterialIcons } from '@expo/vector-icons';

import OptionalField from './optionalField';

const DynaField = ({ control, index, remove }) => (
  <>
    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
      <Controller
        control={control}
        name={`fields[${index}].fieldType`}
        defaultValue="TextField"
        render={({ onChange, onBlur, value }) => (
          <Picker
            style={[styles.input, { flex: 9 }]}
            onBlur={onBlur}
            onValueChange={(val) => onChange(val)}
            selectedValue={value}
          >
            <Picker.Item label="Text" value="TextField" />
            <Picker.Item label="Select" value="SelectField" />
            <Picker.Item label="Multi-Select" value="MSelectField" />
            <Picker.Item label="Files & Media" value="FilesField" />
            <Picker.Item label="Checkbox" value="CheckboxField" />
          </Picker>
        )}
      />

      <View style={{ flex: 1 }}>
        <TouchableOpacity onPress={() => remove(index)}>
          <MaterialIcons name="cancel" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>

    <Controller
      control={control}
      name={`fields[${index}].name`}
      defaultValue=""
      render={({ onChange, onBlur, value }) => (
        <View
          style={[
            styles.input,
            {
              flex: 1,
              marginTop: 10,
              borderColor: '#c0cbd3',
            },
          ]}
        >
          <TextInput
            style={[styles.inputText, { marginLeft: 5, marginRight: 5 }]}
            placeholder="Field Name"
            onBlur={onBlur}
            onChangeText={(val) => onChange(val)}
            value={value}
          />
        </View>
      )}
    />

    <OptionalField
      control={control}
      index={index}
      cond={{ key: 'fieldType', value: ['SelectField', 'MSelectField'], label: 'options' }}
      defaultValue={{ tag: '', tagsArray: [] }}
      renderItem={({ onChange, onBlur, value }) => (
        <TagInput
          updateState={(state) => onChange(state)}
          onBlur={onBlur}
          tags={value}
          placeholder="Field Values"
          containerStyle={{ paddingHorizontal: 0 }}
          inputContainerStyle={[
            styles.input,
            { flex: 1, alignItems: 'center', marginTop: 10, borderColor: '#c0cbd3' },
          ]}
          inputStyle={[styles.inputText]}
        />
      )}
    />
  </>
);

const styles = StyleSheet.create({
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
});

export default DynaField;
