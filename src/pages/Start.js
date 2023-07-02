import React, { useEffect, useState } from "react";
import "../css/styles.css";

export default function Start() {
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState(false);
  const [message, setMessage] = useState("");
  const [messageError, setMessageError] = useState(false);

    function submitButton() {
      if(name == "")
      {
        setNameError(true);
      }
      else if(email == "")
      {
        setEmailError(true);
      }
      else if(phone == "")
      {
        setPhoneError(true);
      }
      else if(message == "")
      {
        setMessageError(true);
      }

      alert("Thanks for submitting!");
      window.location.reload(false);
    }

    return (
        <div>
        {/* Navigation*/}
        <nav className="navbar navbar-expand-lg navbar-light fixed-top py-3" id="mainNav">
          <div className="container px-4 px-lg-5">
            <a className="navbar-brand" href="#page-top">LC Dashboard</a>
            <button className="navbar-toggler navbar-toggler-right" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon" /></button>
            <div className="collapse navbar-collapse" id="navbarResponsive">
              <ul className="navbar-nav ms-auto my-2 my-lg-0">
                <li className="nav-item"><a className="nav-link" href="/Login">Get Started</a></li>
                <li className="nav-item"><a className="nav-link" href="#services">Services</a></li>
                <li className="nav-item"><a className="nav-link" href="#contact">Contact Us</a></li>
              </ul>
            </div>
          </div>
        </nav>
        {/* Masthead*/}
        <header className="masthead">
          <div className="container px-4 px-lg-5 h-100">
            <div className="row gx-4 gx-lg-5 h-100 align-items-center justify-content-center text-center">
              <div className="col-lg-8 align-self-end">
                <h1 className="text-white font-weight-bold">Welcome to LC Dashboard</h1>
                <hr className="divider" />
              </div>
              <div className="col-lg-8 align-self-baseline">
                <p className="text-white-75 mb-5">Use this dashboard to get the latest Loomis Chaffee news and organize your blocks and class schedules!</p>
                <a className="btn btn-primary btn-xl" href="/Login">Get Started</a>
              </div>
            </div>
          </div>
        </header>
        {/* Services*/}
        <section className="page-section bg-primary" id="services">
          <div className="container px-4 px-lg-5">
            <h2 className="text-center mt-0 text-white">What We Provide</h2>
            <hr className="divider divider-light" />
            <div className="row gx-4 gx-lg-5">
              <div className="col-lg-3 col-md-6 text-center">
                <div className="mt-5">
                  <div className="mb-2"><i className="bi-journal-text fs-1 text-white" /></div>
                  <h3 className="h4 mb-2 text-white">Daily Bulletin</h3>
                  <p className="text-white mb-0">View the daily bulletin in one view.</p>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 text-center">
                <div className="mt-5">
                  <div className="mb-2"><i className="bi-calendar fs-1 text-white" /></div>
                  <h3 className="h4 mb-2 text-white">Calendar</h3>
                  <p className="text-white mb-0">Keep up to date on the school's calendar schedule.</p>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 text-center">
                <div className="mt-5">
                  <div className="mb-2"><i className="bi-card-checklist fs-1 text-white" /></div>
                  <h3 className="h4 mb-2 text-white">Blocks</h3>
                  <p className="text-white mb-0">Keep track and view your blocks before your next class.</p>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 text-center">
                <div className="mt-5">
                  <div className="mb-2"><i className="bi-shop fs-1 text-white" /></div>
                  <h3 className="h4 mb-2 text-white">Menu</h3>
                  <p className="text-white mb-0">Know what's next on the menu.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Contact*/}
        <section className="page-section" id="contact">
          <div className="container px-4 px-lg-5">
            <div className="row gx-4 gx-lg-5 justify-content-center">
              <div className="col-lg-8 col-xl-6 text-center">
                <h2 className="mt-0">Let's Get In Touch!</h2>
                <hr className="divider" />
                <p className="text-muted mb-5">Have any questions? Send us a messages and we will get back to you as soon as possible!</p>
              </div>
            </div>
            <div className="row gx-4 gx-lg-5 justify-content-center mb-5">
              <div className="col-lg-6">
                {/* * * * * * * * * * * * * * * **/}
                {/* * * SB Forms Contact Form * **/}
                {/* * * * * * * * * * * * * * * **/}
                {/* This form is pre-integrated with SB Forms.*/}
                {/* To make this form functional, sign up at*/}
                {/* https://startbootstrap.com/solution/contact-forms*/}
                {/* to get an API token!*/}
                  {/* Name input*/}
                  <div className="form-floating mb-3">
                    <input className="form-control" id="name" type="text" placeholder="Enter your name..." data-sb-validations="required" onChange={(e) => {setName(e.nativeEvent.target.value); setNameError(false);}} />
                    <label htmlFor="name">Full name</label>
                    <div className="invalid-feedback" data-sb-feedback="name:required" style={{
                      display: nameError ? 'block' : 'none'
                    }}>A name is required.</div>
                  </div>
                  {/* Email address input*/}
                  <div className="form-floating mb-3">
                    <input className="form-control" id="email" type="email" placeholder="name@example.com" data-sb-validations="required,email" onChange={(e) => {setEmail(e.nativeEvent.target.value); setEmailError(false);}}  />
                    <label htmlFor="email">Email address</label>
                    <div className="invalid-feedback" data-sb-feedback="email:required" style={{
                      display: emailError ? 'block' : 'none'
                    }}>An email is required.</div>
                    <div className="invalid-feedback" data-sb-feedback="email:email">Email is not valid.</div>
                  </div>
                  {/* Phone number input*/}
                  <div className="form-floating mb-3">
                    <input className="form-control" id="phone" type="tel" placeholder="(123) 456-7890" data-sb-validations="required" onChange={(e) => {setPhone(e.nativeEvent.target.value); setPhoneError(false);}} />
                    <label htmlFor="phone">Phone number</label>
                    <div className="invalid-feedback" data-sb-feedback="phone:required" style={{
                      display: phoneError ? 'block' : 'none'
                    }}>A phone number is required.</div>
                  </div>
                  {/* Message input*/}
                  <div className="form-floating mb-3">
                    <textarea className="form-control" id="message" type="text" placeholder="Enter your message here..." style={{height: '10rem'}} data-sb-validations="required" defaultValue={""}  onChange={(e) => {setMessage(e.nativeEvent.target.value); setMessageError(false)}}  />
                    <label htmlFor="message">Message</label>
                    <div className="invalid-feedback" data-sb-feedback="message:required" style={{
                      display: messageError ? 'block' : 'none'
                    }}>A message is required.</div>
                  </div>
                  {/* Submit success message*/}
                  {/**/}
                  {/* This is what your users will see when the form*/}
                  {/* has successfully submitted*/}
                  <div className="d-none" id="submitSuccessMessage">
                    <div className="text-center mb-3">
                      <div className="fw-bolder">Form submission successful!</div>
                      To activate this form, sign up at
                      <br />
                      <a href="https://startbootstrap.com/solution/contact-forms">https://startbootstrap.com/solution/contact-forms</a>
                    </div>
                  </div>
                  {/* Submit error message*/}
                  {/**/}
                  {/* This is what your users will see when there is*/}
                  {/* an error submitting the form*/}
                  <div className="d-none" id="submitErrorMessage"><div className="text-center text-danger mb-3">Error sending message!</div></div>
                  {/* Submit Button*/}
                  <div className="d-grid"><button className="btn btn-primary btn-xl" onClick={() => {submitButton()}}>Submit</button></div>
              </div>
            </div>
            <div className="row gx-4 gx-lg-5 justify-content-center">
              <div className="col-lg-4 text-center mb-5 mb-lg-0">
                <i className="bi-envelope fs-2 mb-3 text-muted" />
                <div>bryan_chung@loomis.org</div>
              </div>
            </div>
          </div>
        </section>
      </div>

    )
}