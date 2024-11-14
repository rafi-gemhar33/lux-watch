import React from "react";
import Layout from "./../components/Layout/Layout";
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";
import contactUs from "../Images/contactUs.jpg";

const Contact = () => {
    return (
        <Layout title={"Contact Us - Lux-Watch"}>
            <div className="contact-container row">
                <div className="col-md-6">
                    <img src={contactUs} alt="Contact Us" className="contact-image" />
                </div>
                <div className="col-md-6">
                    <h1 className="contact-title">Contact Us</h1>
                    <p className="contact-description">
                        Should you have any inquiries or require further information, please don't hesitate to contact us. Our team is available 24/7 to assist you.
                    </p>
                    <p className="contact-info">
                        <BiMailSend /> : <a href="mailto:customersupport@luxwatch.com">customersupport@luxwatch.com</a>
                    </p>
                    <p className="contact-info">
                        <BiPhoneCall /> : (107) 123-9909
                    </p>
                    <p className="contact-info">
                        <BiSupport /> : 888-000-1111 (Support)
                    </p>
                </div>
            </div>
        </Layout>
    );
};

export default Contact;
