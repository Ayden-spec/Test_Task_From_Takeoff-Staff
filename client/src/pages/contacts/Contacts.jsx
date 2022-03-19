import Selector from '../../components/selector/Selector'
import './contacts.css'

function Contacts() {
    return (
        <div className='container_contacts'>
            <div className="contact_menu">
                <div className="search">
                    <Selector data={['1', '2', '3']} callback={(e) => console.log(e)} />
                </div>
                <button className="add_contact_button">
                    +
                </button>
            </div>
            <div className='contact'>Айдар</div>
            <div className='contact'>Айдар</div>
            <div className='contact'>Айдар</div>
            <div className='contact'>Айдар</div>
        </div>
    )
}
export default Contacts