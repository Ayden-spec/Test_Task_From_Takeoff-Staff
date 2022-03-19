import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../../actions/action'

import Input from '../../components/input/Input'
import './authorization.css'

function Authorization() {
    const [Email, SetEmail] = useState('');
    const [Password, SetPassword] = useState('');

    const [Error, SetError] = useState('');

    const dispatch = useDispatch();

    return (
        <div className='container_auth'>
            <p className='auth_title'><strong>Авторизация</strong></p>
            {Error !== '' &&
                <div className='input_auth _+error'>
                    <p><strong>{Error}</strong></p>
                </div>
            }
            <div className='input_auth'>
                <Input placeholder='Email' type='text' value={Email} setValue={SetEmail} />
            </div>
            <div className='input_auth'>
                <Input placeholder='Password' type='password' value={Password} setValue={SetPassword} />
            </div>
            <button className='auth_button' onClick={() => dispatch(login(Email, Password, (e)=>{SetError(e)}))}>Войти</button>
        </div>
    )
}
export default Authorization