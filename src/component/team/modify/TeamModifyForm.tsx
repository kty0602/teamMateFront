import styles from "../../../css/team/modify/TeamModifyForm.module.css";
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/Store';
import { useState, useEffect } from 'react';
import { skillData } from "../../../data/skillData";

interface ReadPageProps {
    idx: any;
    tuser: number;
    ttitle: string;
    tcontent: string;
    tnickname: string;
    modDate: string;
    state: number;
    tskill: string;
    tdelete: boolean;
}

const TeamModifyForm: React.FC<ReadPageProps> = ({ idx, tuser, ttitle, tcontent, tnickname, modDate, state, tskill, tdelete }) => {
    const user = useSelector((state: RootState) => state.user);
    const userId = Number(user.idx);
    const teamId = Number(idx);
    const navigate = useNavigate();


    const [modifiedContent, setModifiedContent] = useState<string>(tcontent);
    const [modifiedTitle, setModifiedTitle] = useState<string>(ttitle);
    const [modifiedSkills, setModifiedSkills] = useState<number[]>([]);

    console.log("1", modifiedTitle);
    console.log("2", modifiedContent);

    useEffect(() => {
        const initialSkills = tskill ? tskill.split(',').map(Number) : [];
        setModifiedSkills(initialSkills);
        setModifiedTitle(ttitle);
        setModifiedContent(tcontent);
    }, [tskill, ttitle, tcontent]);

    const handleSkillChange = (value: number) => {
        setModifiedSkills((prevSelectedSkills) => {
            if (prevSelectedSkills.includes(value)) {
                return prevSelectedSkills.filter((skill) => skill !== value);
            } else {
                return [...prevSelectedSkills, value];
            }
        });
    };
    
    const skill = modifiedSkills.join(',');

    const Modify = async () => {
        try {
            // 수정된 내용을 서버로 전송하고 처리하는 로직 추가
            await axios.post('http://localhost:6600/team/modify', {
                idx: teamId,
                ttitle: modifiedTitle,
                tcontent: modifiedContent,
                tskill: skill
            });

            // 수정 완료 후 이동하거나 다른 작업 수행
            alert('성공적으로 수정하였습니다.');
            navigate(`/teamRead/${teamId}`);
        } catch (error) {
            console.error('게시물 수정 중 에러 발생:', error);
        }
    };

    return (
        <div className={styles.readPage}>
            <input 
                className={styles.modifyTitle}
                placeholder={ttitle} 
                value={modifiedTitle}
                onChange={(e) => setModifiedTitle(e.target.value)}
            />
            <div className={styles.readName}>
                <text>작성자: [{tnickname}]</text>
                <text>[{modDate}]</text>
            </div>
            <div className={styles.readArea}>
                <textarea
                    className={styles.modifyContent}
                    placeholder={tcontent} 
                    value={modifiedContent}
                    onChange={(e) => setModifiedContent(e.target.value)}
                />
            </div>
            <div className={styles.skillCheckboxes}>
                {skillData.map((skill) => (
                    <label key={skill.value} className={styles.skillLabel}>
                        <input 
                            type="checkbox" 
                            value={skill.value}
                            checked={modifiedSkills.includes(skill.value)}
                            onChange={() => handleSkillChange(skill.value)}
                        />
                        {skill.label}
                    </label>
                ))}
            </div>

            <span className={styles.registerButton} onClick={Modify}>수정</span>
        </div>
    );
}

export default TeamModifyForm;
