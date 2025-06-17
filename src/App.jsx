import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Onboarding from './pages/Onboarding';
import ItemList from './components/lists/ItemList';
import ItemDetail from './pages/ItemDetail';
import SideModal from './components/SideModal';
import RequestModal from './components/RequestModal/RequestModal';
import Home from './pages/Home';
import RegisteredItem from './components/MyMenu/RegisteredItem/RegisteredItem';
import ItemRegister from './components/MyMenu/RegisteredItem/ItemRegister';
import RequestItem from './pages/RequestItem';
import Payment from './pages/Payment';
import Favorites from './components/lists/favorites'; 
import './App.css';

function AppRoutes() {
  const location = useLocation();
  const state = location.state;
  const background = state && state.background;

  // 사이드 모달이 필요한 경로 목록
  const modalRoutes = [
    '/login', '/register', '/findPassword', '/resetPW', '/myPage', '/confirmPW', '/editProfile', '/rentalHistory', '/reviewList', '/reviewWrite'
  ];

  // 현재 경로가 모달 경로인지 확인
  const isModal = modalRoutes.includes(location.pathname);

  // 온보딩 페이지인지 확인
  const isOnboarding = location.pathname === '/onboarding' || (!localStorage.getItem('userId'));

  return (
    <>
      <Routes location={background || location}>
        <Route path="/" element={isOnboarding ? <Onboarding /> : <Home />}>
          {!isOnboarding && (
            <>
              <Route index element={<ItemList />} />
              <Route path="item/:id" element={<ItemDetail />} />
              <Route path="registeredItem" element={<RegisteredItem />} />
              <Route path="registeredItem/register" element={<ItemRegister />} />
              <Route path="registeredItem/request" element={<RequestItem />} />
              <Route path="rentalRequest" element={<RequestModal />} />
              <Route path="review" element={<RequestModal />} />
              <Route path="reportUser" element={<RequestModal />} />
              <Route path="favorites" element={<Favorites />} />
            </>
          )}
        </Route>
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/payment" element={<Payment />} />
      </Routes>
      {isModal && <SideModal />}
    </>
  );
}

function App() {
  return (
    <Router>
      <div className="app">
        <AppRoutes />
      </div>
    </Router>
  );
}

export default App;
