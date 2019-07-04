import React from "react";

import { createBottomTabNavigator, createStackNavigator } from "react-navigation";

import Home from "../screens/Tabs/Home";
import Search from "../screens/Tabs/Search";
import Profile from "../screens/Tabs/Profile";
import Notification from "../screens/Tabs/Notifications";
import MessagesLink from "../components/MessagesLink";
import { View } from "react-native";

const stackFactory = (initialRoute, customConfig) => 
    createStackNavigator({
        initialRoute: {
            screen: initialRoute,
            navigationOptions: {...customConfig}
        }
    });

export default createBottomTabNavigator(
    {
        Home: {
            screen: stackFactory(Home, {
                title: "Home",
                headerRight: <MessagesLink />
            })
        },
        Search: {
            screen: stackFactory(Search, {
                title: "Search"
            })
        },
        Add: {
            screen: View,
            navigationOptions: {
                tabBarOnPress: ({navigation}) => navigation.navigate("PhotoNavigation")
            }
        },
        Notification: {
            screen: stackFactory(Notification, {
                title: "Notification"
            })
        },
        Profile: {
            screen: stackFactory(Profile, {
                title: "Profile"
            })
        }
    },
    {
      headerMode: "none"
    }
);
