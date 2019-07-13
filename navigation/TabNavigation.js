import React from "react";
import styled from "styled-components";
import { Image } from "react-native";
import { Platform } from "react-native";
import { createBottomTabNavigator, createStackNavigator } from "react-navigation";

import Home from "../screens/Tabs/Home";
import Search from "../screens/Tabs/Search";
import Profile from "../screens/Tabs/Profile";
import Notification from "../screens/Tabs/Notifications";
import MessagesLink from "../components/MessagesLink";
import Detail from "../screens/Detail";
import { View } from "react-native";
import NavIcon from "../components/NavIcon";
import { stackStyles } from "./config";

const stackFactory = (initialRoute, customConfig) => 
    createStackNavigator({
        initialRoute: {
            screen: initialRoute,
            navigationOptions: {
                ...customConfig,
                headerStyle: {...stackStyles}
            }
        },
        Detail
    });

const Container = styled.View`
    justify-content: center
    align-items: center;
    flex: 1;
    height: 35;
`;

export default createBottomTabNavigator(
    {
        Home: {
            screen: stackFactory(Home, {
                headerTitle: (
                    <Container>
                        <NavIcon name="logo-instagram" />

                    </Container>
                    /**
                    <Container>
                        <Image resizeMode="center" source={require("../assets/logo.png")} /> 
                    </Container>
                     */
                ),
                headerRight: <MessagesLink />,
                headerLeft: <Container />
                
                /**
                headerRight: <MessagesLink />,
                headerTitle: (
                    <Container>
                        <Image 
                            source={require("../assets/logo.png")} />
                    </Container>
                )
                 */
            }),
            navigationOptions: {
                tabBarIcon: ({focused}) => (
                    <NavIcon focused={focused} name={Platform.OS === "ios" ? "ios-home" : "md-home"} />)
            }            
        },
        Search: {
            screen: stackFactory(Search),
            navigationOptions: {
                tabBarIcon: ({focused}) => (
                    <NavIcon focused={focused} name={Platform.OS === "ios" ? "ios-search" : "md-search"} />)
            } 

        },
        Add: {
            screen: View,
            navigationOptions: {
                tabBarOnPress: ({navigation}) => navigation.navigate("PhotoNavigation")
            },
            navigationOptions: {
                tabBarIcon: ({focused}) => (
                    <NavIcon focused={focused} name={Platform.OS === "ios" ? "ios-add" : "md-add"} />)
            }             
        },
        Notification: {
            screen: stackFactory(Notification, {
                title: "Notification"
            }),
            navigationOptions: {
                tabBarIcon: ({focused}) => (
                    <NavIcon focused={focused} name={Platform.OS === "ios" ? "ios-heart" : "md-heart"} />)
                }
            /**
            navigationOptions: {
                tabBarIcon: ({focused}) => (
                <NavIcon name={Platform.OS === "ios"
                    ? focused
                        ? "ios-heart" 
                        : "ios-heart-empty"
                    : focused
                        ? "md-heart"
                        : "md-heart-empty"
                } />)
            }
            */           
        },
        Profile: {
            screen: stackFactory(Profile, {
                title: "Profile"
            }),
            navigationOptions: {
                tabBarIcon: ({focused}) => (
                    <NavIcon focused={focused} name={Platform.OS === "ios" ? "ios-person" : "md-person"} />)
            }
        }
    },
    {

        // 작업편의를 위해 초기 페이지를 아래와 같이 지정하나 후 작업함.
        initialRouteName: "Search", 
        tabBarOptions: {
            showLabel: false,
            style: {
                ...stackStyles
            }
        }
      //headerMode: "none"
    }
);
