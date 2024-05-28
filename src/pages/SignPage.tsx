import Header from "../component/common/Header";
import SignForm from "../component/sign/SignForm";
import styles from '../css/SignPage/Sign.module.css';

const SignPage = () => {
    return (
        <div className={styles.signBox}>
            <Header/>
            <SignForm/>
        </div>
    );
}

export default SignPage;