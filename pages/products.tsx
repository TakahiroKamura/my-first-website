import type { NextPage } from 'next';
import Header from './components/header';
import Footer from './components/footer';

const Product: NextPage = () => {
    return (
        <div>
            <Header />
            <div className='main-body'>
                <h2>PRODUCTS</h2>
                <p>現在公開中の作品はありません。</p>
            </div>
            <Footer />
        </div>
    );
};

export default Product;