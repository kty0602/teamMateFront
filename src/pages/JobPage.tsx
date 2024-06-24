import Header from "../component/common/Header";
import Menu from "../component/common/Menu";
import styles from "../css/job/Job.module.css";
import axios from "axios";
import React, { useEffect, useState } from 'react';
import JobTable from "../component/job/JobTable";
import JobMenu from "../component/job/JobMenu";


const JobPage = () => {
    const [jobData, setJobData] = useState({
        dtoList: [],
        totalPage: 0,
        page: 0,
        prev: false,
        next: false,
        pageList: [],
    })
    const [currentPage, setCurrentPage] = useState(1);
    const [stypeValue, setStypeValue] = useState('');
    const [rtypeValue, setRtypeValue] = useState('');

    const PageClick = (pageNum: number) => {
        setCurrentPage(pageNum);
    };

    const fetchData = async (stypeValue = '', rtypeValue = '') => {
        try {
            const url = `http://localhost:6600/job/list?page=${currentPage}&stype=${stypeValue}&rtype=${rtypeValue}`
            const response = await axios.get(url);
            setJobData(response.data);
        } catch (error) {
            console.error('공모전 데이터를 불러오는 도중 에러 발생:', error);
        }
    }

    useEffect(() => {
        fetchData(stypeValue, rtypeValue);
    }, [currentPage, stypeValue, rtypeValue]);

    const handleSearch = (stypeValue: string, rtypeValue: string) => {
        setStypeValue(stypeValue);
        setRtypeValue(rtypeValue);
        setCurrentPage(1);  // 검색 시 페이지를 1로 초기화
    };

    return(
        <div className={styles.jobBox}>
            <Header/>
            <Menu/>
            <JobMenu onSearch={handleSearch}/>
            <JobTable jobData={jobData} currentPage={currentPage} onPageClick={PageClick}/>
        </div>
    );
}

export default JobPage;