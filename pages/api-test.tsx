import { NextPage } from "next";
import { useEffect, useState } from "react";

const url: string = 'https://api.github.com/repos/zeit/next.js';
const key = {
    headers: {
        Accept: 'application/json'
    }
}

const ApiTest: NextPage = () => {
    const [stars, setStars] = useState<any>();

    useEffect(() => {
        fetch(url, key)
            .then((res) => {res.json()})
            .then((json: any) => {setStars(json)});
    }, [])

    console.log(stars);
    
    
    return (
        <div>
            {stars}
        </div>
    );
};
export default ApiTest;