import './input.css'
const Input = ({placeholder, type, value, setValue}) => {
    return (
        <label className='container_input'>
            <p className='placeholder_input'>{placeholder}</p>
            <input className='input' type={type} value={value} onChange={(event) => setValue(event.target.value)} />
        </label>
    )
}
export default Input