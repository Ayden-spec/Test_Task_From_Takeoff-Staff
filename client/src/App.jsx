import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { auth } from './actions/action';


import './App.css'
import Contacts from "./pages/contacts/Contacts";
import Authorization from "./pages/authorization/Authorization";
import Contact from './pages/contact/Contact';


function App() {
  const dispatch = useDispatch()
  const isAuth = useSelector(state => state.user.isAuth)
  useEffect(() => {
    dispatch(auth())
  }, [])
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          {!isAuth && <Route path="*" element={<Authorization />} />}
          {!isAuth && <Route path="/" element={<Authorization />} />}
          {isAuth && <Route path="/contacts" element={<Contacts />} />}
          {isAuth && <Route path="/*" element={<Contacts />} />}
          {isAuth && <Route path="/contact/:id" element={<Contact />} />}
          {isAuth && <Route path="/addcontact" element={<Contact />} />}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
