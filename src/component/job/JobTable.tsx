import React from 'react';
import styles from "../../css/job/JobTable.module.css";

interface JobProps {
    jobData: {
        dtoList: {
            idx: number;
            company: string;
            jtitle: string;
            pageLink: string;
            stack: string;
            place: string;
            career: string;
            education: string;
            date: string;
        } [];
        totalPage: number;
        page: number;
        prev: boolean;
        next: boolean;
        pageList: number[];
    };
    currentPage: number;
    onPageClick: (pageNum: number) => void;
}

const JobTable: React.FC<JobProps> = ({ jobData, currentPage, onPageClick }) => {
    const renderPageNumbers = () => {
        const pageNumbers = [];
        const totalPage = jobData.totalPage;
        const startPage = Math.max(1, currentPage - Math.floor(10 / 2));
        const endPage = Math.min(totalPage, startPage + 9);

        // 이전 버튼
        pageNumbers.push(
            <button key="prev" onClick={() => onPageClick(currentPage - 1)} disabled={currentPage === 1}>
                이전
            </button>
        );

        // 페이지 번호 버튼
        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(
                <button
                    key={i}
                    className={i === currentPage ? 'active' : ''}
                    onClick={() => onPageClick(i)}
                >
                    {i}
                </button>
            );
        }

        // 다음 버튼
        pageNumbers.push(
            <button key="next" onClick={() => onPageClick(currentPage + 1)} disabled={currentPage === totalPage}>
                다음
            </button>
        );

        return pageNumbers;
    };

    return (
        <div className={styles.jobMain}>
            <div className={styles.jobTable}>
                {jobData.dtoList.map((item) => (
                    <div key={item.idx} className={styles.box}>
                        <div className={styles.header}>
                            <span className={styles.companyName}>{item.company}</span>
                        </div>
                        <div className={styles.body}>
                            <a href={item.pageLink} target="_blank" rel="noopener noreferrer" className={styles.alink}>
                                <span className={styles.Name}>{item.jtitle}</span>
                            </a>
                            <span className={styles.stackName}>{item.stack}</span>
                        </div>
                        <div className={styles.sub}>
                            <span className={styles.Label}>{item.place}</span>
                            <span className={styles.Label}>{item.career}</span>
                            <span className={styles.Label}>{item.education}</span>
                        </div>
                        <div className={styles.footer}>
                            <a href={item.pageLink} target="_blank" rel="noopener noreferrer" className={styles.alink}>
                                <button className={styles.button}>입사지원</button>
                            </a>
                            <span className={styles.Label}>{item.date}</span>
                        </div>
                    </div>
                ))}
            </div>
            <div className={styles.pagination}>
                {renderPageNumbers()}
            </div>
        </div>
    );
}

export default JobTable;