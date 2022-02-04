import { Html, Head, Main, NextScript } from 'next/document';

const Document = () => {
    return (
        <Html lang="jp">
            <Head>
                <body className="main">
                    <Main/>
                    <NextScript/>
                </body>
            </Head>
        </Html>
    );
};

export default Document;