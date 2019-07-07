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
import { Google } from "expo";

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

        updateFormData(email, first_name, last_name);

        
        setLoading(false);
        //Alert.alert("Logged in!", `Hi ${(await response.json()).name}!`);
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }

  };  

  const googleLogin = async() => {
    const GOOGLE_ID_iOS = "986537223104-nn2hdag00a7cfi5h6nbj0o29d07m03iv.apps.googleusercontent.com";
    const GOOGLE_ID_ANDROID = "986537223104-1mshpcl4rsqp3uicroj1h33gtd4jpool.apps.googleusercontent.com";

    try{
      setLoading(true);
      const result = await Google.logInAsync({
        androidClientId: GOOGLE_ID_ANDROID,
        iosClientId: GOOGLE_ID_iOS,        
        scopes: ["profile", "email"]
      });

      console.log(result);

      if(result.type === "success"){
        const user = await fetch('https://www.googleapis.com/userinfo/v2/me', {
          headers: { Authorization: `Bearer ${result.accessToken}` }
        });

        const {email, family_name, given_name} = await user.json();
        updateFormData(email, given_name, family_name);
        
      } else {
        return { cancelled: true };
      }

    } catch(e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const updateFormData = (email, firstName, lastName) => {
    emailInput.setValue(email);
    fNameInput.setValue(firstName);
    lNameInput.setValue(lastName);

    const [username] = email.split("@");
    userNameInput.setValue(username);
  };


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
          <AuthButton bgColor={"#EE1922"} loading={false} onPress={googleLogin} text="Connect Google" />
        </FBContainer>        

      </View>
    </TouchableWithoutFeedback>

    </>
)};