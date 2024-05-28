import Header from "../../component/common/Header";
import Menu from "../../component/common/Menu";
import ReplyModify from "../../component/community/replyModify/ReplyModify";
import styles from "../../css/community/replyModify/ReplyModify.module.css";
import { useLocation } from 'react-router-dom';

const ReplyModifyPage = () => {
    const location = useLocation();
    const { state } = location;
    const { reply } = state;

    return(
        <div className={styles.replyModifyBox}>
            <Header/>
            <Menu/>
            <ReplyModify
                idx={reply.idx}
                rboard={reply.rboard}
                rnickname={reply.rnickname}
                rcontent={reply.rcontent}
                regDate={reply.regDate}
            />
        </div>
    );
}

export default ReplyModifyPage;