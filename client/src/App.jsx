import { BrowserRouter, Route, Routes } from 'react-router-dom'

import './App.css'
import Contacts from "./pages/contacts/Contacts";
import Authorization from "./pages/authorization/Authorization";
import Contact from './pages/contact/Contact';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="*" element={<Authorization />} />
          <Route path="/" element={<Authorization />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/contact/:id" element={<Contact />} />
          <Route path="/addcontact" element={<Contact />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
