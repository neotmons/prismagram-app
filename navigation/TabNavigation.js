import { createBottomTabNavigator, createAppContainer } from "react-navigation";

import Home from "../screens/Home";
import Search from "../screens/Search";
//import Profile from "../screens/Profile";
import Profile from "../screens/Profile";
import Notification from "../screens/Notifications";

const TabNavigation = createBottomTabNavigator(
    {
        Home,
        Search,
        Notification,
        Profile
    },
    {
      headerMode: "none"
    }
);

export default createAppContainer(TabNavigation);