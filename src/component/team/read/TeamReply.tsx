import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/Store';
import axios from 'axios';
import { useEffect, useState } from 'react';
import styles from "../../../css/team/read/TeamReply.module.css";

interface replyProps {
    trTeam: any;
}


const TeamReply: React.FC<replyProps> = ({trTeam}) => {
    const user = useSelector((state: RootState) => state.user);
    const userId = Number(user.idx);
    const navigate = useNavigate();

    const [trcontent, setReply] = useState("");

    const [replies, setReplies] = useState<{ 
        idx: number; 
        trTeam: number;
        trUser: number;
        trnickname: string; 
        regDate: string; 
        trcontent: string; 
        
    }[]>([]);

    const fetchReplies = async () => {
        try {
            const response = await axios.get(`http://localhost:6600/teamReply/team/${trTeam}`);
            setReplies(response.data as { idx: number; trTeam: number; trUser: number, trnickname: string; regDate: string; trcontent: string; }[]);
        } catch (error) {
            console.error('댓글 데이터를 불러오는 도중 에러 발생:', error);
        }
    };

    const Remove = async (idx: number) => {
        try {
            await axios.post('http://localhost:6600/teamReply/remove', { idx });
            alert('댓글이 성공적으로 삭제되었습니다.');
            fetchReplies(); // 댓글 목록을 다시 불러옵니다.
        } catch (error) {
            console.error('댓글 삭제 중 에러 발생:', error);
        }
    };

    const Register = async () => {
        try {
            await axios.post('http://localhost:6600/teamReply/register', {
                trUser: userId,
                trTeam: trTeam,
                trcontent: trcontent
            });
            alert('댓글이 성공적으로 등록되었습니다.');
            setReply(""); // 텍스트박스를 비웁니다.
            fetchReplies(); // 댓글 목록을 다시 불러옵니다.
        } catch (error) {
            console.error('댓글 등록 중 에러 발생:', error);
        }
    };

    useEffect(() => {
        fetchReplies(); 
    }, [trTeam]);

    return(
        <div className={styles.replyPage}>
            <div className={styles.replyRegister}>
                <textarea 
                    className={styles.replyText}
                    value={trcontent}
                    onChange={(e) => setReply(e.target.value)}
                />
                <button className={styles.replySubmit} onClick={Register}>작성</button>
            </div>
            <div className={styles.replyComment}>
                {replies.map((reply) => (
                    <div key={reply.idx} className={styles.replies}>
                        <div className={styles.replyHeader}>
                            <text>[{reply.trnickname}] | [{reply.regDate}]</text>
                            {reply.trUser === userId && (
                                <div>
                                    <Link to={`/teamReplyModify`} state={{reply}} className={styles.aTitle}>
                                        <text className={styles.replyFont1}>수정</text>
                                    </Link>
                                    <text>|</text>
                                    <text className={styles.replyFont2} onClick={() => Remove(reply.idx)}>삭제</text>
                                </div>
                            )}
                        </div>
                        <div className={styles.replyContent}>
                            <text>{reply.trcontent}</text>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TeamReply;