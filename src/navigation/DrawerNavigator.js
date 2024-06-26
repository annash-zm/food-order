import * as React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import RootClientTab from './ClientTab';

import { Icon } from 'react-native-elements';
import { colors } from '../global/styles'
import DrawerContent from '../components/DrawerContent';


const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      edgeWidth={0}
      drawerContent={props => <DrawerContent {...props} />}
      screenOptions={() => ({
        headerShown: false,
      })}
    >
      <Drawer.Screen
        name="Home"
        component={RootClientTab}
        options={{
          title: 'Home',
          drawerIcon: ({ focussed, size }) => (
            <Icon
              type="material-community"
              name="home"
              color={focussed ? '#7cc' : colors.buttons}
              size={size}

            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}