import axios from 'axios'
import { setUser } from '../reducers/userReducers'


let domain = 'http://localhost:5000';

export const login = (email, password) => {
    return async dispatch => {
        try {
            const response = await axios.post(`${domain}/login?content-type=application/json; charset=utf-8`, {
                email,
                password
            })
            dispatch(setUser(response.data.user))
            localStorage.setItem('token', response.data.token)
        } catch (e) {
            console.log(e)
        }
    }
}

export const auth = () => {
    return async dispatch => {
        try {
            if (!localStorage.getItem('token')) { return }
            const response = await axios.get(`${domain}/auth?content-type=application/json; charset=utf-8`,
                { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
            )
            dispatch(setUser(response.data.user))
            localStorage.setItem('token', response.data.token)
        } catch (e) {
            console.log(e)
            localStorage.removeItem('token')
        }
    }
}
