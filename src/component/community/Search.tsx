import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import SelectBox from '../../modules/community/SelectBox';
import { selectData } from '../../data/selectData';
import styles from "../../css/community/Search.module.css";

interface SearchProps {
    onSearch: (searchValue: string) => void;
}

const Search: React.FC<SearchProps> = ({ onSearch}) => {
    const [selectedOption, setSelectedOption] = useState<string>('');
    const [inputValue, setInputValue] = useState<string>('');


    const SelectChange = (selectedValue: string) => {
        setSelectedOption(selectedValue);
    };

    const Search = () => {
        const combinedValue = `${selectedOption}:${inputValue}`;
        onSearch(combinedValue);
    };

    const InputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    return(
        <div className={styles.box}>
            <SelectBox options={selectData} onSelectChange={SelectChange}/>
            <input className={styles.input} onChange={InputChange}></input>
            <button className={styles.searchButton} onClick={Search}>검색</button>
            <div className={styles.registerBox}>
                <Link to={'/register'} className={styles.touch}>
                    <span className={styles.register}>글 쓰기</span>
                </Link> 
            </div>
        </div>
    );
}

export default Search;