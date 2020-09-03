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
        name={`fields[${index}].type`}
        defaultValue="Field Type"
        render={({ onChange, onBlur, value }) => (
          <Picker
            style={[styles.input, { flex: 9 }]}
            onBlur={onBlur}
            onValueChange={(val) => {
              if (val !== '0') onChange(val);
            }}
            selectedValue={value}
          >
            <Picker.Item label="Field Type" value="0" />
            <Picker.Item label="Text" value="text" />
            <Picker.Item label="Select" value="select" />
            <Picker.Item label="Multi-Select" value="select" />
            <Picker.Item label="Files & Media" value="fileMedia" />
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
      name={`fields[${index}].key`}
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
      cond={{ key: 'type', value: ['select'], label: 'values' }}
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
