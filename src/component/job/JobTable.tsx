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
    currentPage: number; // 추가: 현재 페이지 상태
    onPageClick: (pageNum: number) => void;
}

const JobTable: React.FC<JobProps> = ({jobData, currentPage, onPageClick}) => {
    return(
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
                {jobData.pageList.map((pageNum) => (
                    <button
                        key={pageNum}
                        className={pageNum === currentPage ? 'active' : ''}
                        onClick={() => onPageClick(pageNum)}
                    >
                        {pageNum}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default JobTable;