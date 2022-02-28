import { NextPage } from "next";
import Header from "./components/header";
import Footer from "./components/footer";
import React, { useState, useEffect, BaseSyntheticEvent } from "react";

type Condition = {
    lawNumber: string;
    articleNumber: string;
    paragraphNumber: string;
}

const getLawXml = (condition: Condition): Promise<string> => {
    const url: string = `https://elaws.e-gov.go.jp/api/1/articles;lawId=${condition.lawNumber};article=${condition.articleNumber};paragraph=${condition.paragraphNumber};`;
    const getLawXml = async () => {
        const result: any = await fetch(url)
        .then((res: Response) => res.text())
        return result;
    }
    return getLawXml();
};

const LawStudy: NextPage = () => {
    const [ todos, setTodos ] = useState<string[]>([]);
    const [ lawNumber, setLawNumber ] = useState<string>('129AC0000000089_20210901_503AC0000000037');
    const [ articleNumber, setArticleNumber ] = useState<string>('1');
    const [ paragraphNumber, setParagraphNumber ] = useState<string>('1');

    const deleteTodo = (index: number) => {
        const newTodos: string[] = todos.filter((todo: string, todoIndex: number) => {
            return index !== todoIndex;
        });
        setTodos(newTodos);
    }

    const handleChangeLawType = (e: BaseSyntheticEvent) => {
        setLawNumber(e.target.value);
    };

    const handleCreateTodo = async() => {
        const xmlString = await getLawXml({lawNumber: lawNumber, articleNumber: articleNumber, paragraphNumber: paragraphNumber});
        const parser: DOMParser = new DOMParser();
        const dom: XMLDocument = await parser.parseFromString(xmlString, 'text/xml');
        const code: string | null = dom.documentElement.getElementsByTagName('Code')[0].textContent;
        let result: string | null = '';
        
        if (code === '1') {
            result = dom.documentElement.getElementsByTagName('Message')[0].textContent;
        } else {
            result = dom.documentElement.getElementsByTagName('ParagraphSentence')[0].textContent;
            console.log(dom);
        }

        if (result) {
            setTodos([...todos, result]);
        }
    };

    return (
        <div>
            <Header/>
            <div className="main-body">
                <div className="form">
                    <select onChange={handleChangeLawType} value={lawNumber}>
                        <option value="129AC0000000089_20210901_503AC0000000037">民法</option>
                        <option value="416AC0000000123_20210428_503AC0000000024">不動産登記法</option>
                        <option value="417AC0000000086_20210301_501AC0000000070">会社法</option>
                        <option value="132AC0000000048_20200401_429AC0000000045">商法</option>
                        <option value="338AC0000000125_20210901_503AC0000000036">商業登記法</option>
                        <option value="140AC0000000045_20200401_430AC0000000072">刑法</option>
                        <option value="321CONSTITUTION_19470503_000000000000000">憲法</option>
                        <option value="132AC0000000015_20160401_426AC0000000069">供託法</option>
                        <option value="408AC0000000109_20201001_502AC0000000022">民事訴訟法</option>
                        <option value="401AC0000000091_20200401_501AC0000000002">民事保全法</option>
                        <option value="354AC0000000004_20200401_501AC0000000002">民事執行法</option>
                        <option value="325AC1000000197_20200801_501AC0000000029">司法書士法</option>
                    </select>
                    <input className="article-number" type="text"
                        onChange={(e: BaseSyntheticEvent) => setArticleNumber(e.target.value)}
                        value={articleNumber}>
                    </input>
                    <input className="paragraph-number" type="text"
                        onChange={(e: BaseSyntheticEvent) => setParagraphNumber(e.target.value)}
                        value={paragraphNumber}>
                    </input>
                    <button onClick={handleCreateTodo}>+</button>
                </div>
                <ul>
                    {todos.map((todo, index) => {
                        return (
                            <li key={index}>
                                {todo}
                                <button onClick={() => deleteTodo(index)}>-</button>
                            </li>
                        );
                    })}
                </ul>
            </div>
            <Footer/>
        </div>
    );
};
export default LawStudy;