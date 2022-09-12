import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ContactService } from "../../../Services/ContactService";
import Loader from "../../spinner/Loader";
const ContactList = () => {

  let [searchQry, setSearchQry] = useState({
    text: '',
  })
  let [contact, setContacts] = useState({
    loading: false,
    contacts: [],
    filteredContacts: [],
    errorMsg: ''
  });
  const getContactsRecords = async () => {
    try {
      setContacts({ ...contact, loading: true });
      let response = await ContactService.getAllContacts();
      // console.log(response.data);
      setContacts({
        ...contact,
        loading: false,
        contacts: response.data,
        filteredContacts: response.data
      })
    } catch (error) {
      setContacts({
        ...contact,
        loading: false,
        errorMsg: error
      })
    }
  }
  useEffect(() => {
    getContactsRecords();
  }, []);
  // delete Contact
  let deleteContact = async (contactId) => {

    // console.log(contactId);
    try {
      let response = await ContactService.deleteContact(contact.contacts, contactId);

      if (response) {
        setContacts({ ...contact, loading: true });
        let response = await ContactService.getAllContacts();
        // console.log(response.data);
        setContacts({
          ...contact,
          loading: false,
          contacts: response.data,
          filteredContacts: response.data
        })
      }

    } catch (error) {
      setContacts({
        ...contact,
        loading: false,
        errorMsg: error
      })
    }
  }
  // Search contacts 
  const serchContacts = (event) => {
    setSearchQry({
      ...searchQry,
      text: event.target.value
    })
    let filterCon = contact.contacts.filter((element) => {
      return element.name.toLowerCase().includes(event.target.value.toLowerCase());
    })
    // console.log(filteredContact);
    setContacts({
      ...contact,
      filteredContacts: filterCon
    });

  }
  return (
    (contact.loading) ? <Loader /> :
      <>
        <section className="contact-search p-3">
          <div className="container">
            <div className="grid">
              <div className="row">
                <div className="col">
                  <p className="h3">
                    Phone Dictionary
                    <Link to={"/contact/add"} className="btn btn-primary ms-2">
                      <i className="fa fa-plus-circle me-1"></i> Add New
                    </Link>
                  </p>
                  <p className="fst-italic">
                    Welcome to the Digital Phone Dictionary Appication here you can save your contact digitally and you can Add, Delete and View you all contacts.
                  </p>
                </div>
              </div>

              <div className="row">
                <form action="">
                  <div className="col-md-6">
                    <div className="row">
                      <div className="col">
                        <input
                          type="text"
                          placeholder="Search here...."
                          className="form-control shadow-none border-primary"
                          onInput={serchContacts}
                          name="text"
                          value={searchQry.text}
                        />
                      </div>
                      {/* <div className="col">
                        <button
                          className="btn btn-outline-primary shadow-none"
                          style={{ marginLeft: "-20px" }}
                        >
                          Submit
                        </button>
                      </div> */}
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>

        <section className="contact-list">
          <div className="container">
            <div className="row">
              {contact.filteredContacts.map((element) => {
                return (
                  <div className="col-md-4 mb-2" key={element.id}>
                    <div className="card border-primary">
                      <div className="card-body">
                        <div className="row">
                          <div className="col-md-4">
                            <img
                              src={element.photo}
                              alt="Profile"
                              style={{
                                height: "100px",
                                width: "100px",
                                borderRadius: "50px",
                              }}
                            />
                          </div>
                          <div className="col-md-8 mt-3">
                            <ul className="list-unstyled">
                              <li>
                                Name : <span className="fw-bold">{element.name}</span>
                              </li>
                              <li>
                                Mobile : <span className="fw-bold">{element.mobile}</span>
                              </li>
                              <li>
                                Email :{" "}
                                <span className="fw-bold">
                                  {element.email}
                                </span>
                              </li>
                            </ul>
                          </div>
                          <div>
                            <Link
                              to={`/contact/edit/${element.id}`}
                              className="btn btn-sm btn-outline-warning float-end ms-1"
                            >
                              <i className="fa fa-edit"></i> Edit
                            </Link>
                            <Link
                              to={`/contact/view/${element.id}`}
                              className="btn btn-sm btn-outline-success float-end ms-1"
                            >
                              <i className="fa fa-eye"></i> View
                            </Link>

                            <button className="btn btn-sm btn-outline-danger float-end ms-1" onClick={() => deleteContact(element.id)}><i className="fa fa-trash"></i> Delete</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}

            </div>
          </div>
        </section>
      </>
  );
};

export default ContactList;
