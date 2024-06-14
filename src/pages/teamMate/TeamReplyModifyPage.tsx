import Header from "../../component/common/Header";
import Menu from "../../component/common/Menu";
import TeamReplyModify from "../../component/team/replyModify/TeamReplyModify";
import styles from "../../css/team/replyModify/TeamReplyModify.module.css";
import { useLocation } from 'react-router-dom';

const TeamReplyModifyPage = () => {
    const location = useLocation();
    const { state } = location;
    const { reply } = state;

    console.log("여기댓글", reply)

    return(
        <div className={styles.replyModifyBox}>
            <Header/>
            <Menu/>
            <TeamReplyModify
                idx={reply.idx}
                trTeam={reply.trTeam}
                trnickname={reply.trnickname}
                trcontent={reply.trcontent}
                regDate={reply.regDate}
            />
        </div>
    );
}

export default TeamReplyModifyPage;