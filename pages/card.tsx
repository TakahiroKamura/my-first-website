import { NextPage } from "next";
import Header from "./header";
import Footer from "./footer";
import React, { useState, BaseSyntheticEvent } from "react";

type CardDetailItems = {
    key: string;
    value: string;
}

interface Card  {
    id: string;
    name: string;
    type: string;
    desc: string;
    race: string;
    archetype: string;
    card_sets: string[];
    card_images: string[];
    card_prices: string[];
}

interface Result {
    data: Card[];
}

const CardTypeDetail =  (type: string): CardDetailItems[] => {
    let items: CardDetailItems[] = [];
    
    if (type === 'monster') {
        items = [
            {key: 'monster-normal', value: '通常モンスター'},
            {key: 'monster-effect', value: '効果モンスター'},
            {key: 'monster-ritual', value: '儀式モンスター'},
            {key: 'monster-fusion', value: '融合モンスター'},
            {key: 'monster-synchro', value: 'シンクロモンスター'},
            {key: 'monster-xyz', value: 'エクシーズモンスター'},
            {key: 'monster-pendulum', value: 'ペンデュラムモンスター'},
            {key: 'monster-link', value: 'リンクモンスター'}
        ];
    } else if (type === 'spell') {
        items = [
            {key: 'spell-normal', value: '通常魔法'},
            {key: 'spell-ritual', value: '儀式魔法'},
            {key: 'spell-continuous', value: '永続魔法'},
            {key: 'spell-equip', value: '装備魔法'},
            {key: 'spell-field', value: 'フィールド魔法'},
            {key: 'spell-quick', value: '速攻魔法'}
        ];
    } else if (type === 'trap') {
        items = [
            {key: 'trap-normal', value: '通常罠'},
            {key: 'trap-continuous', value: '永続罠'},
            {key: 'trap-counter', value: 'カウンター罠'}
        ];
    }

    return items;
};

const SearchResult = (props: any): JSX.Element => {
    if (props.result === undefined) {
        return (
            <div>
                {props.name}
            </div>
        );
    } else {
        return (
            <div>
                <ul>
                    {props.result.map((card: Card) => (
                        <li key={card.id}>{card.name}
                        <p>{card.desc}</p></li>
                    ))}
                </ul>
            </div>
        );
    }
};

const CardSearch: NextPage = () => {
    const url: string = 'https://db.ygoprodeck.com/api/v7/cardinfo.php?archetype=BlackWing';

    const [cardName, setCardName] = useState<string>('');
    const [cardType, setCardType] = useState<string>('monster');
    const [cardSubType, setCardSubType] = useState<string>('monster-normal');
    const [searchResult, setSearchResult] = useState<Promise<Card[]>>();

    let items: CardDetailItems[] = CardTypeDetail(cardType);

    const handleName = ((e:BaseSyntheticEvent) => {
        setCardName(e.target.value);
    });

    const handleRadio = ((e: BaseSyntheticEvent) => {
        setCardType(e.target.value);
        items = CardTypeDetail(cardType);
    });

    const handleSelect = ((e: BaseSyntheticEvent) => {
        setCardSubType(e.target.value);
    });

    const handleSubmit = ((e: BaseSyntheticEvent) => {
        let type: string = '';

        if (cardType === 'monster') {
            type = 'Monster';
        } else if (cardType === 'spell') {
            type = '';
        } else if (cardType === 'trap') {
            type = '';
        }

        const url: string = `https://db.ygoprodeck.com/api/v7/cardinfo.php`;
        const key: object = {
            fname: cardName,
            num: 20,
            offset: 0,
            format: 'tcg',
            type: type
        }

        fetch(url, key)
        .then((res) => res.json())
        .then((json) => setSearchResult(json.data));

        // ここで取得したデータを加工する
    });

    return (
        <div>
            <Header/>
            <div className="main-body">
                <h2>Yu-Gi-Oh カード検索(英語)</h2>
                <form action="" method="post">
                    <div>
                        <label>カード名</label>
                        <input type="text" onChange={handleName}/>
                    </div>
                    <div>
                        <label>カード種別</label>
                        <div className="card-type">
                            <input type="radio" name="card-type" value="monster" onChange={handleRadio} defaultChecked/>
                            <label>モンスター</label>
                            <input type="radio" name="card-type" value="spell" onChange={handleRadio}/>
                            <label>魔法</label>
                            <input type="radio" name="card-type" value="trap" onChange={handleRadio}/>
                            <label>罠</label>
                        </div>
                        <select onChange={handleSelect}>
                            {items.map((item) => 
                                <option key={item.key} value={item.key}>{item.value}</option>
                            )}
                        </select>
                    </div>
                    <div>
                        <input type="button" value="検索"  onClick={handleSubmit}/>
                    </div>
                </form>
                <SearchResult name={cardName} result={searchResult}/>
            </div>
            <Footer/>
        </div>
    );
};
export default CardSearch;