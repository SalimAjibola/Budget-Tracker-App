import { View, Text, TextInput, StyleSheet, TouchableOpacity, ToastAndroid, Alert, ActivityIndicator } from 'react-native'
import React, {useState} from 'react'
import Colors from '../utils/Colors';
import ColorPicker from '../components/ColorPicker';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import { supabase } from '../utils/SupabaseConfig';
import { client } from '../utils/KindeConfig';
import { router, useRouter } from 'expo-router';

export default function AddNewCategory() {
    const [selectedIcon,setSelectedIcon] = useState('IC');
    const [selectedColor,setSelectedColor] = useState(Colors.PURPLE);
    const [categoryName,setCategoryName]=useState();
    const [totalBudget,setTotalBudget]=useState();
    const [loading,setLoading]=useState(false);

    const router = useRouter();

    const onCreateCategory = async()=>{
        setLoading(true)
        const user = await client.getUserDetails();
        const {data,error} = await supabase.from('Category')
        .insert([{
            name:categoryName,
            assigned_budget:totalBudget,
            icon:selectedIcon,
            color:selectedColor,
            created_by:user.email
        }]).select();
        console.log(data);
        if(data)
            {
                router.replace({
                    pathname:  '/category-detail',
                    params:{
                        categoryId:data[0].id
                    }
                })   
                setLoading(false)
                Alert.alert('Category Created Successfully!');
            }
            if(error){
                setLoading(false)
            }
    }
  return (
    <View style={{marginTop:20,padding:20}}>
      <View style={{
        justifyContent:'center',
        alignItems:'center'
      }}>
        <TextInput 
        style={[styles.iconInput,{backgroundColor: selectedColor}]}
        maxLength={2}
        onChangeText={(value)=>setSelectedIcon(value)}
        > {selectedIcon}</TextInput>
        <ColorPicker 
        selectedColor={selectedColor}
        setSelectedColor={(color)=>setSelectedColor(color)}/>
      </View>

      <View style={styles.inputView}>
        <MaterialIcons name="local-offer" size={24} color={Colors.GRAY}/>
        <TextInput 
        placeholder='Category Name'
        placeholderTextColor="#000" 
        onChangeText={(v)=>setCategoryName(v)}
        style={{width:'100%',fontSize:17}}/>
      </View>

      <View style={styles.inputView}>
      <FontAwesome6 name="naira-sign" size={24} color={Colors.GRAY} />
        <TextInput 
        placeholder='Total Budget'
        placeholderTextColor="#000"
        keyboardType='numeric'
        onChangeText={(v)=>setTotalBudget(v)}
        style={{width:'100%',fontSize:17}}/>
      </View>

      <TouchableOpacity style={styles.button}
      disabled={!categoryName||!totalBudget||loading}
      onPress={()=>onCreateCategory()}>
        {loading?
        <ActivityIndicator color={Colors.WHITE}/>
            :
        <Text style={{textAlign:'center',fontSize:26,color:Colors.WHITE}}>Create</Text>}
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    iconInput:{
        textAlign:'center',
        fontSize:30,
        padding:20,
        borderRadius:99,
        paddingHorizontal:28,
        color:Colors.WHITE
    },
    inputView:{
        borderWidth:1,
        display:'flex',
        flexDirection:'row',
        gap:2,
        padding:14,
        borderRadius:10,
        borderColor:Colors.GRAY,
        backgroundColor:Colors.WHITE,
        alignItems:'center',
        marginTop:20
    },
    button:{
        backgroundColor:Colors.PRIMARY,
        padding:15,
        borderRadius:19,
        marginTop:30
    }
})