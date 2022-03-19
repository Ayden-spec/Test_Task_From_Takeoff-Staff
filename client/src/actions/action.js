import axios from 'axios'
import { setUser } from '../reducers/userReducers'


let domain = 'http://localhost:5000';
let site_domain = 'http://localhost:3000/';

export const registration = async (email, password, name) => {
    try {
        const response = await axios.post(`${domain}/registration?content-type=application/json; charset=utf-8`, {
            email,
            password,
            name
        })
    } catch (e) {
        console.log(e)
    }
}

export const login = (email, password, callback) => {
    return async dispatch => {
        try {
            const response = await axios.post(`${domain}/login?content-type=application/json; charset=utf-8`, {
                email,
                password
            })
                dispatch(setUser(response.data.user))
                localStorage.setItem('token', response.data.token)
                window.location.href = site_domain + '/contacts'
        } catch (e) {
            callback(e.response.data.message)
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
