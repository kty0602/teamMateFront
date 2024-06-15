import styles from "../../css/UserInfo/UserInfoBox.module.css";
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/Store';
import axios from "axios";
import React, { useState, useEffect } from 'react';
import { skillData } from "../../data/skillData";
import { useNavigate, Link } from 'react-router-dom';
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

interface Team {
    idx: number;
    tnickname: string;
    ttitle: string;
    tcontent: string;
    tskill: string;
    state: number;
    regDate: string;
    modDate: string;
    replyCount: number;
    tdelete: boolean;
    tuser: number;
}

interface Community {
    idx: number;
    btitle: string;
    bcontent: string;
    bnickname: string;
    link: string;
    regDate: string;
    modDate: string;
    replyCount: number;
    bdelete: boolean;
    buser: number;
}


const UserInfoBox: React.FC = () => {
    const user = useSelector((state: RootState) => state.user);
    const name = String(user.name);
    
    const [editMode, setEditMode] = useState<boolean>(false);
    const [userSkills, setUserSkills] = useState<MappedSkill[]>([]);
    const [showSkillSelect, setShowSkillSelect] = useState<boolean>(false);
    const [teamData, setTeamData] = useState<Team[]>([]);
    const [boardData, setBoardData] = useState<Community[]>([]);
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

    useEffect(() => {
        axios.get(`http://localhost:6600/team/list?search=n:${name}`)
            .then(response => {
                // 성공적으로 데이터를 받아왔을 때의 로직
                setTeamData(response.data.dtoList); // 받아온 데이터를 상태에 저장
            })
            .catch(error => {
                // 에러 처리 로직
                console.error("There was an error fetching the team data!", error);
            });
    }, [name]);

    useEffect(() => {
        axios.get(`http://localhost:6600/board/list?btype=n:${name}`)
            .then(response => {
                setBoardData(response.data.dtoList);
            })
            .catch(error => {
                console.error("There was an error fetching the team data!", error);
            });
    }, [name]);

    // tskill 값을 처리하는 함수
    const getSkillLabels = (tskill: string) => {
        const skillIds = tskill.split(',').map(Number); // 쉼표로 분리하고 정수로 변환
        const skillLabels = skillIds.map(id => {
            const skill = skillData.find(skill => skill.value === id);
            return skill ? skill.label : '';
        });
    
        // 4개까지만 표시하고 나머지는 ...으로 표시
        if (skillLabels.length > 4) {
            return skillLabels.slice(0, 4).join(', ') + ' ...';
        } else {
            return skillLabels.join(', '); // 문자열로 합침
        }
    };

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
            <h1>{name}의 상세 페이지</h1>
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
            <span className={styles.Text}>나의 팀 매칭 활동</span>
            <div className={styles.teamBox}>
                <div className={styles.dataTable1}>
                    {teamData.map(item => (
                        <div key={item.idx} className={styles.box1}>
                            <div className={styles.header}>
                            <text className={styles.status}>{item.state === 0 ? '모집중' : '모집완료'}</text>
                                <Link to={`/teamRead/${item.idx}`} className={styles.aTitle}>
                                    <text className={styles.itemTitle}>{item.ttitle}</text>
                                </Link>
                            </div>
                            <div className={styles.body}>
                                <text className={styles.itemText}>작성자 : {item.tnickname}</text>
                                <text className={styles.itemText}>작성일 : {item.regDate}</text>
                                <text className={styles.itemText}>사용기술 : {getSkillLabels(item.tskill)}</text>
                                <text className={`${styles.itemText} ${styles.comment}`}>{item.replyCount}</text>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <span className={styles.Text}>나의 게시물 목록</span>
            <div className={styles.communityBox}>
                <div className={styles.dataTable2}>
                    {boardData.map((item, index) => (
                        <div key={item.idx} className={styles.box2}>
                            <text>{boardData.length - index}</text>
                            <Link to={`/read/${item.idx}`} className={styles.aTitle}>
                                <text>{item.btitle} ... [{item.replyCount}]</text>  
                            </Link>
                            <text>작성자: {item.bnickname}</text>
                            <text>작성일: {item.regDate}</text>
                        </div>
                    ))}
                </div>
            </div>
            {showSkillSelect && <SkillSelect onClose={() => setShowSkillSelect(false)} />} 
        </div>
    );
}

export default UserInfoBox;