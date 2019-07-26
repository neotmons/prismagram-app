import { createMaterialTopTabNavigator, createStackNavigator } from "react-navigation"
import SelectPhoto from "../screens/Photo/SelectPhoto";
import TakePhoto from "../screens/Photo/TakePhoto";
import UploadPhoto from "../screens/Photo/UploadPhoto";
import { stackStyles } from "./config";
import styles from "../styles";

const PhotoTabs = createMaterialTopTabNavigator(
    {
      Take:{
        screen:TakePhoto,
        navigationOptions: {
          tabBarLabel: "Take"
        }
      },
      Select: {
        screen:SelectPhoto,
        navigationOptions: {
          tabBarLabel: "Select"
        }
      },

    },
    {
      tabBarPosition: "bottom",
      tabBarOptions: {
        indicatorStyle:{
          backgroundColor: styles.blackColor,
          marginBotom: 20
        },
        labelStyle:{
          color: styles.blackColor,
          fontWeight: "600"
        },
        style:{
          height: 50,
          paddingBottom: 20,
          ...stackStyles
        }
      }
    }
);

export default createStackNavigator({
    Tabs: {
      screen: PhotoTabs,
      navigationOptions: {
        title: "Choose Photo",
        headerBackTitle: null,
      }      
    },
    Upload: {
      screen: UploadPhoto,
      navigationOptions: {
        title: "Upload"
      }
    }
},{
    defaultNavigationOptions:{
        headerStyle:{
          ...stackStyles
        },
        headerTintColor: styles.blackColor
      }    
});