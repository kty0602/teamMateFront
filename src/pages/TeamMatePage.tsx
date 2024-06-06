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
            const url = `http://localhost:6600/team/list?page=${currentPage}${params.toString()}`;
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

    return(
        <div className={styles.teamBox}>
            <Header/>
            <Menu/>
            <div className={styles.teamBox2}>
                <TeamMenu/>
                <TeamTable teamData={teamData} currentPage={currentPage} onPageClick={PageClick}/>
            </div>
        </div>
    );
}

export default TeamMatePage;