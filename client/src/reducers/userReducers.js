const SET_USER = 'SET_USER'
const LOGOUT = 'LOGOUT'
const SET_CONTACTS = 'SET_CONTACTS'


const defaultstate = {
    currentUser: {},
    isAuth: false,
    contacts: [],
}

export default function userReducers(state = defaultstate, action) {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                currentUser: action.payload,
                isAuth: true
            }
        case LOGOUT:
            localStorage.removeItem('token')
            return {
                ...state,
                currentUser: {},
                isAuth: false
            }
        case SET_CONTACTS:
            return {
                ...state,
                contacts: action.payload
            }
        default: return state;
    }
}


export const setUser = user => ({ type: SET_USER, payload: user })
export const logout = () => ({ type: LOGOUT })

export const set_contacts = contacts => ({ type: SET_CONTACTS, payload: contacts })