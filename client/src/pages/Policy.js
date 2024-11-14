import React from 'react';
import Layout from '../components/Layout/Layout.js';
const Policy = () => {
    return (
        <Layout title={"Privacy Policy - Lux-watch"}>
            <div className="policy-container">
                <h1 className="policy-title">Our Policy</h1>
                <section className="policy-section">
                    <h2>Privacy Policy</h2>
                    <p>
                        We value your privacy and are committed to protecting your personal data. This policy outlines how we collect, use, and store your information.
                    </p>
                    <ul>
                        <li>We only collect necessary information to improve our services.</li>
                        <li>Your data is stored securely and is not shared with third parties without consent.</li>
                        <li>You may request to view or delete your data at any time.</li>
                    </ul>
                </section>

                <section className="policy-section">
                    <h2>Terms of Service</h2>
                    <p>
                        By using our website, you agree to the following terms of service:
                    </p>
                    <ul>
                        <li>All content is for personal, non-commercial use only.</li>
                        <li>Unauthorized access or misuse of our resources is prohibited.</li>
                        <li>We reserve the right to modify or terminate services at any time.</li>
                    </ul>
                </section>

                <section className="policy-section">
                    <h2>Refund Policy</h2>
                    <p>
                        We strive to ensure your satisfaction with every purchase. If you are not satisfied, our refund policy applies as follows:
                    </p>
                    <ul>
                        <li>Refund requests must be made within 30 days of purchase.</li>
                        <li>Products must be returned in their original condition for a full refund.</li>
                        <li>Digital products are non-refundable once accessed or downloaded.</li>
                    </ul>
                </section>
            </div>
        </Layout>
    );
};

export default Policy;
