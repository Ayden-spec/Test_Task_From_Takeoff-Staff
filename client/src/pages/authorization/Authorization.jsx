import Input from '../../components/input/Input'
import './authorization.css'

function Authorization() {
    return (
        <div className='container_auth'>
            <p className='auth_title'><strong>Авторизация</strong></p>
            <div className='input_auth'>
                <Input placeholder='Email' />
            </div>
            <div className='input_auth'>
                <Input placeholder='Password' />
            </div>
            <button className='auth_button'>Войти</button>
        </div>
    )
}
export default Authorization