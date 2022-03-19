import { useState } from 'react'
import Input from '../../components/input/Input';
import './contact.css'

function Contact() {
    const [Edit, SetEdit] = useState(false);

    return (
        <div className='container_contact'>
            <div className="contact_logo"><strong>А</strong></div>
            <p className='contact_name'><strong>Айдар</strong></p>

            <div className="contact_block">
                <p className="block_title">сотовый</p>
                {
                    Edit ? <Input /> : <p className='block_text'>89228414084</p>
                }
            </div>

            <div className="contact_block">
                <p className="block_title">e-mail</p>
                {
                    Edit ? <Input /> : <p className='block_text'>aydar@mail.ru</p>
                }
            </div>

            <div className="contact_block">
                <p className="block_title">заметки</p>
                {
                    Edit ? <Input /> : <p className='block_text'>123456</p>
                }
            </div>
            {
                Edit ?
                    <div className='width'>
                        <div className='width'>
                            <button className='contact_button' onClick={() => SetEdit(false)}>Сохранить</button>
                        </div>
                        <div className='width'>
                            <button className='contact_button_del' onClick={() => SetEdit(false)}>Удалить</button>
                        </div>
                    </div>
                    :
                    <button className='contact_button' onClick={() => SetEdit(true)}>Править</button>
            }
        </div>
    )
}
export default Contact