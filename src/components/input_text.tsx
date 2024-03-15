import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from "react-native";

const InputLabel = (
    {label, value, onChangeText, isError = false, errMessage = ""} : 
    {label: string, value: any, isError: boolean, errMessage: string, onChangeText: (str:string) => void}) => {
    
    return (
        <View style={styles.inputLabel}>
            <Text style={styles.textDefault}>{label}</Text>
            <TextInput
                style={{...styles.input, width:'100%'}}
                placeholder="Username"
                onChangeText={onChangeText}
                value={value}
                autoCapitalize="none"
            />
            {isError && <Text style={{color:'red'}}>{errMessage}</Text>}
        </View>
    )
}

const InputPassword = (
    {label, value, onChangeText, isError = false, errMessage = ""} : 
    {label: string, value: any, isError: boolean, errMessage: string, onChangeText: (str:string) => void}) => {

        const [isHide, setHide] = useState(true);

        const togglePasswordVisibility = () => {
            setHide(!isHide);
          };

        return (
            <View >
                <Text style={styles.textDefault}>{label}</Text>
                <View style={styles.inputPassContainer}>
                    <TextInput
                        style={styles.inputPass}
                        placeholder="Password"
                        secureTextEntry={isHide} // Toggle secureTextEntry based on hidePassword state
                        value={value}
                        onChangeText={onChangeText}
                    />
                    <TouchableOpacity style={styles.textContainer} onPress={togglePasswordVisibility}>
                        <Text style={{color: '#000', marginTop:8}}>{isHide ? "Show" : "Hide"}</Text>
                    </TouchableOpacity>
                </View>
                {isError && <Text style={{color:'red'}}>{errMessage}</Text>}
            </View>
            
        )
}

const styles = StyleSheet.create({
    inputPassContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    textDefault: {
        marginTop:10,
        color: '#000',
    },
    inputPass: {
        width: '80%',
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        color: '#000',
        paddingVertical: 10,
        marginTop:8
    },
    textContainer: {
        position: 'absolute',
        marginTop:8,
        alignItems:'center',
        right: 15,
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
      paddingHorizontal: 10,
      color: '#000',
      marginTop:8
    },
});


export {InputLabel,InputPassword};