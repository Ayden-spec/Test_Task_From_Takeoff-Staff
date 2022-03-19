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

    const dispatch = useDispatch();
    const contacts = useSelector(state=>state.user.contacts);
    const navigate = useNavigate();

    useEffect(()=> {
        dispatch(get_contacts((e)=>SetError(e)))
    }, [])
    return (
        <div className='container_contacts'>
            <div className="contact_menu">
                <div className="search">
                    <Selector data={contacts.map(el=>el.name)} callback={(e) => console.log(e)} />
                </div>
                <button className="add_contact_button" onClick={()=>navigate('addcontact')}>
                    +
                </button>
            </div>
            {
                Error !== '' && <div className='contact'>{Error}</div>
            }
            {
                Error === '' && contacts.map(element=>(
                    <div className='contact' onClick={()=>navigate(`/contact/${element.contact_id}`)}>{element.name}</div>
                ))
            }
        </div>
    )
}
export default Contacts