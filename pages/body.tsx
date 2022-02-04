import type { NextPage } from 'next';
import Header from './header';
import Footer from './footer';

const Body: NextPage = ()=> {
	return (
		<div>
			<Header/>
			<div className='main-body'>
				<h1>PMK GAMESのウェブサイトへようこそ！</h1>
				<h2>新着情報</h2>
				<h3>新商品のご案内</h3>
					<p>あいうえおあいうえおあいうえおあいうえお</p>
				<h3>展示会への出展</h3>
					<p>あいうえおあいうえおあいうえおあいうえお</p>
				<h3>環境への取り組み</h3>
					<p>あいうえおあいうえおあいうえおあいうえお</p>
			</div>
			<Footer/>
		</div>
	);
}

export default Body