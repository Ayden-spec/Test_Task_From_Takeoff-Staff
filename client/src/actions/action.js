import axios from 'axios'
import { setUser, set_contact, set_contacts } from '../reducers/userReducers'


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
                window.location.href = site_domain + 'contacts'
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


export const get_contacts = (callback) => {
    return async dispatch => {
        try {
            if (!localStorage.getItem('token')) { return }
            const response = await axios.get(`${domain}/get-contacts?content-type=application/json; charset=utf-8`,
                { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
            )
            dispatch(set_contacts(response.data.contacts))
        } catch (e) {
            callback(e.response.data.message)
            console.log(e)
        }
    }
}

export const get_contact = (id, callback) => {
    return async dispatch => {
        try {
            if (!localStorage.getItem('token')) { return }
            const response = await axios.get(`${domain}/get-contact/${id}?content-type=application/json; charset=utf-8`,
                { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
            )
            dispatch(set_contact(response.data.contact))
        } catch (e) {
            callback(e.response.data.message)
            console.log(e)
        }
    }
}

export const put_contact = (name, phone_number, email, comment, id) => {
    return async dispatch => {
        try {
            if (!localStorage.getItem('token')) { return }
            const data = { name, phone_number, email, comment}
            const response = await axios.put(`${domain}/put-contact/${id}?content-type=application/json; charset=utf-8`, data,
                { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
            )
            window.location.href = site_domain
        } catch (e) {
            console.log(e)
        }
    }
}

export const post_contact = (name, phone_number, email, comment) => {
    return async dispatch => {
        try {
            if (!localStorage.getItem('token')) { return }
            const data = { name, phone_number, email, comment}
            const response = await axios.post(`${domain}/post-contact?content-type=application/json; charset=utf-8`, data,
                { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
            )
            window.location.href = site_domain
        } catch (e) {
            console.log(e)
        }
    }
}

export const delete_contact = (id) => {
    return async dispatch => {
        try {
            if (!localStorage.getItem('token')) { return }
            const response = await axios.delete(`${domain}/delete-contact/${id}?content-type=application/json; charset=utf-8`,
                { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
            )
            window.location.href = site_domain
        } catch (e) {
            console.log(e)
        }
    }
}