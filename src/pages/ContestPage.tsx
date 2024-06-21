import axios from "axios";
import React, { useEffect, useState } from 'react';
import Header from "../component/common/Header";
import Menu from "../component/common/Menu";
import styles from "../css/contest/Contest.module.css";
import ContestTable from "../component/contest/ContestTable";

const ContestPage = () => {
    const [contestData, setContestData] = useState({
        dtoList: [],
        totalPage: 0,
        page: 0,
        prev: false,
        next: false,
        pageList: [],
    })

    const [currentPage, setCurrentPage] = useState(1);

    const PageClick = (pageNum: number) => {
        setCurrentPage(pageNum);
    };

    const fetchData = async () => {
        try {
            const url = `http://localhost:6600/contest/list?page=${currentPage}`
            const response = await axios.get(url);
            setContestData(response.data);
        } catch (error) {
            console.error('공모전 데이터를 불러오는 도중 에러 발생:', error);
        }
    }

    useEffect(() => {
        fetchData();
    }, [currentPage]);

    return(
        <div className={styles.contestBox}>
            <Header/>
            <Menu/>
            <ContestTable contestData={contestData} currentPage={currentPage} onPageClick={PageClick} />
        </div>
    );
}

export default ContestPage;