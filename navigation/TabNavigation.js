import React from "react";
import { Platform } from "react-native";
import {
  createBottomTabNavigator,
  createStackNavigator
} from "react-navigation";
import Home from "../screens/Tabs/Home";
import Search from "../screens/Tabs/Search";
import Notification from "../screens/Tabs/Notifications";
import Profile from "../screens/Tabs/Profile";
import Detail from "../screens/Detail";
import MessagesLink from "../components/MessagesLink";
import { View } from "react-native";
import NavIcon from "../components/NavIcon";
import { stackStyles } from "./config";
import styles from "../styles";
import UserDetail from "../screens/UserDetail";
import styled from "styled-components";

const stackFactory = (initialRoute, customConfig) =>
  createStackNavigator(
    {
      InitialRoute: {
        screen: initialRoute,
        navigationOptions: {
          ...customConfig
        }
      },
      Detail: {
        screen: Detail,
        navigationOptions: {
          title: "Photo"
        }
      },
      UserDetail: {
        screen: UserDetail,
        navigationOptions: {
          title: "User"
        }
      }
    },
    {
      defaultNavigationOptions: {
        headerBackTitle: null,
        headerTintColor: styles.blackColor,
        headerStyle: { ...stackStyles }
      }
    }
  );

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
            screen: stackFactory(Search, {
                headerBackTitle: null
            }),
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
        initialRouteName: "Profile", 
        tabBarOptions: {
            showLabel: false,
            style: {
                ...stackStyles
            }
        }
      //headerMode: "none"
    }
);
