import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from 'react-redux';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import SignPage from './pages/SignPage';
import UserInfoPage from './pages/UserInfoPage';
import CommunityPage from './pages/CommunityPage';
import RegisterPage from './pages/community/RegisterPage';
import ReadPage from './pages/community/ReadPage';
import ModifyPage from './pages/community/ModifyPage';
import ReplyModifyPage from './pages/community/ReplyModifyPage';
import TeamMatePage from './pages/TeamMatePage';
import TeamRegisterPage from './pages/teamMate/TeamRegisterPage';
import TeamReadPage from './pages/teamMate/TeamReadPage';
import TeamModifyPage from './pages/teamMate/TeamModifyPage';
import TeamReplyModifyPage from './pages/teamMate/TeamReplyModifyPage';
import ContestPage from './pages/ContestPage';
import JobPage from './pages/JobPage';

import store from './redux/Store';

function App() {
  return (
    <Provider store={store}> {/* Provider로 App 컴포넌트를 감싸고 store prop을 전달 */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage/>} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/sign" element={<SignPage/>} />
          <Route path="/userInfo" element={<UserInfoPage/>} />

          {/* 커뮤니티 페이지 */}
          <Route path="/community" element={<CommunityPage/>} />
          <Route path="/register" element={<RegisterPage/>} />
          <Route path="/read/:idx"  element={<ReadPage/>}/>
          <Route path="/modify/:idx"  element={<ModifyPage/>}/>
          <Route path="/replyModify"  element={<ReplyModifyPage/>}/>
          {/* 커뮤니티 페이지 */}

          {/* 팀 매칭 페이지 */}
          <Route path="/teamMate"  element={<TeamMatePage/>}/>
          <Route path="/teamRegister" element={<TeamRegisterPage/>}/>
          <Route path="/teamRead/:idx" element={<TeamReadPage/>}/>
          <Route path="/teamModify/:idx" element={<TeamModifyPage/>}/>
          <Route path="/teamReplyModify" element={<TeamReplyModifyPage/>}/>
          {/* 팀 매칭 페이지 */}

          {/* 공모전 페이지 */}
          <Route path="/contest" element={<ContestPage/>}/>
          {/* 공모전 페이지 */}

          {/* 취업 페이지 */}
          <Route path="/job" element={<JobPage/>}/>
          {/* 취업 페이지 */}
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
