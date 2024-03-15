import { View, Text, StyleSheet, SafeAreaView, Button, ScrollView, Alert } from "react-native";
import {InputLabel, InputPassword} from "../components/input_text";
import { useNavigation } from "@react-navigation/native";
import { connect } from 'react-redux'
import React from "react";
import { ON_EMAIL_CHANGED, ON_FIRSTNAME_CHANGED, ON_LASTNAME_CHANGED, ON_PASSWORD_CHANGED, ON_PHONE_CHANGED, ON_RETYPE_PASSWORD_CHANGED } from "../utils/constant";
import { UserData, storeUserData } from "../local_storage/storage_manager";
import { emailRegex } from "../utils/validation";

interface Props {
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
    password: string;
    retypePassword: string;
    setFirstname: (text: string) => void;
    setLastname: (text: string) => void;
    setEmail: (text: string) => void;
    setPhone: (text: string) => void;
    setPassword: (text: string) => void;
    setRetypePassword: (text: string) => void;
}

const RegisterScreen: React.FC<Props> = ({ 
    firstname, 
    lastname, 
    email, 
    phone, 
    password, 
    retypePassword, 
    setFirstname, 
    setLastname, 
    setEmail, 
    setPhone, 
    setPassword, 
    setRetypePassword 
}) => {
    const navigation = useNavigation();
    const register = () => {
        const data: UserData = {
            firstName: firstname,
            lastName: lastname,
            email: email,
            phone: phone,
            password: password
        };

        console.log(data);
        console.log(retypePassword);
        console.log(password);

        if (data.firstName == undefined || data.lastName == undefined || 
            data.email == undefined || data.phone == undefined || 
            data.password == undefined || retypePassword == undefined || retypePassword != password ||
            data.firstName == '' || data.lastName == '' || data.email == '' ||
            data.phone == ''|| data.password == '' || retypePassword == ''
        ) {
            Alert.alert('Cant register', 'please fill all the fields..');
            return
        } else {
            storeUserData(data)
            .then((success) => {
                if(success) {
                    navigation.pop();
                }
            })
            .catch((e) => {
                console.log(e);
            });
        }
    };

    return (
        <ScrollView style={{flex:1, backgroundColor: '#fff',}}>
            <SafeAreaView style={styles.container}>
                <Text style={{...styles.title, marginTop:48}}>Register</Text>
                <InputLabel 
                    label="Firstname"
                    value={firstname}
                    onChangeText={setFirstname} 
                    isError={
                        false
                    } 
                    errMessage={"Field cant be empty"}/>
                <InputLabel 
                    label="Lastname"
                    value={lastname}
                    onChangeText={setLastname} isError={false} errMessage={"Field cant be empty"}/>
                <InputLabel 
                    label="Email"
                    value={email}
                    onChangeText={setEmail} 
                    isError={ !emailRegex.test(email) } 
                    errMessage={"format not match"}/>
                <InputLabel 
                    label="Phone number"
                    value={phone}
                    onChangeText={setPhone} 
                    isError={ isNaN(Number(phone)) } 
                    errMessage={"required only number"}
                />
                <InputPassword 
                    label="Password"
                    value={password}
                    onChangeText={setPassword} isError={false} errMessage={""}/>
                <InputPassword 
                    label="Retype Password"
                    value={retypePassword}
                    onChangeText={setRetypePassword} 
                    isError={retypePassword != password} 
                    errMessage={"retype password not match with password"}/>
                <View style={{marginTop:24}} />
                <Button 
                    title="Register"
                    onPress={register}
                />
                <View style={{marginTop:24}} />
            </SafeAreaView>
        </ScrollView>
    );
}

const mapStateToProps = (state: any) => {
    return {
        firstname: state.register.firstname,
        lastname: state.register.lastname,
        email: state.register.email,
        phone: state.register.phone,
        password: state.register.password,
        retypePassword: state.register.retypePassword,
    };
};

const mapDispatchToProps = (dispatch) => ({
    setFirstname: (text: string) => dispatch({ 
        type: ON_FIRSTNAME_CHANGED,
        payload: text
    }),
    setLastname: (text: string) => dispatch({ 
        type: ON_LASTNAME_CHANGED, 
        payload: text 
    }),
    setEmail: (text: string) => dispatch({ 
        type: ON_EMAIL_CHANGED, 
        payload: text
    }),
    setPhone: (text: string) => dispatch({ 
        type: ON_PHONE_CHANGED, 
        payload: text
    }),
    setPassword: (text: string) => dispatch({ 
        type: ON_PASSWORD_CHANGED, 
        payload: text
    }),
    setRetypePassword: (text: string) => dispatch({ 
        type: ON_RETYPE_PASSWORD_CHANGED, 
        payload: text
    }),
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen);

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
    },
    title: {
      fontSize: 32,
      fontWeight: 'bold',
      marginBottom: 100,
      color: '#000',
    },
    textDefault: {
        color: '#000',
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'center', 
        alignItems: 'center', 
        backgroundColor: '#fff',
        padding: 10,
        marginBottom:32
    },
    inputLabel: {
        width: '80%',
    },
    input: {
      width: '80%',
      height: 40,
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 5,
      marginBottom: 10,
      paddingHorizontal: 10,
    },
    
});
