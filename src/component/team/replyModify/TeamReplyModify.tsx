import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from "../../../css/team/replyModify/TeamReplyModifyForm.module.css";

interface ModifyReplyProps {
    idx: number;
    trTeam: number;
    trnickname: string;
    trcontent: string;
    regDate: string;
}


const TeamReplyModify: React.FC<ModifyReplyProps> = ({ idx, trTeam, trnickname, trcontent, regDate }) => {
    const navigate = useNavigate();
    const [modifiedContent, setModifiedContent] = useState(trcontent);

    const ContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setModifiedContent(e.target.value);
    };

    const Modify = async () => {
        try {
            // 서버로 수정된 내용 전송
            await axios.post('http://localhost:6600/teamReply/modify', {
                idx: idx,
                trcontent: modifiedContent
            });

            navigate(`/teamRead/${trTeam}`);
        } catch (error) {
            console.error('댓글 수정 중 에러 발생:', error);
        }
    };

    return(
        <div className={styles.replyModify}>
            <div className={styles.replies}>
                <div className={styles.replyHeader}>
                    <text>[{trnickname}] | [{regDate}]</text>
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

export default TeamReplyModify;