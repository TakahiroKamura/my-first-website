import type { NextPage } from 'next';
import Head from 'next/head';

const Header: NextPage = () => {
    return (
        <div className="container">
            <Head>
                <meta charSet="utf-8" />
                <title>PMK Games オフィシャルサイト</title>
            </Head>
            <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
                <div>
                    <h4>PMK Games</h4>
                </div>
                <a href="/" className="nav-link px-2 link-secondary">HOME</a>
                <a href="/about" className="nav-link px-2 link-dark">ABOUT</a>
                <a href="/product" className="nav-link px-2 link-dark">PRODUCT</a>
                <a href="#" className="dropdown-header nav-link px-2 link-dark">WEB CONTENTS</a>
                <a href="/contact" className="nav-link px-2 link-dark">CONTACT</a>
            </div>
        </div>
    );
};

export default Header;