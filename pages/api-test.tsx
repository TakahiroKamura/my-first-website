import { NextPage } from "next";
import { useEffect, useState } from "react";

const url: string = 'https://db.ygoprodeck.com/api/v7/cardinfo.php?archetype=Blue-Eyes';
const key = {
    headers: {
        Accept: 'application/json'
    }
}

const ApiTest: NextPage = () => {
    const [stars, setStars] = useState<any>();

    useEffect(() => {
        fetch(url, key)
            .then((res: Response) => res.json())
            .then((json: any) => setStars(json.data[0].name));
    }, [])

    console.log(stars)

    return (
        <div>
            {stars}
        </div>
    );
};
export default ApiTest;