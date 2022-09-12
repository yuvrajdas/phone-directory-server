import React, { useEffect, useState } from "react";
import { Link, useNavigate} from "react-router-dom";
import { ContactService } from "../../../Services/ContactService";
const AddContact = () => {

  let navigate = useNavigate();
  let [state, setState] = useState({
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

  });

  let inputHandler = (event) => {
    setState({
      ...state,
      contact: {
        ...state.contact,
        [event.target.name]: event.target.value
      }
    })
  }
  const getAllGroup = async () => {
    try {
      setState({ ...state, loading: true });
      let response = await ContactService.getAllGroups();
      setState({
        ...state,
        loading: false,
        groups: response.data
      })
    } catch {

    }
  }
  useEffect(() => {
    getAllGroup();
  }, [])

  const submitForm = async (event) => {
    event.preventDefault();
    try {
      let response = await ContactService.createContact(state.contact);
      if (response) {
        navigate('/contact/list', { replace: true });
      }
    } catch (error) {
      setState({...state, errorMs: error})
      navigate('/contact/add', { replace: true });
    }

  }
  return (
    <>
      <section className="add-content p-3">
        <div className="container ">
          <div className="row">
            <div className="col">
              <p className="h3 text-success fw-bold">Create Nwe Contact</p>
              <p>
                Enter the following details below to save the contact
              </p>
            </div>
          </div>

          <div className="row">
            <div className="col-md-5">
              <form action="" autoComplete="off" onSubmit={submitForm}>
                <div className="mb-2">
                  <input
                    required={true}
                    name="name"
                    onChange={inputHandler}
                    type="text"
                    className="form-control shadow-none border-primary"
                    placeholder="Enter your name...."
                  />
                </div>
                <div className="mb-2">
                  <input
                    required={true}
                    name="photo"
                    onChange={inputHandler}
                    type="text"
                    className="form-control shadow-none border-primary"
                    placeholder="Photo URL "
                  />
                </div>
                <div className="mb-2">
                  <input
                    required={true}
                    name="mobile"
                    onChange={inputHandler}
                    type="text"
                    maxLength={10}
                    minLength={10}
                    className="form-control shadow-none border-primary"
                    placeholder="Mobile number"
                  />
                </div>
                <div className="mb-2">
                  <input
                    required={true}
                    name="email"
                    onChange={inputHandler}
                    type="email"
                    className="form-control shadow-none border-primary"
                    placeholder="Email Address  "
                  />
                </div>
                <div className="mb-2">
                  <input
                    required={true}
                    name="company"
                    onChange={inputHandler}
                    type="text"
                    className="form-control shadow-none border-primary"
                    placeholder="Company Name"
                  />
                </div>
                <div className="mb-2">
                  <input
                    required={true}
                    name="designation"
                    onChange={inputHandler}
                    type="text"
                    className="form-control shadow-none border-primary"
                    placeholder="Designation"
                  />
                </div>
                <div className="mb-2">
                  <select
                    required={true}
                    name="groupId"
                    onChange={inputHandler}
                    className="form-control shadow-none border-primary form-select"
                  >
                    <option value="">Select a Goup</option>

                    {state.groups.map((element) => {
                      return (
                        <option value={element.id} key={element.id}>{element.name}</option>
                      )
                    })}
                    
                   
                  </select>
                </div>
                <input
                  type="submit"
                  value="Create"
                  className="btn btn-outline-success shadow-none me-1"
                />
                <input
                  type="reset"
                  className="btn btn-outline-warning shadow-none me-1"
                />
                <Link
                  to={"/contact/list"}
                  className="btn btn-outline-dark shadow-none"
                >
                  <i className="fas fa-arrow-alt-circle-left"></i> Go Back
                </Link>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AddContact;
