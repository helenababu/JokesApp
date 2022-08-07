import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from './src/screens/HomeScreen';
import MyFavorites from './src/screens/MyFavourites';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions = {({route})=>({
          tabBarIcon:({color})=>{
            let iconName;
            if (route.name === "Home") {
              iconName = "home";
            }
            else if (route.name === "My Favorites") {
              iconName = "bookmark";
            } 
            return <Ionicons name={iconName} size={22} color={color} />
          },
          tabBarActiveTintColor: "#CD7F32",
          tabBarInactiveTintColor: "black",
          tabBarLabelStyle: {
            fontSize: 16,
          },
          unmountOnBlur: true,
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen}></Tab.Screen>
        <Tab.Screen name="My Favorites" component={MyFavorites}
        ></Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}