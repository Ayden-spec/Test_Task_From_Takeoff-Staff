import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { delete_contact, get_contact, post_contact, put_contact } from '../../actions/action';
import Input from '../../components/input/Input';
import './contact.css'

function Contact({ edit, type }) {
    const [Edit, SetEdit] = useState(edit);
    const [Error, SetError] = useState('');

    const [Name, SetName] = useState('');
    const [Number, SetNumber] = useState('');
    const [Email, SetEmail] = useState('');
    const [Comment, SetComment] = useState('');

    const dispatch = useDispatch();
    const contact = useSelector(state => state.user.contact);
    const { id } = useParams();

    useEffect(() => {
        if (type === 'edit') {
            dispatch(get_contact(id, (e) => { SetError(e) }))
        }
    }, [])

    const Edit_Contact = () => {
        if (contact.email) {
            SetEmail(contact.email)
        }
        if (contact.comment) {
            SetComment(contact.comment)
        }
        SetName(contact.name)
        SetNumber(contact.phone_number)
        SetEdit(true)
    }

    const Save_Contact = () =>{
        if(Name === '' || Number === ''){
            SetError('Запонлите обязательные поля "Имя" и "сотовый".')
            return
        }
        dispatch(put_contact(Name, Number, Email, Comment, id))
    }

    const Add_Contact = () =>{
        if(Name === '' || Number === ''){
            SetError('Запонлите обязательные поля "Имя", "сотовый".')
            return
        }
        dispatch(post_contact(Name, Number, Email, Comment))
    }
    return (
        <div className='container_contact'>
            <div className="contact_logo"><strong>{Edit ? Name.charAt(0) : (typeof contact.name) === 'string' && contact.name.charAt(0)}</strong></div>
            <p className='contact_name'><strong>{Edit ? Name : contact.name}</strong></p>

            {
                Error !== '' && <p className='contact_name error'><strong>{Error}</strong></p>
            }

            {
                Edit &&
                <div className="contact_block">
                    <p className="block_title">Имя</p>
                    <Input type='text' value={Name} setValue={SetName} />
                </div>
            }
            <div className="contact_block">
                <p className="block_title">сотовый</p>
                {
                    Edit ? <Input type='text' value={Number} setValue={(e)=>SetNumber(e.replace(/[^+0-9]/g, ""))} /> : <p className='block_text'>{contact.phone_number}</p>
                }
            </div>
            {
                Edit ?
                    <div className="contact_block">
                        <p className="block_title">e-mail</p>
                        <Input type='text' value={Email} setValue={SetEmail} />
                    </div>
                    :
                    contact.email &&
                    <div className="contact_block">
                        <p className="block_title">e-mail</p>
                        <p className='block_text'>{contact.email}</p>
                    </div>
            }

            {
                Edit ?
                    <div className="contact_block">
                        <p className="block_title">заметки</p>
                        <Input type='text' value={Comment} setValue={SetComment} />
                    </div>
                    :
                    contact.comment &&
                    <div className="contact_block">
                        <p className="block_title">заметки</p>
                        <p className='block_text'>{contact.comment}</p>
                    </div>
            }
            {
                Edit ?
                    <div className='width'>
                        {
                            type === 'add' ?
                                <div className='width'>
                                    <button className='contact_button' onClick={() => Add_Contact()}>Создать</button>
                                </div>
                                :
                                <div className='width'>
                                    <button className='contact_button' onClick={() => Save_Contact()}>Сохранить</button>
                                </div>
                        }
                        {
                            type !== 'add' &&
                            <div className='width'>
                                <button className='contact_button_del' onClick={() => dispatch(delete_contact(id))}>Удалить</button>
                            </div>
                        }
                    </div>
                    :
                    <button className='contact_button' onClick={() => Edit_Contact()}>Править</button>
            }
        </div>
    )
}
export default Contact