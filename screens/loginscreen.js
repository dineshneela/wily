import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  Alert
} from "react-native";
import firebase from "firebase"
export default class LoginScreen extends React.Component{
    constructor(){
        super();
        this.state={
            emailId:'',
            password:''
        }
    }
    login=async(email,password)=>{
        if(email&&password){
            try{
                const response=await firebase.auth().signInWithEmailAndPassword(email,password)
                if(response){
                    console.log()
                    this.props.navigation.navigate('Transaction')
                }
            }
            catch(error){
                switch(error.code){
                    case 'auth/user-not-found':
                            alert("User Doesn't Exist ")
                            console.log("User Doesn't Exist")
                            break
                    case 'auth/invalid-email':
                            alert("Incorrect email or password ")
                            console.log("Incorrect email or password")
                            break        
                            
                }
            }
        }
        else{
            alert("Enter email and password")
        }
    }
    render(){
        return(
            
               <KeyboardAvoidingView style={{alignItems:"center",marginTop:20}}>
                   <View>
                       <Image source={require("../assets/booklogo.jpg")}
                       style={{width:200,height:200}}
                       />
                       <Text style={{textAlign:"center",fontSize:30}}>WILLY</Text>
                   </View>
                   <View>
                       <TextInput style={StyleSheet.loginbox}
                       placeholder="abc@example.com"
                       keyboardType="email-address"
                       onChangeText={(text)=>{
                           this.setState({emailId:text})
                       }}
                       />
                       <TextInput style={StyleSheet.loginbox}
                       secureTextEntry={true}
                       placeholder="Enter pasword"
                       
                       onChangeText={(text)=>{
                           this.setState({password:text})
                       }}
                       />
                   </View>
                   <View>
                       <TouchableOpacity style={{height:30,width:90,borderWidth:1,marginTop:20,backgroundColor:"yellow",paddingTop:5,borderRadius:7}}
                       onPress={()=>{this.login(this.state.emailId,this.state.password)}}>
                           <Text style={{textAlign:"center"}}>Login</Text>
                       </TouchableOpacity>
                   </View>
               </KeyboardAvoidingView>
            
        )
    }
}
const styles= StyleSheet.create({
    loginbox: {
        width: 300,
        height: 40,
        borderWidth: 1.5,
        margin:10,
        paddingLeft:10,
        fontSize: 20
      },
})