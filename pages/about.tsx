import type { NextPage } from 'next';
import Header from './header';
import Footer from './footer';

const About: NextPage = () => {
    return (
        <div>
            <Header/>
			<div className='main-body'>
				<h2>ABOUT</h2>
				<p>ゲーム製作サークル『PMK GAMES』です。</p>
                <p>主にWindows向けのカジュアルなゲームを開発するべく鋭意活動中です。</p>
                <h3>CONTENTS</h3>
                <ul className="about-contents">
                    <li>
                        <h4>HOME</h4>
                        <p>トップページです。各種新着情報を掲載しております。</p>
                    </li>
                    <li>
                        <h4>ABOUT</h4>
                        <p>このページです。</p>
                    </li>
                    <li>
                        <h4>PRODUCT</h4>
                        <p>主に製作したゲーム作品を紹介しております。</p>
                    </li>
                    <li>
                        <h4>CONTACT</h4>
                        <p>お問い合わせはこちらからお願いします。</p>
                    </li>
                </ul>
			</div>
			<Footer/>
        </div>
    );
};

export default About;