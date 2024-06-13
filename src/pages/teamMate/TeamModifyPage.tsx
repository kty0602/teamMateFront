import styles from "../../css/team/modify/TeamModify.module.css";
import axios from "axios";
import { useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import Header from "../../component/common/Header";
import Menu from "../../component/common/Menu";
import TeamModifyForm from "../../component/team/modify/TeamModifyForm";


const TeamModifyPage = () => {
    const { idx } = useParams();
    const [postData, setPostData] = useState({
        tuser: 0,
        ttitle: '',
        tcontent: '',
        tnickname: '',
        modDate: '',
        tskill: '',
        state: 0,
        tdelete: true,
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:6600/team/read?idx=${idx}`);
                const { tuser, ttitle, tcontent, tnickname, modDate, tskill, state, tdelete } = response.data;
                setPostData({ tuser, ttitle, tcontent, tnickname, modDate, tskill, state, tdelete });
            } catch (error) {
                console.error('게시글 데이터를 불러오는 도중 에러 발생:', error);
            }
        };

        fetchData();
    }, [idx]);

    return(
        <div className={styles.modifyBox}>
            <Header/>
            <Menu/>
            <TeamModifyForm
                idx={idx}
                tuser={postData.tuser}
                ttitle={postData.ttitle}
                tcontent={postData.tcontent}
                tnickname={postData.tnickname}
                modDate={postData.modDate}
                state={postData.state}
                tskill={postData.tskill}
                tdelete={postData.tdelete}
            />
        </div>
    );
}

export default TeamModifyPage;