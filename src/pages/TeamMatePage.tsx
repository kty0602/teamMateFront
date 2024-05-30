import Header from "../component/common/Header";
import Menu from "../component/common/Menu";
import TeamBox from "../component/team/TeamBox";
import styles from "../css/team/Team.module.css";


const TeamMatePage = () => {
    return(
        <div className={styles.teamBox}>
            <Header/>
            <Menu/>
            <TeamBox/>
        </div>
    );
}

export default TeamMatePage;