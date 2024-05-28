import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/Store';
import React, { useState } from 'react';
import { skillData } from "../../data/skillData";
import styles from "../../css/UserInfo/SkillSelect.module.css";

interface SkillSelectProps {
    onClose: () => void; // 여기에서 onClose의 타입을 명시적으로 선언합니다.
  }

const SkillSelect: React.FC<SkillSelectProps> = ({ onClose }) => {
    const user = useSelector((state: RootState) => state.user);
    const userId = user.idx;
    const [selectedSkills, setSelectedSkills] = useState<number[]>([]);
    const navigate = useNavigate();

    const handleSelectSkill = (value: number) => {
        setSelectedSkills(prev => {
            if (prev.includes(value)) {
                return prev.filter(skillValue => skillValue !== value);
            } else {
                return [...prev, value];
            }
        });
    };

    const handleSaveSkills = async () => {
        const skillData = selectedSkills.map(skillValue => ({
            suser: Number(userId),
            sskill: Number(skillValue)
        }));
        try {
            await axios.post('http://localhost:6600/skill/stack', skillData);
            // POST 요청이 성공하면 사용자를 /userInfo 경로로 리다이렉트
            navigate('/');
            onClose();
        } catch (error) {
            console.error('스킬 저장에 실패했습니다.', error);
            console.log("여기", skillData);
        }
        onClose();
    };

    return(
        <>
            <div className={styles.modalOverlay} onClick={onClose}></div>
            <div className={styles.modal}>
                <h2>스킬 선택</h2>
                <div className={styles.skillList}>
                  {skillData.map(skill => (
                      <div key={skill.value} className={styles.skillItem}>
                          <input
                              type="checkbox"
                              value={skill.value}
                              checked={selectedSkills.includes(skill.value)}
                              onChange={() => handleSelectSkill(skill.value)}
                          />
                          <label>{skill.label}</label>
                      </div>
                  ))}
                </div>
                <div className={styles.buttonContainer}>
                    <button onClick={handleSaveSkills} className={styles.checkButton}>저장</button>
                    <button onClick={onClose} className={styles.cancleButton}>닫기</button>
                </div>
            </div>
        </>
    );
}

export default SkillSelect;