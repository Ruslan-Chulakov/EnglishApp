import { useSelector } from 'react-redux';
import WordsListItem from 'components/WordsListItem/WordsListItem';
import { selectWords } from 'Redux/selectors';

const WordsList = ({ deleteWord, editWord, checkWord }) => {
    const words = useSelector(selectWords);
    
    return (
        <ul>
            {words?.map(({ id, nativeWord, foreignWord, checked }, index) => {
                return (
                    <WordsListItem
                        key={id}
                        id={id}
                        checked={checked}
                        nativeWord={nativeWord}
                        foreignWord={foreignWord}
                        itemNumber={index + 1}
                        deleteWord={deleteWord}
                        editWord={editWord}
                        checkWord={checkWord}
                    />
                );
            })}
        </ul>
    );
};
export default WordsList;
