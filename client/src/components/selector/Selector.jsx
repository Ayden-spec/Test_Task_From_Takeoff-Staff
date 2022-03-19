import { useEffect, useRef, useState } from 'react'
import './selector.css'


function Selector({ data, callback }) {
    const [Input_Value, Set_Input_Value] = useState('');
    const [Active, SetActive] = useState(false)
    const [Data, SetData] = useState(data)

    const rootEl = useRef(null);

    const HandleChange = (e) => {
        SetActive(true)
        Set_Input_Value(e)
        SetData(data.filter(el => el.toLowerCase().includes(e.toLowerCase())).slice(0,3))
        callback(e) //В данном месте используется для демонстрации, что callback работает.
    }

    useEffect(() => {
        const onClick = e => rootEl.current.contains(e.target) || SetActive(false); //Проверка на клик вне div-a: "select".
        document.addEventListener('click', onClick);
        return () => document.removeEventListener('click', onClick);
    }, []);


    return (
        <div className="select">
            <label className="select__input" onClick={() => SetActive(!Active)} ref={rootEl}>
                Введите текст
                <input value={Input_Value} onChange={(event) => HandleChange(event.target.value)} placeholder='Введите текст' className='select__toggle' />
            </label>
            <div className={Active ? "datalist" : 'display_none'}>
                {
                    Data.map((el, index) => (
                        <p key={`Str_${index}`} className="option" onClick={() => HandleChange(el)}>{el}</p>
                    ))
                }
            </div>
        </div>
    )
}

export default Selector