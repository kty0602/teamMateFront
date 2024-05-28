import Header from "../component/common/Header";
import LoginForm from "../component/login/LoginForm";
import styles from '../css/LoginPage/Login.module.css';

const LoginPage = () => {
    return(
        <div className={styles.loginBox}>
            <Header/>
            <LoginForm/>
        </div>
    );
}

export default LoginPage;