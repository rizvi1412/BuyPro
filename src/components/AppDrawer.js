import React from 'react';
import {CustomDrawerContent} from './CustomDrawerContent';
import HomeScreen from '../screens/HomeScreen';
import {createDrawerNavigator} from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();
export const AppDrawer = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerType: 'front',
      }}
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="Home" component={HomeScreen} />
    </Drawer.Navigator>
  );
};
