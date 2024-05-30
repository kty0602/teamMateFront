import styles from "../../css/team/TeamMenu.module.css";
import axios from "axios";
import React, { useState } from "react";
import { Option, selectData2 } from "../../data/selectData";
import { skillData } from "../../data/skillData";
import { RadioAccordion } from "../../modules/team/Accordion";

const TeamMenu = () => {
    const [selectedOption, setSelectedOption] = useState('');
    const [searchData, setSearchData] = useState({
        kType: '',   // 스킬 목록
    });

    const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedOption(event.target.value);
    };

    const InputChange = (menuType: string, values: number[]) => {
        // searchData를 업데이트
        setSearchData((prevData) => ({
          ...prevData,
          [menuType]: values, // 이제 values는 배열입니다.
        }));
    };

    const getPlaceholder = () => {
        switch (selectedOption) {
            case 'n':
                return '작성자를 입력하세요.';
            case 't':
                return '제목을 입력하세요.';
            default:
                return '검색 옵션을 선택하세요.';
        }
    };
    return(
        <div className={styles.menuBox}>
            <small>!원하는 옵션을 선택 후 검색하기 버튼을 눌러주세요!</small>
            <button className={styles.checkButton}>검색</button>
            <div className={styles.radioGroup}>
                {selectData2.map((option: Option) => (
                    <label key={option.value}>
                        <input
                            type="radio"
                            name="searchOption"
                            value={option.value}
                            onChange={handleOptionChange}
                        />
                        {option.label}
                    </label>
                ))}
            </div>
            <input placeholder={getPlaceholder()} className={styles.inputBox}/>
            <RadioAccordion title="스킬" options={skillData} onInputChange={(values) => InputChange('kType', values)} />
        </div>
    );
}

export default TeamMenu;