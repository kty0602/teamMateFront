import React from 'react';
import styles from "../../css/common/MainView.module.css";

const MainView = () => {
    return(
        <div className={styles.CarouselDiv}>
                <div className={styles.card1}>
                    <text className={styles.cardText}>팀 매칭 기능은 필요한 팀원을 <br/>
                        공개적으로 모집하고, 관심 있는 사용자들이 해당 프로젝트에 지원할 수 있도록 하는 서비스입니다.<br/><br/>
                    </text>
                </div>
                <div className={styles.card2}>
                    <text className={styles.cardText}>공모전 기능은 다양한 IT 관련 공모전 정보를 한곳에 모아 제공하는 서비스입니다. 
                        사용자들은 각 공모전의 세부 정보를 확인하고, 관심 있는 공모전에 참가 신청을 할 수 있습니다.
                    </text>
                </div>
                <div className={styles.card3}>
                    <text className={styles.cardText}>채용정보 기능은 다양한 IT 분야의 채용 공고를 한곳에 모아 제공하는 서비스입니다. 
                    사용자들은 각 채용 공고의 세부 정보를 확인하고, 관심 있는 일자리에 지원할 수 있습니다. 
                    </text>
                </div>
                <div className={styles.card4}>
                    <text className={styles.cardText}>사용자들이 자유롭게 의견을 나누고, 질문을 하고, 정보를 공유할 수 있는 공간을 제공합니다. 
                    이 기능을 통해 사용자들은 서로의 경험과 지식을 나누며, 유익한 대화를 이어갈 수 있습니다.
                    </text>
                </div>
        </div>
    );
}

export default MainView;