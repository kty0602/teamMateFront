import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/Store';
import styles from "../../../css/community/read/ReadForm.module.css";

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

const ReadForm: React.FC<ReadPageProps> = ({ idx, buser, btitle, bcontent, bnickname, modDate, link, bdelete}) => {
    const user = useSelector((state: RootState) => state.user);
    const userId = Number(user.idx);
    const boardId = Number(idx);
    const canEdit = buser === userId;
    const navigate = useNavigate();

    // 삭제 처리 요청
    const Remove = async () => {
        try {
            const response = await axios.post('http://localhost:6600/board/remove', {
                idx: boardId,
                bdelete: bdelete
            });

            navigate('/community');
        } catch (error) {
            console.error('게시물 삭제 중 에러 발생:', error);
        }
    };

    return(
        <div className={styles.readPage}>
            {canEdit && (
                <div className={styles.readButtons}>
                    <Link to={`/modify/${idx}`} state={{idx}} className={styles.aTitle}>
                        <text className={styles.font1}>수정</text>
                    </Link>
                    <text>|</text>
                    <text className={styles.font2} onClick={Remove}>삭제</text>
                </div>
            )}
            <text className={styles.readTitle}>{btitle}</text>
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
                <text>{bcontent}</text>
            </div>
        </div>
    );
}

export default ReadForm;

