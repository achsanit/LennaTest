import { Text, View } from 'react-native';
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
        <View>
            <Text>Hello World!!!</Text>
        </View>
    )
}

export default SplashScreen;