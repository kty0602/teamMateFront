import styles from "../../css/contest/ContestTable.module.css";

interface ContestProps {
    contestData: {
        dtoList: {
            idx: number;
            ctitle: string;
            pageLink: string;
            host: string;
            contestant: number;
            joinDate: string;
            reviewDate: string;
            day: string;
            status: string;
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

const ContestTable: React.FC<ContestProps>  = ({contestData, currentPage, onPageClick}) => {
    return(
        <div className={styles.contestMain}>
            <div className={styles.contestTable}>
                {contestData.dtoList.map((item) => (
                    <div key={item.idx} className={styles.box}>
                        <div className={styles.main}>
                            <a href={item.pageLink} target="_blank" rel="noopener noreferrer" className={styles.title}>
                                {item.ctitle}
                            </a>
                            <div>
                                <span className={styles.Label}>주최: </span> 
                                <span className={styles.Name}>{item.host}</span>
                            </div>
                            <div>
                                <span className={styles.Label}>대상: </span>
                                <span className={styles.Name}>{item.contestant}</span>
                            </div>
                        </div>
                        <div className={styles.date}>
                            <div>
                                <span className={styles.submissionDate1}>접수날짜: </span>
                                <span className={styles.submissionDate2}>{item.joinDate}</span>
                            </div>    
                            <div>
                                <span className={styles.reviewDate1}>심사날짜: </span>
                                <span className={styles.reviewDate2}>{item.reviewDate}</span>
                            </div>
                        </div>
                        <div className={styles.sub}>
                            <span className={styles.dDay}>{item.day}</span>
                            <span className={styles.inProgress}>{item.status}</span>
                        </div>
                    </div>
                ))}
            </div>
            <div className={styles.pagination}>
                {contestData.pageList.map((pageNum) => (
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

export default ContestTable;