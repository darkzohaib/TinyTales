import "./RegisterComponent.css";
import tinyTalesLogo from "../../assets/TinyTales.webp";
import { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

function RegisterComponent() {
  const [clientNameValidation, showClientNameValidation] = useState(false);
  const [emailValidation, showEmailValidation] = useState(false);
  const [contactNumberValidation, showContactNumberValidation] =
    useState(false);
  const [passwordValidation, showPasswordValidation] = useState(false);
  const [allFieldValidated, setAllFieldValidated] = useState(false);

  const [formData, setFormData] = useState({
    RegisterTinyTalesClientRequest: {
      clientName: "",
      email: "",
      contactNumber: "",
      password: "",
    },
  });

  // Function to handle form inputs
  const handleFormInputs = (event) => {
    const { name, value } = event.target;

    // Update form data and run validation after the update
    setFormData((prevData) => {
      const updatedFormData = {
        ...prevData,
        RegisterTinyTalesClientRequest: {
          ...prevData.RegisterTinyTalesClientRequest,
          [name]: value,
        },
      };
      fieldValidation(updatedFormData); // Run validation after updating form data
      return updatedFormData;
    });
  };

  // Function to handle submit
  const handleFormSubmit = (event) => {
    event.preventDefault();

    // Make the POST request using axios with the correct payload structure
    axios
      //.post("http://localhost:8080/registerTinyTalesClient", formData)
      .post("https://tiny-tales-main-zo-test-git.apps.nprdc-ocp.dhdigital.co.in/registerTinyTalesClient", formData)
      .then((response) => {
        const successMessage =
          response.data.RegisterTinyTalesClientResponse.success.message;
        toast.success(successMessage); // Display success message
      })
      .catch((error) => {
        console.log(error);
        const errorMessage =
          error.response?.data?.RegisterTinyTalesClientResponse?.fault
            ?.description || "An error occurred!";
        toast.error(errorMessage); // Display error message
      });
  };

  // Validation logic
  const fieldValidation = (data) => {
    const { clientName, email, contactNumber, password } =
      data.RegisterTinyTalesClientRequest;

    showClientNameValidation(clientName === "");
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === "") {
      showEmailValidation(true); // Show error if empty
    } else if (!emailPattern.test(email)) {
      showEmailValidation(true); // Show error if invalid format
    } else {
      showEmailValidation(false); // Hide error if valid
    }
    if (contactNumber === "") {
      showContactNumberValidation(true); // Show error if empty
    } else if (!/^\d{10}$/.test(contactNumber)) {
      showContactNumberValidation(true); // Show error if non-numeric
    } else {
      showContactNumberValidation(false); // Hide error if valid
    }

    //showContactNumberValidation((contactNumber === ""));
    showPasswordValidation(password === "");

    setAllFieldValidated(
      clientName !== "" &&
        email !== "" &&
        contactNumber !== "" &&
        password !== "" &&
        contactNumberValidation === false
    );
  };

  return (
    <>
      <Toaster />
      <div className="container-sm">
        <center>
          <div className="brand">
            <img src={tinyTalesLogo} alt="Tiny Tales Logo" />
          </div>

          <h3>
            <i className="fa-regular fa-registered">
              : Register your Tiny Tales
            </i>
          </h3>
          <form onSubmit={handleFormSubmit}>
            <div className="input-group input-group-sm mb-3">
              <span className="input-group-text" id="inputGroup-sizing-sm">
                🧑
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Your Name"
                value={formData.RegisterTinyTalesClientRequest.clientName}
                name="clientName"
                onChange={handleFormInputs}
              />
            </div>
            {clientNameValidation && (
              <div className="frontendValidation">
                *Please Enter Your Full Name
              </div>
            )}

            <div className="input-group input-group-sm mb-3">
              <span className="input-group-text" id="inputGroup-sizing-sm">
                📧
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Your Email Address"
                value={formData.RegisterTinyTalesClientRequest.email}
                name="email"
                onChange={handleFormInputs}
              />
            </div>
            {emailValidation && (
              <div className="frontendValidation">
                *Please Enter Valid Email
              </div>
            )}

            <div className="input-group input-group-sm mb-3">
              <span className="input-group-text" id="inputGroup-sizing-sm">
                📱
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Your Contact Number"
                value={formData.RegisterTinyTalesClientRequest.contactNumber}
                name="contactNumber"
                onChange={handleFormInputs}
              />
            </div>

            {contactNumberValidation && (
              <div className="frontendValidation">
                *Please Contact Number should be of 10 digits
              </div>
            )}

            <div className="input-group input-group-sm mb-3">
              <span className="input-group-text" id="inputGroup-sizing-sm">
                🔑
              </span>
              <input
                type="password"
                className="form-control"
                placeholder="Enter Your Password"
                value={formData.RegisterTinyTalesClientRequest.password}
                name="password"
                onChange={handleFormInputs}
              />
            </div>
            {passwordValidation && (
              <div className="frontendValidation">
                *Password cannot be Empty
              </div>
            )}

            <button
              type="submit"
              className="btn btn-success"
              disabled={!allFieldValidated}
            >
              Register
            </button>
          </form>
        </center>
      </div>
    </>
  );
}

export default RegisterComponent;
