import { NextPage } from "next";
import Header from "./header";
import Footer from "./footer";
import React, { useState, BaseSyntheticEvent, useEffect } from "react";

type CardDetailItems = {
    key: string;
    value: string;
}

interface Card  {
    id: string;
    name: string;
    type: string;
    race: string;
    atk: string;
    def: string;
    desc: string;
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
            {key: 'Normal', value: '通常モンスター'},
            {key: 'Effect', value: '効果モンスター'},
            {key: 'Ritual', value: '儀式モンスター'},
            {key: 'Fusion', value: '融合モンスター'},
            {key: 'Synchro', value: 'シンクロモンスター'},
            {key: 'XYZ', value: 'エクシーズモンスター'},
            {key: 'Pendulum', value: 'ペンデュラムモンスター'},
            {key: 'Link', value: 'リンクモンスター'}
        ];
    } else if (type === 'spell') {
        items = [
            {key: 'Normal', value: '通常魔法'},
            {key: 'Ritual', value: '儀式魔法'},
            {key: 'Continuous', value: '永続魔法'},
            {key: 'Equip', value: '装備魔法'},
            {key: 'Field', value: 'フィールド魔法'},
            {key: 'Quick-Play', value: '速攻魔法'}
        ];
    } else if (type === 'trap') {
        items = [
            {key: 'Normal', value: '通常罠'},
            {key: 'Continuous', value: '永続罠'},
            {key: 'Counter', value: 'カウンター罠'}
        ];
    }

    return items;
};

const SearchResult = (props: {cards: Card[]}): JSX.Element => {
    if (props.cards === undefined) {
        return (
            <div>
                検索結果はありません。
            </div>
        );
    } else {
        return (
            <div>
                <ul>
                    {props.cards.map((card: Card) => (
                        <li key={card.id}>
                            <h3>{card.name}</h3>
                            <p>{card.type}/{card.race}</p>
                            <p>ATK:{card.atk} DEF:{card.def}</p>
                            <p>{card.desc}</p>
                        </li>
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
    const [cardData, setCardData] = useState<Card[]>([]);
    const [extractedCards, setExtractedCards] = useState<Card[]>([]);

    useEffect(() => {
        const url: string = `https://db.ygoprodeck.com/api/v7/cardinfo.php?`;

        const result = async(): Promise<Card[]> => {
            const res: Response = await fetch(url);
            const data: Result = await res.json();
            setCardData(data.data);

            return data.data;
        }
        result();

    }, []);

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
        let cards: Card[] = []

        if (cardType === 'monster') {
            cardData.map((card: Card) => {
                if (card.type.includes('Monster') && card.name.includes(cardName)) {
                    if (cardSubType === 'Normal') {
                        if (card.type.includes('Normal') && card.type.includes('Monster')) {
                            cards.push(card);
                        }
                    } else if (cardSubType === 'Effect') {
                        if (card.type === 'Effect Monster' || card.type === 'Flip Effect Monster' || card.type === 'Flip Tuner Effect Monster') {
                            cards.push(card);
                        }
                    } else if (card.type.includes(cardSubType)) {
                        cards.push(card);
                    }
                }
            });
        } else if (cardType === 'spell') {
            cardData.map((card: Card) => {
                if (card.type === 'Spell Card' && card.name.includes(cardName)) {
                    if (card.race.includes(cardSubType)) {
                        cards.push(card);
                    }
                }
            });

        } else if (cardType === 'trap') {
            cardData.map((card: Card) => {
                if (card.type === 'Trap Card' && card.name.includes(cardName)) {
                    if (card.race.includes(cardSubType)) {
                        cards.push(card);
                    }
                }
            });
        }

        setExtractedCards(cards);
    });

    return (
        <div>
            <Header/>
            <div className="main-body">
                <h2>Yu-Gi-Oh カード検索(英語)</h2>
                <form action="">
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
                <SearchResult cards={extractedCards}/>
            </div>
            <Footer/>
        </div>
    );
};
export default CardSearch;