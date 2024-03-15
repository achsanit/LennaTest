import { Text, StyleSheet, View, Alert, Button, TouchableOpacity } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import {InputLabel, InputPassword} from '../components/input_text';
import { checkUser, getUserData } from '../local_storage/storage_manager';
import React from 'react';
import { ON_LOGIN_EMAIL_CHANGED, ON_LOGIN_PASSWORD_CHANGED } from '../utils/constant';
import { connect } from 'react-redux';


interface Props {
  email: string,
  password: string,
  setEmail: (str: string) => void,
  setPassword: (str: string) => void,
}

const LoginScreen: React.FC<Props> = ({email, password, setEmail, setPassword}) => {

  const navigation = useNavigation();

  const register = () => {
    navigation.navigate('Register');
  };
  const login = () => {
    checkUser(email,password)
      .then((dataFound) => {
          if(dataFound) {
            navigation.replace('Home');
          } else {
            Alert.alert(
              "login failed",
              "User not found, please check your credentials or go to register..."
            )
          }
      })
      .catch((e) => {
        console.log("error Login " + e);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <InputLabel 
        label='Email'
        value={email}
        onChangeText={setEmail} isError={false} errMessage={'error'}      />
      <InputPassword 
        label='Password'
        value={password}
        onChangeText={setPassword} isError={false} errMessage={'error'}      />
      <View style={styles.rowContainer}>
        <Text style={styles.textDefault}>Belum punya akun?</Text>
        <TouchableOpacity onPress={register}>
          <Text style={{...styles.textDefault, marginStart:6, color: 'blue'}}>Register</Text>
        </TouchableOpacity>
      </View>
      <Button title='Login' onPress={login} style={styles.button} />
    </View>
  )
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff',
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
    input: {
      width: '80%',
      height: 40,
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 5,
      marginBottom: 10,
      paddingHorizontal: 10,
    },
    button: {
      backgroundColor: 'blue',
      width: '80%',
      height: 40,
      borderRadius: 5,
      justifyContent: 'center',
      alignItems: 'center',
    },
});

const mapStateToProps = (state: any) => {
  return {
    email: state.login.email,
    password: state.login.password
  }
};

const mapDispatchToProps = (dispatch: any) => ({
  setEmail: (text: string) => dispatch({
    type: ON_LOGIN_EMAIL_CHANGED, payload: text
  }),
  setPassword: (text: string) => dispatch({
    type: ON_LOGIN_PASSWORD_CHANGED, payload: text
  }),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);