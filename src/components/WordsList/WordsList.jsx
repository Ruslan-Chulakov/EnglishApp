import WordsListItem from 'components/WordsListItem/WordsListItem';
const WordsList = ({ words, deleteWord, editWord, checkWord }) => {
    return (
        <ul>
            {words.map(({ id, ukrWord, engWord, checked }, index) => {
                return (
                    <WordsListItem
                        key={id}
                        id={id}
                        ukrWord={ukrWord}
                        engWord={engWord}
                        itemNumber={index + 1}
                        deleteWord={deleteWord}
                        editWord={editWord}
                        checked={checked}
                        checkWord={checkWord}
                    />
                );
            })}
        </ul>
    );
};
export default WordsList;
