import AsyncStorage from "@react-native-async-storage/async-storage"

const USER_DATA = 'USER_DATA';
const IS_LOGIN = 'IS_LOGIN';

export interface UserData {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string
};

export const setStateLogin = async (isLogin: boolean) => {
    await AsyncStorage.setItem(IS_LOGIN, JSON.stringify({
        state: isLogin
    }));
}

export const isLogin = (): Promise<boolean> => {
    return new Promise(async (resolve: (val:boolean) => void, reject)  => {
        try {
            const data = await AsyncStorage.getItem(IS_LOGIN);
            resolve(JSON.parse(data).state)
        } catch (error) {
            reject(error)
        }
    });
}

export const checkUser = (email: string, password: string): Promise<boolean> => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await AsyncStorage.getItem(USER_DATA);
            const result = JSON.parse(data)
            
            if(result != null) {
                if (email == result.email && password == result.password) {
                    setStateLogin(true);
                } else {
                    setStateLogin(false)
                };
                resolve(email == result.email && password == result.password);
            } else {
                resolve(false);
            }
        } catch (error) {
            reject(error);
        }
    });
}

export const getUserData = async (): Promise<UserData> => {
    return new Promise(async (resolve: (val: UserData) => void, reject) => {
        try {
            const data = await AsyncStorage.getItem(USER_DATA);
            resolve(JSON.parse(data));
        } catch (error) {
            reject(error);
        }
    });
}

export const storeUserData = (data: UserData): Promise<boolean> => {
    return new Promise(async (resolve, reject) => {
        try {
            await AsyncStorage.setItem(USER_DATA, JSON.stringify(data));
            resolve(true);
        } catch (error) {
            reject(error);
        }
    });
}

export const userLogout =  () => {
    return new Promise(async (resolve, reject) => {
        try {
            setStateLogin(false)
            resolve(true);
        } catch (error) {
            reject(error);
        }
    });
}