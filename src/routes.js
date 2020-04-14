import React from 'react';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Icon from 'react-native-vector-icons/MaterialIcons';

import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';

import SelectProvider from './pages/New/SelectProvider';
import SelectDateTime from './pages/New/SelectDateTime';
import Confirm from './pages/New/Confirm';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

Stack.ScreenOptions = {
  headerShown: false,
};

Tab.tabBarOptions = {
  keyboardHidesTabBar: true,
  activeTintColor: '#fff',
  inactiveTintColor: 'rgba(255, 255, 255, 0.6)',
  style: {
    backgroundColor: '#8d41a8',
  },
};

function New() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTransparent: true,
        headerTitleAlign: 'center',
        headerTintColor: '#FFF',
        headerLeftContainerStyle: {
          marginLeft: 20,
        },
      }}
    >
      <Stack.Screen
        name="SelectProvider"
        component={SelectProvider}
        options={SelectProvider.navigationOptions}
      />
      <Stack.Screen
        name="SelectDateTime"
        component={SelectDateTime}
        options={SelectDateTime.navigationOptions}
      />
      <Stack.Screen
        name="Confirm"
        component={Confirm}
        options={Confirm.navigationOptions}
      />
    </Stack.Navigator>
  );
}

New.NavigationOptions = {
  tabBarVisible: false,
  tabBarLabel: 'Agendar',
  tabBarIcon: ({ color }) => (
    <Icon
      name="add-circle-outline"
      size={20}
      color="rgba(255, 255, 255, 0.6)"
    />
  ),
};

export default function Routes() {
  const signed = useSelector((state) => state.auth.signed);
  return (
    <NavigationContainer>
      {signed ? (
        <Tab.Navigator
          tabBarOptions={Tab.tabBarOptions}
          screenOptions={Tab.ScreenOptions}
        >
          <Tab.Screen
            name="Dashboard"
            component={Dashboard}
            options={Dashboard.NavigationOptions}
          />
          <Tab.Screen
            name="New"
            component={New}
            options={New.NavigationOptions}
          />
          <Tab.Screen
            name="Profile"
            component={Profile}
            options={Profile.NavigationOptions}
          />
        </Tab.Navigator>
      ) : (
        <Stack.Navigator screenOptions={Stack.ScreenOptions}>
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="SignUp" component={SignUp} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
