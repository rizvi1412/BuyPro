import React from 'react';
import LoginScreen from '../screens/LoginScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AppDrawer} from './AppDrawer';
import {useSelector} from 'react-redux';

const Stack = createNativeStackNavigator();

export const AppNavigator = () => {
  const authenticated = useSelector(state => state.auth.authenticated);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {authenticated ? (
          <>
            <Stack.Screen
              name="NavigationDrawer"
              component={AppDrawer}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="ProductDetailScreen"
              component={ProductDetailScreen}
              options={{title: 'Product Detail'}}
            />
          </>
        ) : (
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{title: 'Login'}}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
