import React from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, View } from 'react-native';
import { useTheme, Caption, Subheading, Title } from 'react-native-paper';

import { useAuthState } from '../../common/contexts/auth';
import UnicAvatar from '../../components/unicAvatar';

const settingsList = {
  Account: [
    { key: 'Location', value: 'Seattle' },
    { key: 'Language', value: 'English' },
  ],
  More: [{ key: 'About' }, { key: 'Terms and Policies' }, { key: 'Rate' }],
};

const SettingsScreen = ({ navigation }) => {
  const theme = useTheme();
  const { userFirstName, userLastName, userEmail, userProfile } = useAuthState();

  const renderProfileHeader = () => (
    <TouchableOpacity onPress={() => navigation.push('EditProfile')}>
      <View style={styles.userRow}>
        <View style={styles.userImage}>
          <UnicAvatar image={userProfile} size={50} />
        </View>
        <View>
          <Title>{`${userFirstName} ${userLastName}`}</Title>
          <Caption>{userEmail}</Caption>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderSettingsSection = (sectionTitle, section) => (
    <View style={styles.row}>
      <Subheading style={{ color: theme.colors.primary }}>{key}</Subheading>
      <Subheading style={{ color: theme.colors.border }}>{value}</Subheading>
    </View>
  );

  const renderSettings = (settings) => {
    const components = [];
    Object.entries(settings).forEach(([key, value]) => {
      // components.push(
      //   <List.Section>
      //     <List.Subheader>{key}</List.Subheader>
      //     {renderSettingsSection(value)}
      //   </List.Section>
      // );
      // console.log(`${key} ${value}`);
    });

    return components;
  };

  return (
    <ScrollView style={styles.scroll}>
      {renderProfileHeader()}
      {renderSettings(settingsList)}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scroll: {
    backgroundColor: '#FFF',
  },
  userRow: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingBottom: 8,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 6,
  },
  userImage: {
    marginRight: 12,
  },
  listItemContainer: {
    borderWidth: 0.5,
    borderColor: '#ECECEC',
  },
});

export default SettingsScreen;
