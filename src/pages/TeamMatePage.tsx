import Header from "../component/common/Header";
import Menu from "../component/common/Menu";
import styles from "../css/team/Team.module.css";
import axios from "axios";
import React, { useEffect, useState } from 'react';
import TeamMenu from "../component/team/TeamMenu";
import TeamTable from "../component/team/TeamTable";


const TeamMatePage = () => {
    const [teamData, setTeamData] = useState({
        dtoList: [],
        totalPage: 0,
        page: 0,
        prev: false,
        next: false,
        pageList: [],
    })

    const [currentPage, setCurrentPage] = useState(1);
    const [searchValue, setSearchValue] = useState('');
    const [ktypeValue, setKtypeValue] = useState('');

    const PageClick = (pageNum: number) => {
        setCurrentPage(pageNum);
    };

    const fetchData = async (searchValue = '', ktypeValue = '') => {
        try {
            const params = new URLSearchParams();
            if (ktypeValue) params.append('ktype', ktypeValue);
            if (searchValue) params.append('search', searchValue);
            const queryString = params.toString();
            const url = `http://localhost:6600/team/list?page=${currentPage}${queryString ? `&${queryString}` : ''}`;
            console.log('Fetching data from URL:', url);
            const response = await axios.get(url);
            setTeamData(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('게시판 데이터를 불러오는 도중 에러 발생:', error);
        }
    };

    useEffect(() => {
        fetchData(searchValue, ktypeValue);
    }, [currentPage, searchValue, ktypeValue]);

    const handleSearch = (searchValue: string, ktypeValue: string) => {
        setSearchValue(searchValue);
        setKtypeValue(ktypeValue);
        setCurrentPage(1);  // 검색 시 페이지를 1로 초기화
    };

    return(
        <div className={styles.teamBox}>
            <Header/>
            <Menu/>
            <div className={styles.teamBox2}>
                <TeamMenu onSearch={handleSearch}/>
                <TeamTable teamData={teamData} currentPage={currentPage} onPageClick={PageClick}/>
            </div>
        </div>
    );
}


export default TeamMatePage;