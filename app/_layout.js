import { View, Text } from 'react-native'
import React from 'react'
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';

export default function HomeLayout() {

  const [fontsLoaded, fontError] = useFonts({
    'outfit':require('./../assets/fonts/Outfit-Medium.ttf'),
    'outfit-light':require('./../assets/fonts/Outfit-Light.ttf'),
    'outfit-bold':require('./../assets/fonts/Outfit-Bold.ttf')
  });
  return (
    <Stack
    screenOptions={{
        headerShown:false
    }}
    >
      <Stack.Screen name='(tabs)' 
      options={{
        headerShown:false
      }}
      />
      <Stack.Screen name='add-new-category' 
      options={{
        presentation:'modal',
        headerShown:true,
        headerTitle:'Add New Category'
      }}/>
      <Stack.Screen 
      name='add-new-category-item'
      options={{
        presentation:'modal',
        headerShown:true,
        headerTitle:'Add New Item'
      }}/>
      </Stack>
  )
}