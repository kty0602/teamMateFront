import styles from "../../css/community/BoardTable.module.css";
import React from 'react';
import { Link } from 'react-router-dom';

interface BoardProps {
    boardData: {
        dtoList: {
            idx: number;
            btitle: string;
            bnickname: string;
            regDate: string;
            replyCount: number;
        }[];
        totalPage: number;
        page: number;
        prev: boolean;
        next: boolean;
        pageList: number[];
    };
    currentPage: number; // 추가: 현재 페이지 상태
    onPageClick: (pageNum: number) => void;
}

const BoardTable: React.FC<BoardProps> = ({boardData, currentPage, onPageClick}) => {
    return(
        <div className={styles.boardMain}>
            <div className={styles.boardHeader}>
                <p>글 번호</p>
                <p>제목</p>
                <p>작성자</p>
                <p>작성날짜</p>
            </div>
            <div className={styles.boardTable}>
            {boardData.dtoList.map((item, index) => (
                    <div key={item.idx} className={styles.boardRow}>
                        <p>{boardData.dtoList.length - index}</p>
                        <Link to={`/read/${item.idx}`} className={styles.aTitle}>
                            <p>{item.btitle} ... [{item.replyCount}]</p>  
                        </Link>
                        <p>{item.bnickname}</p>
                        <p>{item.regDate}</p>
                    </div>
            ))}
            </div>
            <div className={styles.pagination}>
                {boardData.pageList.map((pageNum) => (
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

export default BoardTable;