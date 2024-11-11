import React from 'react';
import Header from "./Header";
import Footer from './Footer';
import { Helmet } from "react-helmet";

const Layout = ({ children, title, description, keyword, author, }) => {
    return (
        <div>
            <Helmet>
                <meta charSet="utf-8" />
                <meta name="description" content={description} />
                <meta name="keywords" content={keyword} />
                <meta name="author" content={author} />
                <title>{title}</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
            <Header />
            <main style={{ minHeight: '80vh' }}>
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default Layout;