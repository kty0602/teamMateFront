import styles from "../../css/community/register/Register.module.css";
import Header from "../../component/common/Header";
import Menu from "../../component/common/Menu";
import RegisterForm from "../../component/community/register/RegisterForm";

const RegisterPage = () => {
    return(
        <div className={styles.registerBox}>
            <Header/>
            <Menu/>
            <RegisterForm/>
        </div>
    );
}

export default RegisterPage;