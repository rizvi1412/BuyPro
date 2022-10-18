import {Button, Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {authActionCreators} from '../redux-saga';

export function CustomDrawerContent() {
  const dispatch = useDispatch();
  const userData = useSelector(state => state.auth.userData);

  return (
    <View
      style={{
        display: 'flex',
        flex: 1,
        justifyContent: 'space-between',
        paddingBottom: '20%',
      }}>
      <View style={styles.container}>
        <Image
          style={styles.avatarImage}
          source={{uri: userData.image}}
          resizeMode={'contain'}
        />
        <View style={styles.subView}>
          <Text style={styles.nameText}>
            {userData.firstName + ' ' + userData.lastName}
          </Text>
          <Text style={styles.email}>{userData.email}</Text>
        </View>
      </View>
      <Button
        title={'Logout'}
        onPress={() => {
          dispatch(authActionCreators.logout());
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'silver',
    alignItems: 'center',
    paddingVertical: 50,
  },
  avatarImage: {
    width: 150,
    height: 150,
    borderRadius: 150 / 2,
    borderWidth: 1,
  },
  subView: {
    paddingTop: 10,
    paddingLeft: 10,
    alignItems: 'center',
  },
  nameText: {
    fontSize: 20,
  },
  emailText: {
    fontSize: 14,
  },
});
