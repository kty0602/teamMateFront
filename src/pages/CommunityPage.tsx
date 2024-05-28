import Header from "../component/common/Header";
import Menu from "../component/common/Menu";
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Search from "../component/community/Search";
import BoardTable from "../component/community/BoardTable";
import styles from "../css/community/Community.module.css"

const CommunityPage = () => {
    const [boardData, setBoardData] = useState({
        dtoList: [],
        totalPage: 0,
        page: 0,
        prev: false,
        next: false,
        pageList: [],
    });

    const [currentPage, setCurrentPage] = useState(1);

    const fetchData = async (searchValue: string) => {
        try {
            const url = searchValue
                ? `http://localhost:6600/board/list?page=${currentPage}&btype=${searchValue}`
                : `http://localhost:6600/board/list?page=${currentPage}`;

            const response = await axios.get(url);
            setBoardData(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('게시판 데이터를 불러오는 도중 에러 발생:', error);
        }
    };

    useEffect(() => {
        fetchData('');
    }, [currentPage]);

    const PageClick = (pageNum: number) => {
        setCurrentPage(pageNum);
    };

    return(
        <div className={styles.communityBox}>
            <Header/>
            <Menu/>
            <Search onSearch={fetchData}/>
            <BoardTable boardData={boardData} currentPage={currentPage} onPageClick={PageClick}/>
        </div>
    );
}

export default CommunityPage;