import type { NextPage } from 'next';
import Header from './components/header';
import Footer from './components/footer';
import { Card, CardGroup, Container } from 'react-bootstrap';

interface NewInfo {
	date: string;
	text: string;
}

const Home: NextPage = () => {

	return (
		<div>
			<Header />
			<div className='main-body'>
				<h1>PMK Gamesのウェブサイトへようこそ！</h1>
				<p>このサイトはゲーム製作サークル『PMK Games』の情報をお届けします。<br />無断転載等はお断りします。</p>
				<h2>新着情報</h2>
				<Container>
					{[
						{ date: '2022/04/29', text: 'プロダクト情報更新' },
						{ date: '2022/02/03', text: 'プロダクト情報更新' },
						{ date: '2022/02/01', text: 'サイト開設' }
					].map((info: NewInfo) => {
						return (
							<Card className="home-card" style={{ width: "80%" }}>
								<Card.Header>{info.date}</Card.Header>
								<Card.Body>{info.text}</Card.Body>
							</Card>
						)
					})}
				</Container>
			</div>
			<Footer />
		</div >
	);
}

export default Home;