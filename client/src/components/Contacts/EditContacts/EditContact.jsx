import React, { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from "react-router-dom";
import { ContactService } from '../../../Services/ContactService';
import Loader from '../../spinner/Loader';
const EditContact = () => {
  let navigate = useNavigate();
  let { contactId } = useParams();
  let [editContact, setEditContact] = useState({
    loading: false,
    contact: {
      name: '',
      photo: '',
      mobile: '',
      email: '',
      designation: '',
      company: '',
      groupId: ''

    },
    groups: [],
    errorMs: ''
  })

  const getEditabeContact = async () => {
    try {
      setEditContact({
        ...editContact,
        loading: true
      })
      let response = await ContactService.getContact(contactId);
      let groupResponse = await ContactService.getAllGroups();
      // console.log(groupResponse.data);
      setEditContact({
        ...editContact,
        loading: false,
        contact: response.data,
        groups: groupResponse.data
      })

    } catch (error) {
      setEditContact({
        ...editContact,
        loading: false,
        errorMsg: error
      })
    }
  }
  useEffect(() => {
    getEditabeContact();
  }, [contactId])

  let updateContact = (event) => {
    setEditContact({
      ...editContact,
      contact: {
        ...editContact.contact,
        [event.target.name]: event.target.value
      }
    })
  }
  const updateFormSubmission = async (event) => {
    event.preventDefault();
    try {
      let response = await ContactService.updateContact(editContact.contact, contactId);
      if (response) {
        navigate('/contact/list', { replace: true });
      }
    } catch (error) {
      setEditContact({ ...editContact, errorMsg: error })
      navigate(`/contact/edit/${contactId}`, { replace: true });
    }
  }
  return (
    (editContact.loading) ? <Loader /> :
      <>
        <section className="add-content p-3">
          <div className="container ">
            <div className="row">
              <div className="col">
                <p className="h3 text-success fw-bold">Edit Contact</p>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Voluptatem architecto rem ducimus iste. Commodi eveniet
                  reprehenderit dicta accusantium perspiciatis placeat temporibus
                  dignissimos! Adipisci sequi ut vitae sapiente possimus
                  exercitationem aut?
                </p>
              </div>
            </div>

            <div className="row">
              <div className="col-md-5">
                <form action="" autoComplete="off" onSubmit={updateFormSubmission}>
                  <div className="mb-2">
                    <input
                      name="name"
                      value={editContact.contact.name}
                      type="text"
                      onChange={updateContact}
                      required={true}
                      className="form-control shadow-none border-primary"
                      placeholder="Enter your name...."
                    />
                  </div>
                  <div className="mb-2">
                    <input
                      name="photo"
                      value={editContact.contact.photo}
                      onChange={updateContact}
                      required={true}
                      type="text"
                      className="form-control shadow-none border-primary"
                      placeholder="Photo URL "
                    />
                  </div>
                  <div className="mb-2">
                    <input
                      name="mobile"
                      value={editContact.contact.mobile}
                      onChange={updateContact}
                      required={true}
                      maxLength={10}
                      minLength={10}
                      type="text"
                      className="form-control shadow-none border-primary"
                      placeholder="Mobile number"
                    />
                  </div>
                  <div className="mb-2">
                    <input
                      name="email"
                      value={editContact.contact.email}
                      onChange={updateContact}
                      required={true}
                      type="text"
                      className="form-control shadow-none border-primary"
                      placeholder="Email Address  "
                    />
                  </div>
                  <div className="mb-2">
                    <input
                      name="company"
                      value={editContact.contact.company}
                      onChange={updateContact}
                      required={true}
                      type="text"
                      className="form-control shadow-none border-primary"
                      placeholder="Company Name"
                    />
                  </div>
                  <div className="mb-2">
                    <input
                      value={editContact.contact.designation}
                      onChange={updateContact}
                      required={true}
                      type="text"
                      className="form-control shadow-none border-primary"
                      placeholder="Designation"
                    />
                  </div>
                  <div className="mb-2">
                    <select
                      name="groupId"
                      value={editContact.contact.groupId}
                      onChange={updateContact}
                      required={true}
                      className="form-control shadow-none border-primary form-select"
                    >
                      {editContact.groups.map((element) => {
                        return (
                          <option value={element.id} key={element.id}>{element.name}</option>
                        )
                      })}


                    </select>
                  </div>
                  <input
                    type="submit"
                    value="Update"
                    className="btn btn-outline-success shadow-none me-1"
                  />
                  <Link
                    to={"/contact/list"}
                    className="btn btn-outline-dark shadow-none"
                  >
                    <i className="fas fa-arrow-alt-circle-left"></i> Go Back
                  </Link>
                </form>
              </div>
              <div className="col-md-7">
                <img
                  src={editContact.contact.photo}
                  alt="Profile Image" style={{ height: "320px", width: "320px" }}
                />
              </div>
            </div>
          </div>
        </section>
      </>
  );
}

export default EditContact