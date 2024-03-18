import { Image, View, StyleSheet } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { useEffect } from 'react';
import { isLogin } from '../local_storage/storage_manager';


const SplashScreen = () => {
    const navigation = useNavigation();

    useEffect(() => {
        const timer = setTimeout(() => { 
            isLogin()
                .then((isLogin) => {
                    if (isLogin) {
                        navigation.replace('Home');
                    } else {
                        navigation.replace('Login');
                    }
                })
                .catch((e) => {
                    console.log(e)
                })
        }, 3000);
        return () => clearTimeout(timer);
      }, []);

    return (
        <View style={styles.container}>
            <Image
                source={require('../../assets/react_logo.png')}
                style={styles.logo}
                resizeMode="contain"
            />
      </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ffffff', // Set your background color
      justifyContent: 'center',
      alignItems: 'center',
    },
    logo: {
      width: 200, // Adjust the width and height of the logo as needed
      height: 200,
    },
  });

export default SplashScreen;