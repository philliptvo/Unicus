import React from 'react';
import { StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';

const KeyboardAvoidingScrollView = (props) => {
  const { children, containerStyle, innerStyle } = props;

  return (
    <KeyboardAvoidingView
      style={[styles.container, containerStyle]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView style={styles.inner} contentContainerStyle={innerStyle}>
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  inner: { flex: 1 },
});

export default KeyboardAvoidingScrollView;
