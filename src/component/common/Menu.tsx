import { Link } from 'react-router-dom';
import styles from '../../css/common/Menu.module.css';

const Menu = () => {
    return(
        <div className="menuArea">
            <nav>
                <ul>
                    <Link to = "/teamMate" className={styles.link}>
                        <span>팀 매칭</span>
                    </Link>
                    <span>|</span>
                    <Link to ="/contest" className={styles.link}>
                        <span>공모전</span>
                    </Link>
                    <span>|</span>
                    <Link to ="/job" className={styles.link}>
                        <span>채용정보</span>
                    </Link>
                    <span>|</span>
                    <Link to = "/community" className={styles.link}>
                        <span>커뮤니티</span>
                    </Link>
                </ul>
            </nav>
        </div>
    );
}

export default Menu;