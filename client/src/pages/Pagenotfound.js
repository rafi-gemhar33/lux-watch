import React from 'react';
import { Link } from "react-router-dom";
import Layout from '../components/Layout/Layout.js';


const Pagenotfound = () => {
    return (
        <Layout title={"Something Wrong!"}>
            <div className="pnotfound">
                <h1 className='pnotfound-title'>404</h1>
                <h2 className='pnotfound-heading'>We couldn't find the page you were looking for.</h2>
                <Link to="/" className="pnotfound-btn">
                    Go Back
                </Link>
            </div>
        </Layout>
    );
};

export default Pagenotfound;