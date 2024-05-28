import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/Store';
import axios from 'axios';
import { useEffect, useState } from 'react';
import styles from "../../../css/community/read/Reply.module.css";

interface replyProps {
    rboard:any;
}

const Reply: React.FC<replyProps> = ({rboard}) => {
    const user = useSelector((state: RootState) => state.user);
    const userId = Number(user.idx);
    const navigate = useNavigate();

    const [rcontent, setReply] = useState("");

    const [replies, setReplies] = useState<{ 
        idx: number; 
        rboard: number;
        ruser: number;
        rnickname: string; 
        regDate: string; 
        rcontent: string 
    }[]>([]);

    const Remove = async (idx: number) => {
        try {
            const response = await axios.post('http://localhost:6600/reply/remove', {
                 idx:idx
            });

            // 삭제 성공 시에 추가적인 로직을 수행하거나 페이지를 리로드할 수 있습니다.
            console.log('댓글이 성공적으로 삭제되었습니다.');
            window.location.reload();
        } catch (error) {
            console.error('댓글 삭제 중 에러 발생:', error);
        }
    };


    useEffect(() => {
        const fetchReplies = async () => {
            try {
                const response = await axios.get(`http://localhost:6600/reply/board/${rboard}`);
                setReplies(response.data as { idx: number; rboard: number; ruser: number, rnickname: string; regDate: string; rcontent: string }[]);
            } catch (error) {
                console.error('댓글 데이터를 불러오는 도중 에러 발생:', error);
            }
        };

        fetchReplies(); 
    }, [rboard]);

    const Register = async () => {
        try {
            // rcontent의 내용을 서버에 전송
            const response = await axios.post('http://localhost:6600/reply/register', {
                ruser: userId,
                rboard: rboard,
                rcontent: rcontent
            });

            console.log('댓글이 성공적으로 등록되었습니다.');
            window.location.reload();
        } catch (error) {
            console.error('댓글 등록 중 에러 발생:', error);
        }
    };
    
    return(
        <div className={styles.replyPage}>
            <div className={styles.replyRegister}>
                <textarea 
                    className={styles.replyText}
                    value={rcontent}
                    onChange={(e) => setReply(e.target.value)}
                />
                <button className={styles.replySubmit} onClick={Register}>작성</button>
            </div>
            <div className={styles.replyComment}>
                {replies.map((reply) => (
                    <div key={reply.idx} className={styles.replies}>
                        <div className={styles.replyHeader}>
                            <text>[{reply.rnickname}] | [{reply.regDate}]</text>
                            {reply.ruser === userId && (
                                <div>
                                    <Link to={`/replyModify`} state={{reply}} className={styles.aTitle}>
                                        <text className={styles.replyFont1}>수정</text>
                                    </Link>
                                    <text>|</text>
                                    <text className={styles.replyFont2} onClick={() => Remove(reply.idx)}>삭제</text>
                                </div>
                            )}
                        </div>
                        <div className={styles.replyContent}>
                            <text>{reply.rcontent}</text>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Reply;