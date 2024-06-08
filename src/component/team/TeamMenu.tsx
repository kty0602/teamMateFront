import styles from "../../css/team/TeamMenu.module.css";
import React, { useState } from "react";
import { Option, selectData2 } from "../../data/selectData";
import { skillData } from "../../data/skillData";
import { RadioAccordion } from "../../modules/team/Accordion";

interface TeamMenuProps {
    onSearch: (searchValue: string, ktypeValue: string) => void;
}

const TeamMenu: React.FC<TeamMenuProps> = ({ onSearch }) => {
    const [searchData, setSearchData] = useState({
        kType: '',   // 주행거리
    });

    const [selectedOption, setSelectedOption] = useState('');
    const [searchValue, setSearchValue] = useState('');
    const [ktypeValue, setKtypeValue] = useState('');
    

    const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedOption(event.target.value);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value);
    };
    

    const SearchClick = () => {
        // 값이 없어도 ':' 이거 때문에 값이 있다고 판단하는 문제를 해결하기 위해
        const prefixedSearchValue = searchValue ? `${selectedOption}:${searchValue}` : '';
        console.log('searchValue:', prefixedSearchValue); 
        console.log('ktypeValue:', ktypeValue);
        onSearch(prefixedSearchValue, ktypeValue);
    };

    const InputChange = (menuType: string, value: number[]) => {
        // searchData를 업데이트
        setSearchData((prevData) => ({
          ...prevData,
          [menuType]: value,
        }));

        if (menuType === 'kType') {
            // kType 배열을 콤마로 구분된 문자열로 변환하여 ktypeValue 상태 업데이트
            const ktypeStr = value.join(',');
            setKtypeValue(ktypeStr);
        }
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
            <button className={styles.checkButton} onClick={SearchClick}>검색</button>
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
            <input placeholder={getPlaceholder()} className={styles.inputBox} value={searchValue} onChange={handleInputChange}/>
            <RadioAccordion 
                title="스킬" 
                options={skillData} 
                onInputChange={(value) => InputChange('kType', value)}
            />
        </div>
    );
}

export default TeamMenu;