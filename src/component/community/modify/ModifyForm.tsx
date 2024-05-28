import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/Store';
import styles from "../../../css/community/modify/ModifyForm.module.css";
import { useState } from 'react';


interface ReadPageProps {
    idx: any;
    buser: number;
    btitle: string;
    bcontent: string;
    bnickname: string;
    modDate: string;
    link?: string;
    bdelete: boolean
}

const ModifyForm: React.FC<ReadPageProps> = ({ idx, buser, btitle, bcontent, bnickname, modDate, link, bdelete}) => {
    const user = useSelector((state: RootState) => state.user);
    const userId = Number(user.idx);
    const boardId = Number(idx);
    const navigate = useNavigate();
    const [modifiedContent, setModifiedContent] = useState<string>(bcontent);
    const [modifiedTitle, setModifiedTitle] = useState<string>(btitle);

    const Modify= async () => {
        try {
            // 수정된 내용을 서버로 전송하고 처리하는 로직 추가
            await axios.post('http://localhost:6600/board/modify', {
                idx: boardId,
                btitle: modifiedTitle,
                bcontent: modifiedContent,
            });

            // 수정 완료 후 이동하거나 다른 작업 수행
            navigate(`/read/${boardId}`);
        } catch (error) {
            console.error('게시물 수정 중 에러 발생:', error);
        }
    };

    return(
        <div className={styles.readPage}>
            <input 
                className={styles.modifyTitle}
                placeholder={btitle} 
                value={modifiedTitle}
                onChange={(e) => setModifiedTitle(e.target.value)}
            />
            <div className={styles.readName}>
                <text>작성자: [{bnickname}]</text>
                <text>[{modDate}]</text>
            </div>
            <div className={styles.readArea}>
                {link && (link.includes('.mp4') ? (
                    <video width="320" height="240" controls>
                        <source src={link} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                    ) : link ? (
                    <img src={link} alt="게시물 이미지" />
                ) : null)}
                <textarea
                    className={styles.modifyContent}
                    placeholder={bcontent} 
                    value={modifiedContent}
                    onChange={(e) => setModifiedContent(e.target.value)}
                />
            </div>
            <span className={styles.registerButton} onClick={Modify}>수정</span>
        </div>
    );
}

export default ModifyForm;