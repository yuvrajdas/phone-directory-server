import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ContactService } from "../../../Services/ContactService";
import Loader from "../../spinner/Loader";
const ViewContact = () => {

  let { contactId } = useParams();
  let [singleContact, setSingleContact] = useState({
    loading: false,
    contacts: [],
    errorMsg: '',
    group:[]
  });
  const getContactsRecords = async () => {
    try {
      setSingleContact({ ...singleContact, loading: true });
      let response = await ContactService.getContact(contactId);
      let groupResponse = await ContactService.getGroup(response.data);

      // console.log(response.data);
      setSingleContact({
        ...singleContact,
        loading: false,
        contacts: response.data,
        group:groupResponse.data
      })
    } catch (error) {
      setSingleContact({
        ...singleContact,
        loading: false,
        errorMsg: error
      })
    }
  }
  useEffect(() => {
    getContactsRecords();
  }, []);
  // console.log(singleContact.contacts);
  return (
    (singleContact.loading) ?
      <Loader /> : <>
        <section className="view-contact-intro p-3">
          <div className="container">
            <div className="row">
              <div className="col">
                <p className="h3 text-success">View Contact</p>
                <p className="fst-italic">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Adipisci eius nobis dolorem quo debitis exercitationem, iste
                  reprehenderit? Nostrum, quaerat corporis. Iusto, alias nam. Nam
                  commodi totam facilis ipsum ea cupiditate.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="view-contact">
          <div className="container">
            <div className="row">
              <div className="col-md-7 m-auto">
                <div className="card border-primary">
                  <div className="bg-dark" style={{ borderRadius: "5px" }}>
                    <p className="h4 text-white ms-2 mt-1">
                      <i className="fa fa-phone text-warning"></i> Contact Details
                    </p>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-5">
                        <img
                          src={singleContact.contacts.photo}
                          alt="Profile Image"
                          style={{ height: "200px", width: "200px" }}
                        />
                      </div>
                      <div className="col-md-7">
                        <ul className="list-unstyled">
                          <li>
                            Name : <span className="fw-bold"> {singleContact.contacts.name}</span>
                          </li>
                          <li>
                            Email : 
                            <span className="fw-bold">
                               {singleContact.contacts.email}
                            </span>
                          </li>
                          <li>
                            Mobile : <span className="fw-bold"> {singleContact.contacts.mobile}</span>
                          </li>
                          <li>
                            Company Name : 
                            <span className="fw-bold"> {singleContact.contacts.company}</span>
                          </li>
                          <li>
                            Designation : <span className="fw-bold"> {singleContact.contacts.designation}</span>
                          </li>
                          <li>
                            Group : <span className="fw-bold"> {singleContact.group.name}</span>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <Link
                          to={"/contact/list"}
                          className="btn btn-outline-dark shadow-none float-end"
                        >
                          <i className="fas fa-arrow-alt-circle-left"></i> Go Back
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        </section>
      </>
  );
};

export default ViewContact;
