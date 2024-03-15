import { Text, View, Button, StyleSheet } from "react-native";
import { getUserData, UserData, userLogout } from "../local_storage/storage_manager";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";

const HomeScreen = () => {

    const navigation = useNavigation();

    const [userData, setUserData] = useState<UserData>();

    useEffect(() => {

      getUserData()
        .then((data) => {
          setUserData(data)
        })
        .catch((e) => {
            console.log(e);
        });

    },[]);

    const logout = () => {
      userLogout()
        .then(() => {
            navigation.replace('Login');
        })
        .catch((e) => {
            console.log(e);
        });
    };

    return (
      <View style={styles.container}>
        <Text style={styles.defaultText}>fullname: {userData?.firstName} {userData?.lastName}</Text>
        <Text style={styles.defaultText}>email: {userData?.email}</Text>
        <Text style={styles.defaultText}>phone: {userData?.phone}</Text>
        <View style={styles.spacer} />
        <Button title="Logout" onPress={logout} />
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'left',
    backgroundColor: '#fff',
    paddingHorizontal: 16
  },
  spacer: {
    marginTop:24
  },
  defaultText: {
    fontSize: 24,
    color: 'black'
  }
});

export default HomeScreen;