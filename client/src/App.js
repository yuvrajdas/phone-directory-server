import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/NavBar/Navbar';
import ContactLists from './components/Contacts/ContactLists/ContactList'
import AddContact from './components/Contacts/AddContacts/AddContact'
import EditContact from './components/Contacts/EditContacts/EditContact'
import ViewContact from './components/Contacts/ViewContacts/ViewContact'
let App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path={'/'} element={<Navigate to={'/contact/list'} />} />
        <Route path={'/contact/list'} element={<ContactLists />} />
        <Route path={'/contact/add'} element={<AddContact />} />
        <Route path={'/contact/edit/:contactId'} element={<EditContact />} />
        <Route path={'/contact/view/:contactId'} element={<ViewContact />} />
      </Routes>
    </>
  );
}
export default App;
