# Borolo Frontend
- Borolo 프로젝트의 프론트엔드 실행 방법, 폴더 구조, 구현 화면을 정리한 문서입니다.
  
## 프로젝트 실행 방법
- Node.js와 npm이 설치되어 있어야 실행 가능합니다.

### 1. 저장소 클론

```bash
git clone https://github.com/borrowLocal/frontend.git
cd frontend
```

### 2. 의존성 설치
프로젝트 루트 디렉토리에서 다음 명령어로 필요한 패키지를 설치합니다.

```bash
npm install
```

### 3. 개발 서버 실행
아래 명령어로 개발 서버를 실행할 수 있습니다.

```bash
npm start
```

### 4. 브라우저에서 확인
개발 서버가 실행되면, 브라우저에서 아래 주소로 접속하여 프로젝트를 확인할 수 있습니다.

```
http://localhost:3000
```

## 프로젝트 구조 
```
src/
├── assets/                    # 이미지 파일들
│   ├── herolmg.png
│   └── profile.jpg
│
├── components/                # 공통 컴포넌트 모음
│   ├── Auth/                  # 회원가입/로그인/비밀번호 관련 컴포넌트
│   │   ├── ConfirmPW.js          # 비밀번호 확인용(회원 정보 수정 전에 비밀번호 재입력 요구)
│   │   ├── EditProfile.js        # 프로필 수정 페이지용 컴포넌트
│   │   ├── FindPassword.js       # 이메일 입력 후 인증코드 받는 페이지
│   │   ├── Login.js              # 로그인 폼 UI 및 API 연동
│   │   ├── Register.js           # 회원가입 폼 UI 및 입력값 처리
│   │   ├── ResetPW.js            # 인증코드 확인 후 비밀번호 재설정 폼
│   │   └── Auth.css              # 위 인증 페이지들의 공통 스타일
│   │
│   ├── cards/                 # 카드 형태의 UI 컴포넌트들
│   │   ├── styles/            # 각 카드별 CSS 파일이 담긴 폴더
│   │   ├── ItemDetailCard.js        # 물품 상세정보 카드
│   │   ├── ProfileCard.js           # 유저 프로필 카드
│   │   ├── RegisteredItemCard.js    # 내가 등록한 물품 카드
│   │   ├── RentalItemCard.js        # 내가 대여 중인 물품 카드
│   │   ├── RequestItemCard.js       # 대여 요청 받은 물품 카드
│   │   └── ReviewCard.js            # 리뷰 정보 카드
│   │
│   ├── lists/                 # 카드들의 리스트 컴포넌트
│   │   ├── favorites.js             # 찜한 물품 목록
│   │   ├── ItemList.js              # 전체 물품 리스트
│   │   ├── RegisteredItemList.js    # 등록한 물품들 목록
│   │   ├── RentalItemList.js        # 대여 중인 물품들 목록
│   │   └── ReviewCardList.js        # 리뷰 카드들 목록
│   │
│   ├── MyMenu/                # 마이페이지 관련 기능 UI 모음
│   │   ├── RegisteredItem/
│   │   │   ├── ItemRegister.js      # 물품 등록 폼
│   │   │   ├── RegisteredItem.js    # 내가 등록한 물품 목록 출력
│   │   │   ├── ItemRegister.css
│   │   │   └── RegisteredItem.css
│   │   ├── RentalHistory/
│   │   │   ├── RentalHistory.js     # 대여 기록 확인 컴포넌트
│   │   │   └── RentalHistory.css
│   │   ├── ReviewList/
│   │   │   ├── ReviewList.js        # 내가 작성한 리뷰 리스트
│   │   │   └── ReviewList.css
│   │   ├── MyPage.js                # 마이페이지 메인 화면
│   │   └── MyPage.css
│   │
│   ├── RequestModal/          # 모달 관련 UI
│   │   ├── RentalRequest.js      # 대여 요청 폼
│   │   ├── ReportUser.js         # 사용자 신고 폼
│   │   ├── RequestModal.js       # 모달의 기본 레이아웃 및 상태 관리
│   │   └── RequestModal.css      # 모달 관련 스타일
│   │
│   ├── Header.js              # 상단 바
│   ├── Sidebar.js             # 좌측 메뉴(위치 설정, 카테고리)
│   └── SideModal.js           # 우측에서 나오는 모달
│
├── hooks/                     # 커스텀 훅
│   ├── useCityName.js             # 현재 위치를 기반으로 도시명 추출
│   └── useGeoLocation.js          # 브라우저 위치 정보 수집 기능
│
├── pages/                     # 각 라우트 화면
│   ├── Home.js                    # 메인 홈 화면
│   ├── ItemDetail.js              # 물품 상세 페이지
│   ├── Onboarding.js              # 첫 접속 시 유저 온보딩 화면
│   ├── Payment.js                 # 결제 페이지
│   └── RequestItem.js             # 물품 대여 요청 처리 페이지
│
├── styles/                    # 화면 전체 또는 특정 페이지 단위의 스타일 파일들
│   ├── App.css                    # 전체 앱 공통 스타일
│   ├── Home.css  
│   ├── ItemDetail.css  
│   ├── ItemList.css  
│   ├── Onboarding.css       
│   ├── Payment.css        
│   ├── RequestItem.css
│   ├── Sidebar.css
│   └── SideModal.css 
│
├── App.jsx                    # 루트 컴포넌트
└── index.js                   # 진입점
```

