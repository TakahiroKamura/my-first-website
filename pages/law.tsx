import { NextPage } from "next";
import Header from "./components/header";
import Footer from "./components/footer";
import React, { useState, useEffect, BaseSyntheticEvent } from "react";

type Condition = {
    lawId: string;
    articleNumber: string;
    paragraphNumber: string;
}

type LawInfo = {
    name: string;
    id: string;
    todos: string[];
}

//const myLocalStorage: Storage = localStorage;

const getLawXml = (condition: Condition): Promise<string> => {
    const url: string = `https://elaws.e-gov.go.jp/api/1/articles;lawId=${condition.lawId};article=${condition.articleNumber};paragraph=${condition.paragraphNumber};`;
    const getLawXml = async () => {
        const result: any = await fetch(url)
        .then((res: Response) => res.text())
        return result;
    }
    return getLawXml();
};

const LawStudy: NextPage = () => {
    // const [ todos, setTodos ] = useState<string[]>([]);
    const [ lawName, setLawName ] = useState<string>('民法');
    const [ lawId, setLawId ] = useState<string>('129AC0000000089_20210901_503AC0000000037');
    const [ lawTodos, setLawTodos ] = useState<string[]>([]);
    const [ articleNumber, setArticleNumber ] = useState<string>('1');
    const [ paragraphNumber, setParagraphNumber ] = useState<string>('1');
    const [ todoBody, setTodoBody ] = useState<string>('');
    const [ lawData, setLawData ] = useState<LawInfo[]>([]);

    useEffect(() => {
        const laws: LawInfo[] = [
            {
                name: '民法',
                id: '129AC0000000089_20210901_503AC0000000037',
                todos: [],
            },
            {
                name: '不動産登記法',
                id: '416AC0000000123_20210428_503AC0000000024',
                todos: [],
            },
            {
                name: '会社法',
                id: '417AC0000000086_20210301_501AC0000000070',
                todos: [],
            },
            {
                name: '商法',
                id: '132AC0000000048_20200401_429AC0000000045',
                todos: [],
            },
            {
                name: '商業登記法',
                id: '338AC0000000125_20210901_503AC0000000036',
                todos: [],
            },
            {   name: '憲法',
                id: '321CONSTITUTION_19470503_000000000000000',
                todos: [],
            },
            {
                name: '刑法',
                id: '140AC0000000045_20200401_430AC0000000072',
                todos: [],
            },
            {
                name: '供託法',
                id: '132AC0000000015_20160401_426AC0000000069',
                todos: [],
            },
            {
                name: '民事訴訟法',
                id: '408AC0000000109_20201001_502AC0000000022',
                todos: [],
            },
            {
                name: '民事保全法',
                id: '401AC0000000091_20200401_501AC0000000002',
                todos: [],
            },
            {
                name: '民事執行法',
                id: '354AC0000000004_20200401_501AC0000000002',
                todos: [],
            },
            {
                name:'司法書士法',
                id: '325AC1000000197_20200801_501AC0000000029',
                todos: [],
            },
        ]

        let data = localStorage.getItem('saveData');

        if (data) {
            setLawData(JSON.parse(data));
        } else {
            localStorage.setItem('saveData', JSON.stringify(laws));
            setLawData(laws);
        }

        const id: (string | undefined)[] = lawData.map((data) => {
                if (data.name === lawName) {
                    return data.id;
                }
            }
        );

        if (id[0]) {
            setLawId(id[0]);
        }
    }, []);
    
    const handleChangeLawType = (e: BaseSyntheticEvent) => {
        setLawId(lawData[e.target.value].id);
        setLawName(e.target.value);
    };

    const deleteTodo = (index: number) => {
        const todos: (string[] | undefined)[] = lawData.map((data) => {
            if (data.name === lawName) {
                return data.todos;
            }
        });

        if (todos[0]) {
            setLawTodos(todos[0]);
        }

        const newTodos: string[] = lawTodos.filter((todo: string, todoIndex: number) => {
            return index !== todoIndex;
        });

        setLawData([]);

        return;
    }

    const handleCallApi = async() => {
        const xmlString = await getLawXml({lawId: lawId, articleNumber: articleNumber, paragraphNumber: paragraphNumber});
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
            setTodoBody(result.trim());
        }

        return;
    };

    const handleCreateTodo = () => {
        setLawTodos([...lawTodos, todoBody]);
        setTodoBody('');

        const data = localStorage.getItem('saveData');
    };

    return (
        <div>
            <Header/>
            <div className="main-body">
                <h1>法律メモアプリ</h1>
                <div className="form">
                    <select onChange={handleChangeLawType} value={lawName}>
                        <option value="民法">民法</option>
                        <option value="不動産登記法">不動産登記法</option>
                        <option value="会社法">会社法</option>
                        <option value="商法">商法</option>
                        <option value="商業登記法">商業登記法</option>
                        <option value="刑法">刑法</option>
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
                    <label>条</label>
                    <input className="paragraph-number" type="text"
                        onChange={(e: BaseSyntheticEvent) => setParagraphNumber(e.target.value)}
                        value={paragraphNumber}>
                    </input>
                    <label>項</label>
                    <button onClick={handleCallApi}>受信</button><br/>
                    <textarea className="textarea-todo" value={todoBody} rows={3} onChange={(e: BaseSyntheticEvent) => {setTodoBody(e.target.value)}}/>
                    <button onClick={handleCreateTodo}>登録</button>
                </div>
                <ul>
                    {lawTodos.map((todo, index) => {
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