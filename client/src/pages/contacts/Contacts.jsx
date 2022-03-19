import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { get_contacts } from '../../actions/action';
import Selector from '../../components/selector/Selector'
import './contacts.css'

function Contacts() {
    const [Error, SetError] = useState('');

    const [Contacts, SetContacts] = useState([]);

    const dispatch = useDispatch();
    const contacts = useSelector(state => state.user.contacts);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(get_contacts((e) => {
            if (e.error) {
                SetError(e)
            }else{
                SetContacts(e)
            }
        }));
    }, [])

    const Handle_Search = (e) =>{
        SetContacts(contacts.filter(el=>el.name.toLowerCase().includes(e.toLowerCase())))
    }

    return (
        <div className='container_contacts'>
            <div className="contact_menu">
                <div className="search">
                    <Selector placeholder='Поиск' data={contacts.map(el => el.name)} callback={(e) => Handle_Search(e)} />
                </div>
                <button className="add_contact_button" onClick={() => navigate('addcontact')}>
                    +
                </button>
            </div>
            {
                Error !== '' && <div className='contact'>{Error}</div>
            }
            {
                Error === '' && Contacts.map(element => (
                    <div key={`${element.user_id}_${element.contact_id}`} className='contact' onClick={() => navigate(`/contact/${element.contact_id}`)}>{element.name}</div>
                ))
            }
        </div>
    )
}
export default Contacts