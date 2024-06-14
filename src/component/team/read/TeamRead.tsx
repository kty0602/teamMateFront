import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/Store';
import styles from "../../../css/team/read/TeamReadForm.module.css";
import { skillData } from '../../../data/skillData';

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

const TeamRead: React.FC<ReadPageProps> = ({ idx, tuser, ttitle, tcontent, tnickname, modDate, state, tskill, tdelete }) => {
    const user = useSelector((state: RootState) => state.user);
    const userId = Number(user.idx);
    const teamId = Number(idx);
    const canEdit = tuser === userId;
    const navigate = useNavigate();

    // tskill을 배열로 변환
    const skillIds = tskill ? tskill.split(',').map(id => Number(id.trim())) : [];

    // skillData에서 해당하는 label 찾기
    const skillLabels = skillIds.map(id => {
         const skill = skillData.find(skill => skill.value === id);
         return skill ? skill.label : null;
    }).filter(label => label !== null);

    // 삭제 처리 요청
    const Remove = async () => {
        try {
            const response = await axios.post('http://localhost:6600/team/remove', {
                idx: teamId,
                tdelete: tdelete
            });
            alert('삭제 완료');
            navigate('/teamMate');
        } catch (error) {
            console.error('게시물 삭제 중 에러 발생:', error);
        }
    };

    const StateUpdate = async () => {
        try {
            const response = await axios.post('http://localhost:6600/team/update', {
                idx: teamId,
                state: state
            });
            alert('상태 변경 완료');
            navigate('/teamMate');
        } catch (error) {
            console.error('게시물 상태 변경 중 에러 발생', error);
        }
    }

    return(
        <div className={styles.readPage}>
            {canEdit && (
                <div className={styles.readButtons}>
                    <Link to={`/teamModify/${idx}`} state={{idx}} className={styles.aTitle}>
                        <text className={styles.font1}>수정</text>
                    </Link>
                    <text>|</text>
                    <text className={styles.font2} onClick={Remove}>삭제</text>
                </div>
            )}
            <text className={styles.readTitle}>{ttitle}</text>
            <div className={styles.readName}>
                <text>작성자: [{tnickname}]</text>
                <text>[{modDate}]</text>
            </div>
            <div className={styles.readArea}>
                <text>{tcontent}</text>
            </div>
            <div className={styles.readSkill}>
                <text>사용 스킬 목록</text>
                <div className={styles.skillTable}>
                    {skillLabels.map((label, index) => (
                    <div className={styles.eachSkill} key={index}>
                        <text>{label}</text>
                    </div>
                    ))}
                </div>
            </div>
            {canEdit && (
                <div className={styles.stateBox}>
                    <small>!팀이 결정되거나 변경 사항이 있으면 버튼을 눌러 상태를 변경하세요!</small>
                    <button className={styles.stateButton} onClick={StateUpdate}>모집 상태 변경</button>
                </div>
            )}
        </div>
    );
}

export default TeamRead;