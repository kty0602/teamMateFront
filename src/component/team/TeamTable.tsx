import React, { useState } from 'react';
import styles from "../../css/team/TeamTable.module.css";
import { useNavigate, Link } from 'react-router-dom';
import { skillData } from '../../data/skillData';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/Store';

interface TeamProps {
    teamData: {
        dtoList: {
            idx: number;
            ttitle: string;
            tnickname: string;
            tskill: string;
            state: number;
            regDate: string;
            replyCount: number;
        } [];
        totalPage: number;
        page: number;
        prev: boolean;
        next: boolean;
        pageList: number[];
    };
    currentPage: number; // 추가: 현재 페이지 상태
    onPageClick: (pageNum: number) => void;
}


const TeamTable: React.FC<TeamProps> = ({teamData, currentPage, onPageClick}) => {
    const user = useSelector((state: RootState) => state.user);
    const userId = user.idx;
    const navigate = useNavigate();

    // 전체, 모집중, 모집완료 선택
    const [selected, setSelected] = useState('전체');
    const handleClick = (text: string) => {
        setSelected(text);
    };

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

    const handleRegisterClick = () => {
        if (Number(userId) === 0) {
            alert("로그인하지 않았습니다.");
            navigate('/login');
        } else {
            // 글 작성 페이지로 이동하는 로직 추가
            navigate('/teamRegister');
        }
    };

    return(
        <div className={styles.tableBox}>
            <div className={styles.buttonTable}>
                {['전체', '모집중', '모집완료'].map((text) => (
                    <span
                        key={text}
                        className={`${styles.text} ${selected === text ? styles.selected : ''}`}
                        onClick={() => handleClick(text)}
                    >
                        {text}
                    </span>
                ))}
                <button className={`${styles.registerButton} ${styles.comment}`} onClick={handleRegisterClick}>글 작성</button>
            </div>
            <div className={styles.dataTable}>
                {teamData.dtoList
                    .filter(item => {
                        if (selected === '모집중') {
                            return item.state === 0;
                        } else if (selected === '모집완료') {
                            return item.state === 1;
                        }
                        return true; // '전체'가 선택된 경우 모든 항목을 반환
                    })
                    .map((item) => (
                        <div key={item.idx} className={styles.box}>
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
                    ))
                }
            </div>
            <div className={styles.pagination}>
                {teamData.pageList.map((pageNum) => (
                    <button
                        key={pageNum}
                        className={pageNum === currentPage ? 'active' : ''}
                        onClick={() => onPageClick(pageNum)}
                    >
                        {pageNum}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default TeamTable;