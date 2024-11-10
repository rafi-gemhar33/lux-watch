import React from "react";
import Layout from "../components/Layout/Layout";
import aboutImage from "../Images/aboutImage.jpg";

const About = () => {
    return (
        <Layout>
            <div className="about-container">
                <h1 className="about-title">About Us</h1>
                <div className="about-content">
                    <div className="about-image">
                        <img src={aboutImage} alt="About Us" className="about-img" />
                    </div>
                    <div className="about-description">
                        <p>
                            Welcome to our platform! We are a company dedicated to providing
                            the best services and products to our customers. Our team is
                            committed to delivering high-quality experiences and constantly
                            improving our offerings.
                        </p>
                        <p>
                            With a vision to transform industries, we embrace innovation and
                            customer-centric solutions. We believe in transparency, integrity,
                            and reliability as the core values that drive our operations.
                        </p>
                        <p>
                            Thank you for choosing us! If you have any questions, feel free to
                            contact our team.
                        </p>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default About;
