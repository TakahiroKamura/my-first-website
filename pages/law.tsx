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
    // const url: string = `https://elaws.e-gov.go.jp/api/1/articles;lawNum=${condition.lawNumber};article=${condition.articleNumber};paragraph=${condition.paragraphNumber};`;
    const url: string = 'https://elaws.e-gov.go.jp/api/1/articles;lawNum=明治四十年法律第四十五号;article=5;paragraph=1;';
    const getLawXml = async () => {
        const result: any = await fetch(url)
        .then((res: Response) => res.text())
        return result;
    }
    return getLawXml();
};

const LawStudy: NextPage = () => {
    // const [ lawBody, setLawBody ] = useState<XMLDocument>();
    const [ todos, setTodos ] = useState<string[]>([]);
    const [ todoBody, setTodoBody ] = useState<string>('');
    const [ lawNumber, setLawNumber ] = useState<string>('民法');
    const [ articleNumber, setArticleNumber ] = useState<string>('');
    const [ paragraphNumber, setParagraphNumber ] = useState<string>('');

    const deleteTodo = (index: number) => {
        const newTodos: string[] = todos.filter((todo: string, todoIndex: number) => {
            return index !== todoIndex;
        });
        setTodos(newTodos);
    }

    const handleChangeLawType = (e: BaseSyntheticEvent) => {
        setLawNumber(e.target.value);
        console.log(e.target.value);
    };

    const handleCreateTodo = async() => {
        const xmlString = await getLawXml({lawNumber: lawNumber, articleNumber: articleNumber, paragraphNumber: paragraphNumber});
        const parser: DOMParser = new DOMParser();
        const dom: XMLDocument = await parser.parseFromString(xmlString, 'text/xml');
        const result: string | null = dom.documentElement.getElementsByTagName('ParagraphSentence')[0].textContent;
        console.log(result);
    };

    return (
        <div>
            <Header/>
            <div className="main-body">
                <div className="form">
                    <select onChange={handleChangeLawType} value={lawNumber}>
                        <option value="民法">民法</option>
                        <option value="不動産登記法">不動産登記法</option>
                        <option value="会社法・商法">会社法・商法</option>
                        <option value="商業登記法">商業登記法</option>
                        <option value="140AC0000000045_20200401_430AC0000000072">刑法</option>
                        <option value="憲法">憲法</option>
                        <option value="供託法">供託法</option>
                        <option value="民事訴訟法">民事訴訟法</option>
                        <option value="民事保全法">民事保全法</option>
                        <option value="民事執行法">民事執行法</option>
                        <option value="司法書士法">司法書士法</option>
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