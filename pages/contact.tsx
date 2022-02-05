import type { NextPage } from 'next';
import React, { useState } from 'react';
import Header from './header';
import Footer from './footer';

const Contact: NextPage = () => {
    const [count, setCount] = useState(0);

    const handleSubmit = () => {
        
    }

    return (
        <div>
            <Header/>
			<div className="main-body">
				<h2>CONTACT</h2>
                <p>当サークルへのお問い合わせこちらのフォームからお願いします。</p>
                <p>※内容によってはお答えできないものもございます。</p>
                <p>{count}</p>
				<form className="contact-text">
                    <textarea rows={10} required/>
                    <button onClick={handleSubmit}>送信</button>
                </form>
			</div>
			<Footer/>
        </div>
    );
};

export default Contact;