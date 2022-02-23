import type { NextPage } from 'next';
import React, { useRouter } from 'next/router';
import Header from './components/header';
import Footer from './components/footer';

const Contact: NextPage = () => {
    const router = useRouter();

    const sendContact = async (event: any) => {
        event.preventDefault();

        const res = await fetch(
            "/api/send-contact",
            {
                body: JSON.stringify({
                    name: event.target.name.value
                }),
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST'
            }
        );

        const result = await res.json();
        console.log(result);
        router.push('/sent-contact')
    }

    return (
        <div>
            <Header/>
			<div className="main-body">
				<h2>CONTACT</h2>
                <p>当サークルへのお問い合わせこちらのフォームからお願いします。</p>
                <p>※内容によってはお答えできないものもございます。</p>
				<form className="contact-text" onSubmit={sendContact}>
                    <textarea id="name" rows={10} required/><br/>
                    <button type="submit">送信</button>
                </form>
			</div>
			<Footer/>
        </div>
    );
};

export default Contact;