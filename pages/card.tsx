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
    level: string;
    link: string;
    attribute: string;
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

const CheckNameIncludesKeywords = (name: string, keyword: string): boolean => {
    const keywords: string[] = keyword.split(' ');

    if (keywords[0] === '') {
        return true;
    }

    let result: boolean = true;

    keywords.forEach((word: string) => {
        if (!name.toLowerCase().includes(word.toLowerCase())) {
            result = false;
        }
    });

    return result;
};

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
    if (props.cards === undefined || props.cards.length <= 0) {
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
                        <CardElement key={card.id} card={card}/>
                    ))}
                </ul>
            </div>
        );
    }
};

const CardElement = (props: {card: Card}): JSX.Element => {
    let levelAndAttribute: JSX.Element = <></>;
    let atkAndDef: JSX.Element = <></>;

    if (props.card === undefined) {
        return (
            <></>
        );   
    } else if (props.card.type.includes('Monster')) {
        if (props.card.type.includes('XYZ')) {
            levelAndAttribute = <p>Rank:{props.card.level} [{props.card.attribute}]</p>;
        } else if (props.card.type.includes('Link')) {
            levelAndAttribute = <p>Link:{props.card.link} [{props.card.attribute}]</p>;
        } else {
            levelAndAttribute = <p>Level:{props.card.level} [{props.card.attribute}]</p>;
        }
        atkAndDef = <p>ATK {props.card.atk} / DEF {props.card.def}</p>;
    }

    return (
        <li key={props.card.id}>
            <h3>{props.card.name}</h3>
            {levelAndAttribute}
            <p>{props.card.race}/{props.card.type}</p>
            {atkAndDef}
            <p>{props.card.desc}</p>
        </li>
    );
};

const CardSearch: NextPage = () => {
    const [cardName, setCardName] = useState<string>('');
    const [cardType, setCardType] = useState<string>('monster');
    const [cardTypeDetail, setCardTypeDetail] = useState<CardDetailItems[]>(CardTypeDetail(cardType));
    const [cardSubType, setCardSubType] = useState<string>('Normal');
    const [cardData, setCardData] = useState<Card[]>([]);
    const [extractedCards, setExtractedCards] = useState<Card[]>([]);

    useEffect(() => {
        const url: string = `https://db.ygoprodeck.com/api/v7/cardinfo.php?`;
        const key: object = {
            cache: 'force-cache'
        }

        const result = async(): Promise<Card[]> => {
            const res: Response = await fetch(url, key);
            const data: Result = await res.json();
            setCardData(data.data);

            return data.data;
        }
        result();

    }, []);

    const handleName = ((e:BaseSyntheticEvent) => {
        setCardName(e.target.value);
    });

    const handleRadio = ((e: BaseSyntheticEvent) => {
        setCardType(e.target.value);
        setCardTypeDetail(CardTypeDetail(e.target.value));
    });

    const handleSelect = ((e: BaseSyntheticEvent) => {
        setCardSubType(e.target.value);
    });

    const handleSubmit = ((e: BaseSyntheticEvent) => {
        let cards: Card[] = []

        if (cardType === 'monster') {
            cardData.map((card: Card) => {
                if (card.type.includes('Monster') && CheckNameIncludesKeywords(card.name, cardName)) {
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
                if (card.type === 'Spell Card' && CheckNameIncludesKeywords(card.name, cardName)) {
                    if (card.race.includes(cardSubType)) {
                        cards.push(card);
                    }
                }
            });

        } else if (cardType === 'trap') {
            cardData.map((card: Card) => {
                if (card.type === 'Trap Card' && CheckNameIncludesKeywords(card.name, cardName)) {
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
                <form>
                    <div>
                        <label>カード名</label>
                        <input type="text" onChange={handleName}/>
                        <input className="input-dummy" type="text"/>
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
                            {cardTypeDetail.map((item) => 
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