import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { client } from './../../utils/KindeConfig'
import Colors from './../../utils/Colors'
import { Ionicons } from '@expo/vector-icons'
import services from '../../utils/services'
import { router } from 'expo-router'

export default function Header() {
  const [user, setUser] = useState();

  const handleLogout=async()=>{
    const loggedOut = await client.logout();
    if (loggedOut){
      await services.storeData('login','false');
      router.replace('/login');
    }
  }

  useEffect(() => {
    getUserData();
  }, [])
  const getUserData = async () => {
    const user = await client.getUserDetails();
    setUser(user);
  }
  return (
    <View style={{
      display: 'flex',
      flexDirection: 'row',
      gap: 8,
      alignItems: 'center',
      backgroundColor: Colors.GRAY,
      height: '100%',
      width: '100%'
    }}>
      <Image source={{ uri: user?.picture }}
        style={{
          width: 150,
          height: 150,
          borderRadius: 99
        }} />
      <View style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '85%'
      }}>
        <View>
          <Text style={{ color: 'black', fontSize: 30, fontFamily: 'outfit' }}>Welcome,</Text>
          <Text style={{ color: 'black', fontSize: 30, fontFamily: 'outfit-bold' }}>{user?.given_name}</Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleLogout}>
          <Text style={{ textAlign: 'center', fontFamily: 'outfit-bold', color: Colors.WHITE, fontSize: 17 }}>LOG OUT</Text></TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    display:'flex',
    position:'absolute',
    top:'40%',
    right:'20%',
    padding: 20,
    backgroundColor: 'red',
    borderRadius: 99,
    marginTop: 25,
    width:'50%'
  }
})