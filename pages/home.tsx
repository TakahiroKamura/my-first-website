import type { NextPage } from 'next';
import Header from './components/header';
import Footer from './components/footer';

const Home: NextPage = ()=> {
	return (
		<div>
			<Header/>
			<div className='main-body'>
				<h1>PMK GAMESのウェブサイトへようこそ！</h1>
				<h2>新着情報</h2>
				<div className="news">
					<p>2022/02/03 プロダクト情報更新</p>
					<p>2022/02/02 サイト開設</p>
				</div>
				<h2></h2>
				<p>このサイトはゲーム製作サークル『PMK GAMES』の情報をお届けします。<br/>無断転載等はお断りします。</p>
			</div>
			<Footer/>
		</div>
	);
}

export default Home;