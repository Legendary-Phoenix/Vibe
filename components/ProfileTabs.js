// ProfileTabs.js
import { MaterialIcons } from '@expo/vector-icons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import BookmarksTab from './BookmarksTab';
import FeedTab from './FeedTab';
import ReelsTab from './ReelsTab';

const Tab = createMaterialTopTabNavigator();

function ProfileTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        tabBarIcon: ({ focused}) => {
          let iconName;
          if (route.name === 'Posts') iconName = 'apps';
          else if (route.name === 'Reels') iconName = 'video-library';
          else if (route.name === 'Tagged') iconName = 'collections-bookmark';

          return <MaterialIcons name={iconName} size={24} color={focused ? '#000' : '#999'} />;
        },
        tabBarIndicatorStyle: {
            width: 70,
            marginLeft: 30,    // half of width to center properly
            backgroundColor: '#000',
        },
        tabBarStyle: { 
            backgroundColor: '#fff',
            elevation: 0.5,
         },
      })}
    >
      <Tab.Screen name="Posts" component={FeedTab} />
      <Tab.Screen name="Reels" component={ReelsTab} />
      <Tab.Screen name="Tagged" component={BookmarksTab} />
    </Tab.Navigator>
  );
}

export default ProfileTabs;
