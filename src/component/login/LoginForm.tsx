import styles from '../../css/LoginPage/LoginForm.module.css';
import login from "../../img/login.png";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from '../../redux/Hooks';
import { setName, setRole, setIdx } from '../../redux/actions/Actions';
import React, { useState } from 'react';

const onNaverLogin = () => {
    window.location.href = "http://localhost:6600/oauth2/authorization/naver"
}

const onGoogleLogin = () => {
    window.location.href = "http://localhost:6600/oauth2/authorization/google"
}

const LoginForm = () => {
    const [id, setId] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogin = async () => {
        try {
          const response = await axios.post('http://localhost:6600/login/UserLogin', {
            username: id,
            password: password
          });
      
          if (response.status === 200) {
            const { idx, name, role } = response.data;

            dispatch(setName(name));
            dispatch(setRole(role));
            dispatch(setIdx(BigInt(idx)));

            
            alert(`${response.data.name}님 환영합니다!`);
            navigate('/');
          } else {
            alert('아이디 또는 비밀번호가 잘못되었습니다.');
          }
        } catch (error) {
          console.error('로그인 요청 중 오류 발생:', error);
          alert('로그인 요청 중 오류가 발생했습니다. 다시 시도해 주세요.');
        }
    };

    return(
        <div className={styles.formBox}>
            <text className={styles.loginText}>로그인</text>
            <div className={styles.loginImageWrapper}>
                <img src={login} alt="Login" className={styles.loginImage} />
            </div>
            
                <input
                    type="text"
                    placeholder="아이디"
                    className={styles.idInput}
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="비밀번호"
                    className={styles.pwInput}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit" className={styles.loginButton} onClick={handleLogin}>로그인</button>
            
            <text className={styles.socialText}>소셜 계정으로 간편 로그인</text>
            <div className={styles.socialButtonWrapper}>
                <button onClick={onGoogleLogin} className={styles.googleButton}></button>
                <button onClick={onNaverLogin} className={styles.naverButton}></button>
            </div>
        </div>
    );
}

export default LoginForm;