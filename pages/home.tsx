import type { NextPage } from 'next';
import Header from './components/header';
import Footer from './components/footer';
import { Card } from 'react-bootstrap';

interface NewInfo {
	date: string;
	text: string;
}

const Home: NextPage = () => {
	const news: NewInfo[] = [
		{ date: '2022/04/29', text: 'プロダクト情報更新' },
		{ date: '2022/02/03', text: 'プロダクト情報更新' },
		{ date: '2022/02/01', text: 'サイト開設' }
	];

	return (
		<div>
			<Header />
			<div className='main-body'>
				<h1>PMK Gamesのウェブサイトへようこそ！</h1>
				<p>このサイトはゲーム製作サークル『PMK Games』の情報をお届けします。<br />無断転載等はお断りします。</p>
				<h2>新着情報</h2>
				<div>
					{news.map((info: NewInfo) => {
						return (
							<Card>
								<Card.Title>{info.date}</Card.Title>
								<Card.Body>{info.text}</Card.Body>
							</Card>
						)
					})}
				</div>
			</div>
			<Footer />
		</div >
	);
}

export default Home;