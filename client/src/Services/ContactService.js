import axios from "axios";

export class ContactService{
    static serverUrl = `https://phone-dir.onrender.com`;

    static getAllContacts() {
        let dataUrl = `${this.serverUrl}/contacts`;
        return axios.get(dataUrl);
    }

    static getAllGroups() {
        let dataUrl = `${this.serverUrl}/group`;
        return axios.get(dataUrl);
    }

    static getGroup(contact) {
        let groupId = contact.groupId;
        let dataUrl = `${this.serverUrl}/group/${groupId}`;
        return axios.get(dataUrl);
    }
    
    static getContact(contactId) {
        let dataUrl = `${this.serverUrl}/contacts/${contactId}`;
        return axios.get(dataUrl);
    }

    static createContact(contact) {
        let dataUrl = `${this.serverUrl}/contacts`;
        return axios.post(dataUrl, contact);
    }
    
    static updateContact(contact, contactId) {
        let dataUrl = `${this.serverUrl}/contacts/${contactId}`;
        return axios.put(dataUrl, contact);

    }

    static deleteContact(contact, contactId) {
        let dataUrl = `${this.serverUrl}/contacts/${contactId}`;
        return axios.delete(dataUrl);
    }
}
