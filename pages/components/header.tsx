import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';

const Header: NextPage = ()=> {
    return (
        <div className="header-main">
            <Head>
                <meta charSet="utf-8"/>
                <title>PMK GAMES オフィシャルサイト</title>
            </Head>
            <div className="site-title">
                PMK GAMES
            </div>
            <div className="site-contents">
                <ul>
                    <li><Link href="/"><a>HOME</a></Link></li>
                    <li><Link href="/about"><a>ABOUT</a></Link></li>
                    <li><Link href="/product"><a>PRODUCT</a></Link></li>
                    <li className="multi-contents"><Link href="#"><a>WEB CONTENTS</a></Link>
                        <ul className="sub-contents">
                            <li><Link href="/law"><a>LAW STUDY</a></Link></li>
                            <li><Link href="/card"><a>CARD SEARCH</a></Link></li>
                        </ul>
                    </li>
                    <li><Link href="/contact"><a>CONTACT</a></Link></li>
			    </ul>
            </div>
        </div>
    );
};

export default Header;