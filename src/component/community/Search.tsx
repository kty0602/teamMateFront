import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import SelectBox from '../../modules/community/SelectBox';
import { selectData } from '../../data/selectData';
import styles from "../../css/community/Search.module.css";
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/Store';
import { useNavigate } from 'react-router-dom';

interface SearchProps {
    onSearch: (searchValue: string) => void;
}

const Search: React.FC<SearchProps> = ({ onSearch }) => {
    const user = useSelector((state: RootState) => state.user);
    const userId = user.idx;
    const navigate = useNavigate();

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

    const CheckIdx = () => {
        if (Number(userId) === 0) {
            alert("로그인하지 않았습니다.");
            navigate('/login');
        } else {
            // 글 작성 페이지로 이동하는 로직 추가
            navigate('/register');
        }
    };

    return(
        <div className={styles.box}>
            <SelectBox options={selectData} onSelectChange={SelectChange}/>
            <input className={styles.input} onChange={InputChange}></input>
            <button className={styles.searchButton} onClick={Search}>검색</button>
            <div className={styles.registerBox}>
                <span className={styles.register} onClick={CheckIdx}>글 쓰기</span>
            </div>
        </div>
    );
}

export default Search;