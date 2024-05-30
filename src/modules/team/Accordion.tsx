import React, { useState } from 'react';
import styles from "../../css/team/Accordion.module.css";

interface Option {
    value: number;
    label: string;
}

interface AccordionItemProps {
  title: string;
  options: Option[];
  onInputChange: (value: number[]) => void; // 여기를 수정
}

export const RadioAccordion: React.FC<AccordionItemProps> = ({ title, options, onInputChange }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [selectedOptions, setSelectedOptions] = useState<number[]>([]);

    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };

    const handleInputChange = (value: number) => {
      let updatedOptions;
      if (selectedOptions.includes(value)) {
          updatedOptions = selectedOptions.filter(option => option !== value);
      } else {
          updatedOptions = [...selectedOptions, value];
      }
      setSelectedOptions(updatedOptions);
      onInputChange(updatedOptions); // 변경된 선택 옵션 배열을 전달
    };

    return (
        <div className={`${styles.block} ${isOpen ? styles.open : ''}`}>
            <p className={styles.menuText} onClick={toggleAccordion}>{title}</p>
            {isOpen && (
                <ul>
                    {options.map((option) => (
                        <li key={option.value}>
                            <label>
                                <input
                                    type="checkbox"
                                    name={title}
                                    value={option.value}
                                    checked={selectedOptions.includes(option.value)}
                                    onChange={() => handleInputChange(option.value)}
                                />
                                {option.label}
                            </label>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
