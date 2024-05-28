import styles from '../css/mainPage/Main.module.css';
import Header from "../component/common/Header";
import Menu from "../component/common/Menu";
import MainView from '../component/common/MainView';

const MainPage = () => {
    return(
        <div className={styles.mainBox}>
            <Header/>
            <Menu/>
            <MainView/>
        </div>
    );
}

export default MainPage;