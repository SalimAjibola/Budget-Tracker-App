import { View, Text, Image, StyleSheet, TouchableOpacity,Alert } from 'react-native'
import React from 'react'
import logo from './../../assets/images/logo.png'
import Colors from '../../utils/Colors'
import { client } from '../../utils/KindeConfig'
import services from './../../utils/services'
import { useRouter } from 'expo-router'

export default function LoginScreen() {

  const router=useRouter();

  const handleSignIn = async () => {
    const token = await client.login();
    if (token) {
      // User was authenticated
      await services.storeData('login','true');
      router.replace('/')
      Alert.alert('User Logged In');
    }
  };

  return (
    <View style={{
      display: 'flex',
      alignItems: 'center'
    }}>
      <Image source={logo}
      style={styles.bgImage}/>
      <View style={{
        backgroundColor:Colors.PRIMARY,
        width:'100%',
        height:'100%',
        padding:20,
        marginTop:-30,
        borderTopLeftRadius:60,
        borderTopRightRadius:60
      }}>
        <Text style={{
          fontSize:35,
          fontWeight:'bold',
          textAlign:'center',
          color:Colors.WHITE
        }}>Personal Budget Planner</Text>

        <Text style={{
          fontSize:18,
          textAlign:'center',
          color:Colors.WHITE,
          marginTop:20
        }}>
          Stay on Track, Event by Event: Your Personal Budget Planner App!
        </Text>

        <TouchableOpacity style={styles.button}
        onPress={handleSignIn}>
          <Text style={{textAlign:'center',color:Colors.PRIMARY}}>Login/Signup</Text>
        </TouchableOpacity>
        <Text style={{fontSize:13,color:Colors.WHITE,marginTop:10} }>* By login/Sifnup you will agree to our Terms & Conditios</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  bgImage:{
    width:400,
    height:400,
    marginTop: 70,
    borderWidth: 5,
    borderRadius: 20,
    borderColor: 'white'
  },
  button:{
    backgroundColor:Colors.WHITE,
    padding:15,
    paddingHorizontal:5,
    borderRadius:99,
    marginTop:30
  }
})