const SET_USER = 'SET_USER'
const LOGOUT = 'LOGOUT'
const SET_CONTACTS = 'SET_CONTACTS'
const SET_CONTACT = 'SET_CONTACT'


const defaultstate = {
    currentUser: {},
    isAuth: false,
    contacts: [],
    contact: {},
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
        case SET_CONTACT:
            return {
                ...state,
                contact: action.payload
            }
        default: return state;
    }
}


export const setUser = user => ({ type: SET_USER, payload: user })
export const logout = () => ({ type: LOGOUT })

export const set_contacts = contacts => ({ type: SET_CONTACTS, payload: contacts })

export const set_contact = contact => ({ type: SET_CONTACT, payload: contact })