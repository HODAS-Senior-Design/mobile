import { createAppContainer } from "react-navigation";
import { createMaterialTopTabNavigator } from "react-navigation-tabs";

import General from "../../screens/Resources/General";
import Local from "../../screens/Resources/Local";
import Emergency from "../../screens/Resources/Emergency";
import { colorScheme } from "../../styles/colorScheme";

const screens = {
    General: {
        screen: General,
        navigationOptions: () => {
            return {
                headerShown: false
            }
        }
    },
    Local: {
        screen: Local,
        navigationOptions: () => {
            return {
                headerShown: false
            }
        }
    },
    Emergency: {
        screen: Emergency,
        navigationOptions: () => {
            return {
                headerShown: false
            }
        }
    }
}

const Resources = createMaterialTopTabNavigator(screens, {
    initialRouteName: "General",
    tabBarPosition: "top",
    headerShown: true,
    timingConfig: 0,
    tabBarOptions: {
        upperCaseLabel: false,
        activeTintColor: colorScheme.highlight,
        inactiveTintColor: colorScheme.primaryText,
        style: {
          backgroundColor: colorScheme.primary,
        },
        labelStyle: {
            fontSize: 16
        },
        indicatorStyle: {
            backgroundColor: colorScheme.highlight
        }
    }
})

export default createAppContainer(Resources);