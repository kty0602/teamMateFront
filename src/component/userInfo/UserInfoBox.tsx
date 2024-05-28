import styles from "../../css/UserInfo/UserInfoBox.module.css";
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/Store';
import axios from "axios";
import React, { useState, useEffect } from 'react';
import { skillData } from "../../data/skillData";
import { useNavigate } from 'react-router-dom';
import SkillSelect from "./SkillSelect";

// Skill 인터페이스 정의
interface Skill {
    idx: number;
    sskill: number;
    suser: number;
}

// MappedSkill 인터페이스 정의
interface MappedSkill extends Skill {
    skillName: string;
}


const UserInfoBox: React.FC = () => {
    const user = useSelector((state: RootState) => state.user);
    const [editMode, setEditMode] = useState<boolean>(false);
    const [userSkills, setUserSkills] = useState<MappedSkill[]>([]);
    const [showSkillSelect, setShowSkillSelect] = useState<boolean>(false);
    const navigate = useNavigate();

    // 스킬 목록 불러오기
    useEffect(() => {
        const userId = user.idx;
        axios.get(`http://localhost:6600/skill/user?userId=${userId}`)
            .then(response => {
                // 성공적으로 데이터를 받아왔을 때의 로직
                const skills: MappedSkill[] = response.data.map((skill: Skill) => {
                    const skillInfo = skillData.find(s => s.value === skill.sskill);
                    return {
                        ...skill,
                        skillName: skillInfo ? skillInfo.label : 'Unknown Skill'
                    };
                });
                setUserSkills(skills); // 받아온 데이터를 상태에 저장
            })
            .catch(error => {
                // 에러 처리 로직
                console.error("There was an error!", error);
            });
    }, [user.idx]);

    // 목록에서 스킬 삭제
    const handleDelete = (idx: number) => {
        axios.post(`http://localhost:6600/skill/delete?idx=${idx}`)
            .then(response => {
                // 성공적으로 삭제했을 때의 로직
                setUserSkills(prevSkills => prevSkills.filter(skill => skill.idx !== idx));
                alert("삭제되었습니다");
                navigate("/userInfo");
            })
            .catch(error => {
                // 에러 처리 로직
                console.error("There was an error deleting the skill!", error);
            });
    };

    return(
        <div className={styles.infoBox}>
            <h1>{user.name}의 상세 페이지</h1>
            <div className={styles.introduce}>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%'}}>
                <span className={styles.Text}>나의 스킬</span>
                {editMode === false ? (
                    <span className={styles.Button} onClick={() => setEditMode(true)}>+편집</span>
                ) : (
                    <div>
                        <span className={styles.Button} onClick={() => setShowSkillSelect(true)}>+추가</span>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <span className={styles.Button} onClick={() => setEditMode(false)}>-완료</span>
                    </div>
                )}
            </div>
            <div className={styles.skillBox}>
                {userSkills.map(skill => (
                    <div key={skill.idx} className={styles.box}>
                        <span className={styles.skillName}>{skill.skillName}</span>
                        {editMode === true && (
                            <span className={styles.deleteButton} onClick={() => handleDelete(skill.idx)}>X</span>
                        )}
                    </div>
                ))}
            </div>
            <span className={styles.Text}>나의 게시물 목록</span>

            {showSkillSelect && <SkillSelect onClose={() => setShowSkillSelect(false)} />} 
        </div>
    );
}

export default UserInfoBox;