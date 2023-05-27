import { useState } from "react";
import shuffle from "lodash.shuffle";

 const getRandomIntegetFromInterval = (min, max) => {
     return Math.floor(Math.random() * (max - min + 1)) + min;
 };

export const QuizComponent = ({ words }) => {
    const [checkedWords, setCheckedWords] = useState(filteredWords(words));
    const [randomWord, setRandomWord] = useState(
        checkedWords[getRandomIntegetFromInterval(0, checkedWords.length - 1)]
    );
    const notUsibleNowButSetWarning = () => {
        setCheckedWords();
        setRandomWord()
    }
    console.log(notUsibleNowButSetWarning)

function getVariants() {
    const variants = new Array(4).fill(null).reduce((acc, _, index) => {
        if (!index) {
            return [randomWord];
        }
        const random = words[getRandomIntegetFromInterval(0, words.length - 1)];
        if (acc.every(item => item?.id !== random?.id)) {
            return [...acc, random];
        } else {
            let word = null;
            for (let item of words) {
                if (acc.every(word => word?.id !== item?.id)) {
                    word = item;
                    break;
                }
            }
            return [...acc, word];
        }
    }, []);

    
    return shuffle(variants);
}

    const variants = getVariants();
    console.log(getVariants())
    console.log(randomWord)
    
   
    
    function filteredWords(words) {
       return words.filter(word => word.checked);
    }

    // const handleVariant


    return (
        <div>
            <h2>{randomWord.ukrWord}</h2>
            {variants.map(variant => <button>{variant.engWord}</button> )}
        </div>
    )
};