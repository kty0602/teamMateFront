import styles from '../../css/common/Header.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/actions/Actions';
import { RootState } from '../../redux/Store';
import { useNavigate, Link } from 'react-router-dom';

const Header = () => {
    const user = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        dispatch(logout()); // logout 액션을 디스패치합니다.
        navigate('/'); // 홈 페이지로 이동합니다.
    };

    return(
        <div>
            <div className={styles.headerBox}>
                <Link to="/">
                    <div className={styles.logo}>Team Mate</div>
                </Link>
                <div className={styles.navLinks}>
                    {user && user.name ? (
                        <>
                            <Link to="/userInfo">
                                <span>{user.name}</span>
                            </Link>
                            <span>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;</span>
                            <Link to="/" onClick={handleLogout}>
                                <span>로그아웃</span>
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link to="/login">
                                <span>로그인</span>
                            </Link>
                            <span>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;</span>
                            <Link to="/sign">
                                <span>회원가입</span>
                            </Link>
                        </>
                    )}
                </div>
            </div>
            <div className={styles.separator}></div>
        </div>
    );
}

export default Header;
