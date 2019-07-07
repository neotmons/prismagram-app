import React, {useState} from "react";
import styled from "styled-components";
import {TouchableWithoutFeedback, Keyboard } from "react-native";
import AuthButton from "../../components/AuthButton";
import AuthInput from "../../components/AuthInput";
import useInput from "../../hooks/useInput";
import { Alert } from "react-native";
import { useMutation } from "react-apollo-hooks";
import { CREATE_ACCOUNT } from "./AuthQueries";
//import { Facebook } from "expo";
import * as Facebook from "expo-facebook";

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const FBContainer = styled.View`
  margin-top: 25px;
  padding-top: 25px;
  border-top-width: 1px;
  border-top-color: ${props => props.theme.lightGreyColor};
  border-style: solid;
`;


export default ({navigation}) => {
  const fNameInput = useInput("");
  const lNameInput = useInput("");
  const emailInput = useInput(navigation.getParam("email", ""));
  const userNameInput = useInput("");

  const [loading, setLoading] = useState(false);

  const createAccountMutation = useMutation(CREATE_ACCOUNT, {
    variables:{
      username: userNameInput.value,
      email: emailInput.value,
      firstName: fNameInput.value,
      lastName: lNameInput.value
    }
  });

  const handleSignup = async() => {
    
    const {value:fName} = fNameInput;
    const {value:lName} = lNameInput;
    const {value:userName} = userNameInput;
    const { value:email } = emailInput;

    // Email 주소 정규 표현식
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;    
    if(!emailRegex.test(email)) {
      return Alert.alert("That email is invalid")
    }

    if(fName === "" || lName === ""){
      return Alert.alert("I need your name");
    }

    if(userName === ""){
      return Alert.alert("Invalid username");
    }

    try{
      setLoading(true);
      const { data:{ createAccount } } = await createAccountMutation();

      if(createAccount){
        Alert.alert("Account created!", "Log in now!");
        navigation.navigate("Login", {email} );
      }

    }catch(e){
      Alert.alert("Username taken.", "Log in instead");
      navigation.navigate("Login", {email})

    }finally{
      setLoading(false);
    }
  };

  const fbLogin = async() => {
    try {
      setLoading(true);
      const {
        type,
        token,
        expires,
        permissions,
        declinedPermissions,
      } = await Facebook.logInWithReadPermissionsAsync("2299591176967048", {
        permissions: ["public_profile", "email"],
      });
      if (type === "success") {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id,last_name,first_name,email`);
        const {email, first_name, last_name} = await response.json();
        emailInput.setValue(email);
        fNameInput.setValue(first_name);
        lNameInput.setValue(last_name);

        const [username] = email.split("@");
        userNameInput.setValue(username);
        
        setLoading(false);
        //Alert.alert("Logged in!", `Hi ${(await response.json()).name}!`);
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }

  }  


  return (
    <>
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View>
      <AuthInput 
          {...fNameInput} 
          placeholder="Frist name" 
          autoCapitalize="words"
        />        
        <AuthInput 
          {...lNameInput} 
          placeholder="Last name" 
          autoCapitalize="words"
        />      

        <AuthInput 
          {...emailInput} 
          placeholder="Email" 
          keyboardType="email-address" 
          returnKeyType="send"
          autoCorrect={false}
          
        />
        <AuthInput 
          {...userNameInput} 
          placeholder="User name" 
          autoCorrect={false}
        />                        
        <AuthButton loading={loading} onPress={handleSignup} text="Sign up" />

        <FBContainer>
          <AuthButton bgColor={"#2D4DA7"} loading={false} onPress={fbLogin} text="Connect Facebook" />
        </FBContainer>        
      </View>
    </TouchableWithoutFeedback>

    </>
)};