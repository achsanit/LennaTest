import { ON_LOGIN_EMAIL_CHANGED, ON_LOGIN_PASSWORD_CHANGED, ON_PASSWORD_CHANGED } from "../../utils/constant";

const initialState = {
    email: '',
    password: ''
};

export const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case ON_LOGIN_EMAIL_CHANGED: {
            return {
                ...state,
                email: action.payload
            }
        }
        case ON_LOGIN_PASSWORD_CHANGED: {
            return {
                ...state,
                password: action.payload
            }
        }
        default: {
            return {
                state
            }; 
        }
    }
}