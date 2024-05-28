import styles from "../css/UserInfo/UserInfo.module.css";
import Header from "../component/common/Header";
import Menu from "../component/common/Menu";
import UserInfoBox from "../component/userInfo/UserInfoBox";

const UserInfoPage = () => {
    return(
        <div className={styles.userInfoBox}>
            <Header/>
            <Menu/>
            <UserInfoBox/>
        </div>
    );
}

export default UserInfoPage;