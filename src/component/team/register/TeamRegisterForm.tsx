import styles from "../../../css/team/register/TeamRegisterForm.module.css";
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/Store';
import { skillData } from "../../../data/skillData";

const TeamRegisterForm = () => {
    const user = useSelector((state: RootState) => state.user);
    const userId = user.idx;
    const navigate = useNavigate();

    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [selectedSkills, setSelectedSkills] = useState<number[]>([]);

    const handleSkillChange = (value: number) => {
        setSelectedSkills((prevSelectedSkills) => {
            if (prevSelectedSkills.includes(value)) {
                return prevSelectedSkills.filter((skill) => skill !== value);
            } else {
                return [...prevSelectedSkills, value];
            }
        });
    };

    const skill = selectedSkills.join(',');

    const Save = async () => {
        // 입력 값 검증
        if (!title) {
            alert('제목을 입력해주세요.');
            return;
        }
        if (!content) {
            alert('내용을 입력해주세요.');
            return;
        }
        if (selectedSkills.length === 0) {
            alert('사용 스킬 스택을 선택해주세요.');
            return;
        }
        
         // 게시글 등록 요청
        const postData = {
            tuser: Number(userId),
            ttitle: title, // 입력한 제목 값으로 변경
            tcontent: content, // 입력한 내용 값으로 변경
            state: 0,
            tskill: skill,
            tdelete : true, 
        };
        
        try {
            await axios.post('http://localhost:6600/team/register', postData);

            alert("글이 등록되었습니다.");
            // 요청이 성공적으로 완료되면 '/teamMate'로 이동
            navigate('/teamMate');
        } catch (error) {
            // 요청 실패 시 에러 처리
            console.error('게시글 등록 중 에러 발생:', error);
        }
    }

    return(
        <div className={styles.registerBox}>
            <input 
                className={styles.inputText} 
                placeholder='제목을 입력해주세요.' 
                value={title} 
                onChange={(e) => setTitle(e.target.value)}/>
            <textarea
                className={styles.textArea}
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />
            <div className={styles.skillCheckboxes}>
                {skillData.map((skill) => (
                    <label key={skill.value} className={styles.skillLabel}>
                        <input 
                            type="checkbox" 
                            value={skill.value}
                            checked={selectedSkills.includes(skill.value)}
                            onChange={() => handleSkillChange(skill.value)}
                        />
                        {skill.label}
                    </label>
                ))}
            </div>
            <span className={styles.registerButton} onClick={Save}>저장</span>
        </div>
    );
}

export default TeamRegisterForm;