## 구현 화면
#### 온보딩
![onboarding](https://github.com/user-attachments/assets/50d9c3a8-09b6-4e8f-bec1-21ba6b3e7195)

#### 로그인
![login](https://github.com/user-attachments/assets/9fe2979d-0cce-4991-9e5e-12c09cd67bc0)

#### 비밀번호 찾기
![pwresetrequest](https://github.com/user-attachments/assets/643e00b2-7544-4a64-b8d3-c86deeb55912)

#### 비밀번호 재설정
![pwreset](https://github.com/user-attachments/assets/9082a676-65ea-443e-b03d-ddbbb1089752)

#### 회원가입
![signup](https://github.com/user-attachments/assets/1db1b9c7-d016-4d53-b2f0-8fb85688f2e8)

#### 홈
![home](https://github.com/user-attachments/assets/abccd31c-79af-4840-a4c4-5ff8bba864fe)

#### 물품 정보 상세 조회
![itemDetail](https://github.com/user-attachments/assets/ddb47c09-98d1-4a96-948e-8b3d58ef6c30)

#### 대여 신청 모달
![requestItem](https://github.com/user-attachments/assets/d56a50cc-b1bb-4cf5-bca0-4ec1af7d679a)


#### 메뉴
![mypagehome](https://github.com/user-attachments/assets/c0c7840b-cf08-46b7-8e7c-f9cc331ed5c3)

#### 비밀번호 확인
![pwconfirm](https://github.com/user-attachments/assets/885778de-99d7-4c59-a98c-e4fad03b8f38)

#### 회원정보 수정
![accountedit](https://github.com/user-attachments/assets/64e7aa8d-b179-4a02-a5d7-7ca326440288)

#### 대여내역 조회
![rental](https://github.com/user-attachments/assets/a062eedc-43e9-4e0b-8807-2ba370268c7d)

#### 결제
![payment](https://github.com/user-attachments/assets/04e1f61e-9279-407e-827d-4ead35caecc9)

#### 리뷰 작성
![reviewwirte](https://github.com/user-attachments/assets/909a8166-c84b-4779-80f9-6e3f07962b51)

#### 거래 후기 조회
![reviewList1](https://github.com/user-attachments/assets/269375e1-4ca7-41fc-9821-de8525dd38fe)
![reviewList2](https://github.com/user-attachments/assets/84e3592f-c5f6-4812-b373-d7680b557e84)

#### 등록 물품 조회
![registered](https://github.com/user-attachments/assets/22791062-64ad-4969-989f-20f5dbbd6fc0)

#### 물품 등록
![register](https://github.com/user-attachments/assets/37b1fe9a-3441-43f2-9dac-aab2a87e35fa)

#### 대여 요청 목록
![rentalreq](https://github.com/user-attachments/assets/57696612-ae86-4d26-8035-586d67173c64)

#### 리뷰 작성 모달
![review](https://github.com/user-attachments/assets/f0084f57-0c69-403f-a1e1-3a44af7f4745)

#### 사용자 신고 모달
![report](https://github.com/user-attachments/assets/e5ce4cd2-1623-4e91-a090-3f1d7a4175da)
