import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Alert, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import Colors from '../utils/Colors';
import { Ionicons } from '@expo/vector-icons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import * as ImagePicker from 'expo-image-picker';
import { supabase } from '../utils/SupabaseConfig';
import { decode } from 'base64-arraybuffer'
import { useLocalSearchParams, useRouter } from 'expo-router';


const placeholder = 'https://gorillacoders.tech/assets/img/Gorilla.png'
export default function AddNewCategoryItem() {
    const [image, setImage] = useState(placeholder);
    const {categoryId} = useLocalSearchParams();
    const [name,setName] = useState();
    const [url,setUrl] = useState();
    const [cost,setCost] = useState();
    const [note,setNote] = useState();
    const [loading,setLoading] = useState(false);
    const router = useRouter();

    const onImagePick=async()=>{
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            quality: 1,
            base64:true
          });
      
          console.log(result);
      
          if (!result.canceled) {
            setImage(result.assets[0].base64);
          }
    }

    const onClickAdd=async()=>{
        setLoading(true)
        const fileName = Date.now();
        const { data, error } = await supabase
        .storage
        .from('images')
        .upload(fileName+'.png', decode(image), {
            contentType: 'image/png'
        });
        if(data)
            {
                const fileUrl = "https://mhaabkcfmowwwmzhadoz.supabase.co/storage/v1/object/public/images/"+fileName+".png";
                console.log(fileUrl);

                const { data, error }=await supabase
                .from('CategoryItems')
                .insert([{
                    name:name,
                    url:url,
                    cost:cost,
                    image:fileUrl,
                    note:note,
                    category_id:categoryId
                }]).select();

                Alert.alert("New Item Added!")
                console.log(data);
                setLoading(false);
                router.replace({
                    pathname:'/category-detail',
                    params:{
                        categoryId:categoryId
                    }
                })
            }
    }


    return (
        <KeyboardAvoidingView>
        <ScrollView style={{ padding: 20,backgroundColor:Colors.WHITE}}>
            <TouchableOpacity onPress={()=>onImagePick()}>
            <Image source={{ uri: image }}
                style={styles.image}
            />
            </TouchableOpacity>
            <View style={styles.textInputContainer}>
                <Ionicons name="pricetag" size={24} color={Colors.GRAY} />
                <TextInput placeholder='Item Name' placeholderTextColor="#000"
                onChangeText={(value)=>setName(value)} style={styles.input} />
            </View>

            <View style={styles.textInputContainer}>
            <FontAwesome6 name="naira-sign" size={24} color={Colors.GRAY} />
                <TextInput placeholder='Cost' placeholderTextColor="#000" keyboardType='number-pad' 
                onChangeText={(value)=>setCost(value)}  style={styles.input} />
            </View>

            <View style={styles.textInputContainer}>
                <Ionicons name="link" size={24} color={Colors.GRAY} />
                <TextInput placeholder='Url'
                onChangeText={(value)=>setUrl(value)} 
                 placeholderTextColor="#000" style={styles.input} />
            </View>

            <View style={styles.textInputContainer}>
                <Ionicons name="pencil" size={24} color={Colors.GRAY} />
                <TextInput placeholder='Note'
                onChangeText={(value)=>setNote(value)} 
                placeholderTextColor="#000" style={styles.input}
                numberOfLines={3} />
            </View>
            <TouchableOpacity style={styles.button}
                disabled={!name||!cost||loading}
                onPress={()=>onClickAdd()}
            >
                {loading?
                <ActivityIndicator color={Colors.WHITE}/>:
                <Text style={{textAlign:'center',fontFamily:'outfit-bold',color:Colors.WHITE,fontSize:17}}>Add</Text>
                }
            </TouchableOpacity>
        </ScrollView>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    image: {
        width: 150,
        height: 150,
        backgroundColor: Colors.GRAY,
        borderRadius: 15
    },
    textInputContainer: {
        padding: 10,
        borderWidth: 1,
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        borderRadius: 10,
        borderColor: Colors.GRAY,
        marginTop: 10
    },
    input: {
        fontSize: 17,
        width: '70%'
    },
    button:{
        padding:20,
        backgroundColor:Colors.PRIMARY,
        borderRadius:99,
        marginTop:25
    }
})