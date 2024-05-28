import styles from '../../css/SignPage/SignForm.module.css';
import { useNavigate } from 'react-router-dom';
import sign from "../../img/sign.png";
import React, { useState } from 'react';
import axios from 'axios';

interface Errors {
    username: boolean;
    password: boolean;
    confirmPassword: boolean;
    nickname: boolean;
}

const SignForm: React.FC = () => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [nickname, setNickname] = useState<string>("");
    const [errors, setErrors] = useState<Errors>({
        username: false,
        password: false,
        confirmPassword: false,
        nickname: false,
    });

    const navigate = useNavigate();

    const handleSubmit = async () => {
        const newErrors: Errors = {
            username: !username,
            password: !password,
            confirmPassword: password !== confirmPassword,
            nickname: !nickname,
        };
        setErrors(newErrors);

        const hasErrors = Object.values(newErrors).some(error => error);

        if (!hasErrors) {
            try {
                const response = await axios.post('http://localhost:6600/register/user', {
                    id: username,
                    password: password,
                    name: nickname
                });

                if (response.data === 'success') {
                    alert('회원가입 성공');
                    navigate('/main');
                } else {
                    alert('아이디가 중복됩니다');
                }
            } catch (error) {
                console.error('Error during registration:', error);
                alert('회원가입 중 오류가 발생했습니다.');
            }
        }
    };

    return(
        <div className={styles.formBox}>
            <text className={styles.signText}>로그인</text>
            <div className={styles.signImageWrapper}>
                <img src={sign} alt="sign" className={styles.signImage} />
            </div>
            <div className={styles.infoBox}>
                <text className={styles.texts}>아이디</text>
                <input
                    type="text"
                    placeholder="아이디"
                    className={styles.inputs}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                {errors.username && <small className={styles.errorMessage}>사용할 아이디를 작성해주세요.</small>}

                <text className={styles.texts}>비밀번호</text>
                <input
                    type="password"
                    placeholder="비밀번호"
                    className={styles.inputs}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {errors.password && <small className={styles.errorMessage}>사용할 비밀번호를 입력해주세요.</small>}

                <text className={styles.texts}>비밀번호 재입력</text>
                <input
                    type="password"
                    placeholder="비밀번호 재입력"
                    className={styles.inputs}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {errors.confirmPassword && <small className={styles.errorMessage}>입력한 비밀번호가 일치하지 않습니다.</small>}

                <text className={styles.texts}>닉네임</text>
                <input
                    type="text"
                    placeholder="닉네임"
                    className={styles.inputs}
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                />
                {errors.nickname && <small className={styles.errorMessage}>사용할 닉네임 or 이름을 작성해주세요.</small>}

                <button className={styles.signButton} onClick={handleSubmit}>회원가입</button>
            </div>
        </div>
    );
}

export default SignForm;