import type { NextPage } from 'next';
import Header from './components/header';
import Footer from './components/footer';
import { Card, Button } from 'react-bootstrap';

interface CardInfo {
    title: string;
    text: string;
    button: string;
}

const About: NextPage = () => {
    const cards: CardInfo[] = [
        { title: 'HOME', text: 'トップページです。各種新着情報を掲載しております。', button: 'ホームへ' },
        { title: 'ABOUT', text: 'このページです。', button: '概要へ' },
        { title: 'PRODUCT', text: '主に製作したゲーム作品を紹介しております。', button: '製品へ' },
        { title: 'CONTACT', text: 'お問い合わせはこちらからお願いします。', button: 'お問い合わせへ' },
    ];

    return (
        <div>
            <Header />
            <div className='main-body'>
                <h2>ABOUT</h2>
                <p>ゲーム製作サークル『PMK Games』です。</p>
                <p>主にWindows向けのカジュアルなゲームを開発するべく鋭意活動中です。</p>
                <h3>CONTENTS</h3>
                <div className="about-contents">
                    {cards.map((card: CardInfo) => {
                        return (
                            <Card style={{ width: '80%' }}>
                                <Card.Body>
                                    <Card.Title>{card.title}</Card.Title>
                                    <Card.Text>{card.text}</Card.Text>
                                    <Button variant="primary">{card.button}</Button>
                                </Card.Body>
                            </Card>
                        )
                    })}
                </div>
            </div>
            <Footer />
        </div >
    );
};

export default About;