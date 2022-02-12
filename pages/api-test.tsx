import { NextPage } from "next";
import { useEffect, useState } from "react";

const url: string = 'https://db.ygoprodeck.com/api/v7/cardinfo.php?archetype=BlackWing';

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

const ApiTest: NextPage = () => {
    const [cards, setResult] = useState<Card[]>([]);
    
    useEffect(() => {
        fetch(url)
        .then((r: Response) => r.json())
        .then((j: Result) => setResult(j.data));
    }, []);
    
    return (
        <div>
            {cards.map((card: Card) => <ul key={card.id}>{card.name}<li>{card.desc}</li></ul>)}
        </div>
    );
};
export default ApiTest;