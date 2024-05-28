import { Link } from 'react-router-dom';
import styles from '../../css/common/Menu.module.css';

const Menu = () => {
    return(
        <div className="menuArea">
            <nav>
                <ul>
                    <span><a className={styles.link}>팀 매칭</a></span>
                    <span>|</span>
                    <span><a className={styles.link}>공모전</a></span>
                    <span>|</span>
                    <span><a className={styles.link}>채용정보</a></span>
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