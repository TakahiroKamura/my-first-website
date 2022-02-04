import type { NextPage } from 'next';
import Header from './header';
import Footer from './footer';

const Product: NextPage = () => {
    return (
        <div>
            <Header/>
            <div>
                製品紹介
            </div>
            <Footer/>
        </div>
    );
};

export default Product;