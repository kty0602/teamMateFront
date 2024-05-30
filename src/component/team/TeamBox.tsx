import styles from "../../css/team/TeamBox.module.css";
import TeamMenu from "./TeamMenu";
import TeamTable from "./TeamTable";

const TeamBox = () => {
    return(
        <div className={styles.teamBox}>
            <TeamMenu/>
            <TeamTable/>
        </div>
    )
};

export default TeamBox;