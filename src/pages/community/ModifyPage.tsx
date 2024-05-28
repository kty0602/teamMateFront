import Header from "../../component/common/Header";
import Menu from "../../component/common/Menu";
import ModifyForm from "../../component/community/modify/ModifyForm";

import styles from "../../css/community/modify/Modify.module.css";
import axios from "axios";
import { useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';


const ModifyPage = () => {
    const { idx } = useParams();

    const [postData, setPostData] = useState({
        buser: 0,
        btitle: '',
        bcontent: '',
        bnickname: '',
        modDate: '',
        link: '',
        bdelete: true,
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:6600/board/read?idx=${idx}`);
                const { buser, btitle, bcontent, bnickname, modDate, link, bdelete } = response.data;
                setPostData({ buser, btitle, bcontent, bnickname, modDate, link, bdelete });
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
            <ModifyForm
                idx ={idx}
                buser={postData.buser} 
                btitle={postData.btitle}
                bcontent={postData.bcontent} 
                bnickname={postData.bnickname} 
                modDate={postData.modDate} 
                link={postData.link} 
                bdelete={postData.bdelete}
            />
        </div>
    )
}

export default ModifyPage;