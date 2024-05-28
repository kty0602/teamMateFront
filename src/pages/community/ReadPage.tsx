import Header from "../../component/common/Header";
import Menu from "../../component/common/Menu";
import ReadForm from "../../component/community/read/ReadForm";
import styles from "../../css/community/read/Read.module.css";
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Reply from "../../component/community/read/Reply";

const ReadPage = () => {
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
        <div className={styles.readBox}>
            <Header/>
            <Menu/>
            <ReadForm 
                idx ={idx}
                buser={postData.buser} 
                btitle={postData.btitle}
                bcontent={postData.bcontent} 
                bnickname={postData.bnickname} 
                modDate={postData.modDate} 
                link={postData.link} 
                bdelete={postData.bdelete}
            />
            <Reply rboard={idx}/>
        </div>
    );
}

export default ReadPage;