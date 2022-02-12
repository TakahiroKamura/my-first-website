import { NextPage } from "next";
import Header from "./header";
import Footer from "./footer";
import Link from "next/link";

const SentContact: NextPage = () => {
    return (
        <div>
            <Header/>
            <div className="main-body">
                <h2>お問い合わを承りました</h2>
                <p>いただいたお問い合わせを承りました。</p>
                <p>返信にはしばしお時間をいただく場合、または内容によっては返信できない場合があることを予めご了承ください。</p>
                <p>今後ともPMK GAMESをよろしくお願いいたします。</p>
                <div>
                    <Link href="/"><a>ホームへ戻る</a></Link>
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default SentContact;