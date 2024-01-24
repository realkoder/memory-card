"use client"

import Image from 'next/image';
import { useEffect, useState } from 'react';

const MemoryBoard = () => {
    const imageNames = [
        "brune-bønner.jpg",
        "coffee-beans.jpg",
        "edamame.png",
        "hesteboenner.jpeg",
        "hvidebønner.jpg",
        "shutterstock.webp",
        "soja-boenner.jpg",
        "java-bean.png"
    ];

    const [cards, setCards] = useState<string[]>([]);

    const [tries, setTries] = useState(0);
    const [matches, setMatches] = useState(0);
    const [choosenimageIndex, setChoosenImageIndex] = useState<number[]>([]);

    const handleCardClick = (index: number) => {
        if (choosenimageIndex.includes(index)) {
            setChoosenImageIndex(cur => cur.filter((a) => a !== index));
        } else if (choosenimageIndex.length < 2) {
            setChoosenImageIndex(cur => [...cur, index]);
        }
    };

    useEffect(() => {
        setCards(initializeCards(imageNames));
    }, [])

    useEffect(() => {
        if (choosenimageIndex.length < 2) return;

        if (cards[choosenimageIndex[0]] === cards[choosenimageIndex[1]]) {
            setMatches(cur => cur + 1);
            setCards(cur => {
                cur[choosenimageIndex[0]] = "pair-made.png";
                cur[choosenimageIndex[1]] = "pair-made.png";
                return cur;
            })
            setChoosenImageIndex([]);

        } else setTries(cur => cur + 1);
    }, [choosenimageIndex])

    return (
        <div className='grid grid-cols-4 gap-4 '>

            <div className='col-start-1 col-end-5 flex justify-between text-xl'>
                <span className="p-4">Tries: {tries}</span>
                <span className="p-4">Matches: {matches}</span>
            </div>

            {cards.map((imageName, index) => (
                <div 
                className={`w-44 h-44 border border-gray-300 rounded-md shadow-md p-4 ${choosenimageIndex.includes(index) ? 'scale-105 shadow-md outline-solid border-orange-500' : ''}`}
                onClick={() => {
                    if (imageName !== "pair-made.png") {
                        handleCardClick(index)
                    }
                }
                }>
                    {choosenimageIndex.includes(index) && <Image key={imageName}
                        src={`/images/${imageName}`}
                        alt={`Image ${index + 1}`}
                        width={100}
                        height={100}
                         />}
                         {imageName === "pair-made.png" && <Image key={imageName}
                        src={`/images/${imageName}`}
                        alt={`Image ${index + 1}`}
                        width={100}
                        height={100}
                         />}
                </div>
            ))
            }
        </div>
    )
}

const initializeCards = (imageNames: string[]) => {
    const CARDS_ON_BOARD = 16;
    const imageNamesDoubled: string[] = [];
    const cards = [];

    for (let i = 0; i < CARDS_ON_BOARD / 2; i++) {
        imageNamesDoubled[i] = imageNames[i];
        imageNamesDoubled[i + CARDS_ON_BOARD / 2] = imageNames[i];
    }

    while (imageNamesDoubled.length > 0) {
        const random = Math.floor(Math.random() * imageNamesDoubled.length);
        cards.push(imageNamesDoubled[random]);
        imageNamesDoubled.splice(random, 1);
    }

    return cards;
}

export default MemoryBoard;