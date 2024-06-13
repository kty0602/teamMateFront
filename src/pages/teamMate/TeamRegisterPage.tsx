import Header from "../../component/common/Header";
import Menu from "../../component/common/Menu";
import TeamRegisterForm from "../../component/team/register/TeamRegisterForm";
import styles from "../../css/team/register/TeamRegister.module.css"

const TeamRegisterPage = () => {
    return(
        <div className={styles.RegisterBox}>
            <Header/>
            <Menu/>
            <TeamRegisterForm/>
        </div>
    );
}

export default TeamRegisterPage;