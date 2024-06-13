import styles from "../../../css/community/register/RegisterForm.module.css";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/Store';
import React, { useState } from 'react';
import axios from 'axios';


const RegisterForm = () => {
    const user = useSelector((state: RootState) => state.user);
    const userId = user.idx;
    const navigate = useNavigate();
    

    const [image, setImage] = useState<File | null>(null)
    const [showImages, setShowImages] = useState<string[]>([])
    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('');

    const ImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedImage = e.target.files?.[0];

        if (selectedImage) {
            setImage(selectedImage);

            const reader = new FileReader();
            reader.onload = (event) => {
                if (event.target) {
                    const imageUrl = event.target.result as string;
                    setShowImages((prevImages) => [...prevImages, imageUrl]);
                }
            };
            reader.readAsDataURL(selectedImage);
        }
    };

    const ImageDelete = (idx: number) => {
        setShowImages([
            ...showImages.slice(0, idx),
            ...showImages.slice(idx + 1, showImages.length),
        ])
        setImage(null);
    }

    const Save = async () => {
        let link = '';

        // 이미지가 있을 때만 이미지 업로드 요청
        if (image) {
            const formData = new FormData();
            formData.append('file', image);
    
            try {
                const response = await axios.post('http://localhost:6600/upload', formData);
                link = response.data;
            } catch (error) {
                console.error('이미지 업로드 중 에러 발생:', error);
            }
        }

        // 게시글 등록 요청
        const postData = {
            buser: Number(userId),
            btitle: title, // 입력한 제목 값으로 변경
            bcontent: content, // 입력한 내용 값으로 변경
            bdelete : true,
            link: link,
        };

        if (!title) {
            alert('제목을 입력해주세요.');
            return;
        }
        if (!content) {
            alert('내용을 입력해주세요.');
            return;
        }

        try {
            await axios.post('http://localhost:6600/board/register', postData);
            alert("글이 등록되었습니다.");
            // 요청이 성공적으로 완료되면 '/community'로 이동
            navigate('/community');
        } catch (error) {
            // 요청 실패 시 에러 처리
            console.error('게시글 등록 중 에러 발생:', error);
        }
    };


    return(
        <div className={styles.registerBox}>
            <h1>제목</h1>
            <input 
                className={styles.inputText} 
                placeholder='제목을 입력해주세요.' 
                value={title} 
                onChange={(e) => setTitle(e.target.value)}/>
            <textarea
                className={styles.textArea}
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />
            <input type='file' onChange={ImageChange} style={{marginTop: '20px'}}/>
            <div>
                {showImages.map((src, idx) => (
                    <div key={idx}>
                        <img
                            src={src}
                            alt={`${src}`}
                            style={{ maxWidth: '200px', maxHeight: '200px', marginTop: '10px' }}
                        />
                        <button onClick={() => ImageDelete(idx)}>X</button>
                    </div>
                ))}
            </div>
            <span className={styles.registerButton} onClick={Save}>저장</span>
        </div>
    );
}

export default RegisterForm;