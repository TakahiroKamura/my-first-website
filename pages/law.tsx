import { NextPage } from "next";
import Header from "./header";
import Footer from "./footer";
import React, { useState, useEffect } from "react";

const LawStudy: NextPage = () => {
    const [ lawBody, setLawBody ] = useState<XMLDocument>();
    
    useEffect(() => {
        const url: string = 'https://v07wjof543.execute-api.ap-northeast-1.amazonaws.com/dev/info';
        const result = async(): Promise<XMLDocument> => {
            const res: Response = await fetch(url);
            const data: XMLDocument = await res.json();
            setLawBody(data);

            return data;
        }
        result();
    }, []);

    return (
        <div>
            <Header/>
            <div className="main-body">
                {lawBody}
            </div>
            <Footer/>
        </div>
    );
};
export default LawStudy;