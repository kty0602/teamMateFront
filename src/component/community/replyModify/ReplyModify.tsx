import styles from "../../../css/community/replyModify/replyModifyForm.module.css";
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface ModifyReplyProps {
    idx: number;
    rboard: number;
    rnickname: string;
    rcontent: string;
    regDate: string;
}

const ReplyModify: React.FC<ModifyReplyProps> = ({ idx, rboard, rnickname, rcontent, regDate }) => {
    const navigate = useNavigate();
    const [modifiedContent, setModifiedContent] = useState(rcontent);

    const ContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setModifiedContent(e.target.value);
    };

    const Modify = async () => {
        try {
            // 서버로 수정된 내용 전송
            await axios.post('http://localhost:6600/reply/modify', {
                idx: idx,
                rcontent: modifiedContent
            });

            navigate(`/read/${rboard}`);
        } catch (error) {
            console.error('댓글 수정 중 에러 발생:', error);
        }
    };

    return(
        <div className={styles.replyModify}>
            <div className={styles.replies}>
                <div className={styles.replyHeader}>
                    <text>[{rnickname}] | [{regDate}]</text>
                </div>
                <div className={styles.replyContent}>
                    <textarea
                        value={modifiedContent}
                        onChange={ContentChange}
                        className={styles.modifyTextArea}
                    />
                </div>
            </div>
            <button onClick={Modify} className={styles.modifyButton}>
                        수정
            </button>
        </div>
    );
}

export default ReplyModify;