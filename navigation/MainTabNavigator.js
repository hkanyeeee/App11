import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import TabBarIcon from '../components/TabBarIcon';
import Time from '../screens/Time';
import Money from '../screens/Money';
import Zidingyi from '../screens/Zidingyi';
import Entertain from '../screens/Entertain';
import Tongji from '../screens/Tongji';

const HomeStack = createStackNavigator({
  Home: Time,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'time',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-time'
      }
    />
  ),
};

const LinksStack = createStackNavigator({
  Links: Money,
});

LinksStack.navigationOptions = {
  tabBarLabel: 'money',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-link${focused ? '' : '-outline'}` : 'md-cart'}
    />
  ),
};

const TongjiStack = createStackNavigator({
  Links: Tongji,
});

TongjiStack.navigationOptions = {
  tabBarLabel: 'status',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-link${focused ? '' : '-outline'}` : 'md-trophy'}
    />
  ),
};

const EntertainStack = createStackNavigator({
  Links: Entertain,
});

EntertainStack.navigationOptions = {
  tabBarLabel: 'Entertain',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-link${focused ? '' : '-outline'}` : 'md-heart'}
    />
  ),
};

const SettingsStack = createStackNavigator({
  Settings: Zidingyi,
});

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-options${focused ? '' : '-outline'}` : 'md-options'}
    />
  ),
};

export default createBottomTabNavigator({
  HomeStack,
  LinksStack,
  TongjiStack,
  EntertainStack,
  SettingsStack,
});
