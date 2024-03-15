import { ON_EMAIL_CHANGED, ON_FIRSTNAME_CHANGED, ON_LASTNAME_CHANGED, ON_PASSWORD_CHANGED, ON_PHONE_CHANGED, ON_RETYPE_PASSWORD_CHANGED } from "../../utils/constant";

const initialState = {
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    password: '',
    retypePassword: ''
};

export const registerReducer = (state = initialState, action) => {
    switch (action.type) {
        case ON_FIRSTNAME_CHANGED: {
            return {
                ...state,
                firstname: action.payload
            }
        }
        case ON_LASTNAME_CHANGED: {
            return {
                ...state,
                lastname: action.payload
            }
        }
        case ON_EMAIL_CHANGED: {
            return {
                ...state,
                email: action.payload
            }
        }
        case ON_PHONE_CHANGED: {
            return {
                ...state,
                phone: action.payload
            }
        }
        case ON_PASSWORD_CHANGED: {
            return {
                ...state,
                password: action.payload
            }
        }
        case ON_RETYPE_PASSWORD_CHANGED: {
            return {
                ...state,
                retypePassword: action.payload
            }
        }
        default: {
            return {
                state
            }; 
        }
    }
    
}