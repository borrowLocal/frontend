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
├── pages/                       
│   ├── Home.js                  # 홈(메인) 페이지 컴포넌트
│   └── Onboarding.js            # 온보딩(초기 안내) 페이지 컴포넌트
├── styles/                      
│   ├── ItemList.css             # 아이템 리스트 관련 스타일
│   ├── SideModal.css            # 사이드 모달 관련 스타일
│   ├── Home.css                 # 홈 페이지 관련 스타일
│   ├── Sidebar.css              # 사이드바 관련 스타일
│   └── Onboarding.css           # 온보딩 페이지 관련 스타일
├── components/                 
│   ├── ListComponents/          # 리스트(목록) 관련 컴포넌트 폴더
│   ├── MyMenu/                  # 마이페이지, 내 메뉴 관련 컴포넌트 폴더
│   ├── RequestModal/            # 대여 신청, 유저 평가, 유저 신고 모달 컴포넌트 폴더
│   ├── Auth/                    # 로그인, 회원가입, 비밀번호 찾기/재설정 등 인증 관련 컴포넌트 폴더
│   ├── Header.js                # 상단 헤더(네비게이션 바) 컴포넌트
│   ├── SideModal.js             # 사이드 모달 컴포넌트
│   └── Sidebar.js               # 사이드바 컴포넌트
├── App.jsx                      # 전체 앱의 루트 컴포넌트
├── App.css                      # 전체 앱의 전역 스타일 파일
└── index.js                     # React 앱의 진입점(엔트리 포인트)
```

## 구현 화면
#### 홈
![home](https://github.com/user-attachments/assets/d595b5b7-57f9-4006-8c72-0257e6d3d16c)
#### 로그인
![login](https://github.com/user-attachments/assets/71d1537a-bb4c-4233-aedf-5a6dbbd32374)
#### 회원가입
![signup](https://github.com/user-attachments/assets/dbfba1fc-0905-4c6f-b830-ca5e819c83ac)
#### 비밀번호 찾기
![pwresetrequest](https://github.com/user-attachments/assets/6c7dfdb2-a3d5-4e40-b082-0466814cd648)
#### 비밀번호 재설정
![pwreset](https://github.com/user-attachments/assets/89ffa0e5-29c3-46b2-9ac4-c68f8dd368e5)
#### 메뉴
![mypagehome](https://github.com/user-attachments/assets/f6172433-6810-4b27-9649-8cda7b530093)
#### 비밀번호 확인
![pwconfirm](https://github.com/user-attachments/assets/ccf2cfc1-aea7-4622-94e9-35e2cfb37cdb)
#### 회원정보 수정
![accountedit](https://github.com/user-attachments/assets/ffe3598b-5dce-4c03-8d5c-4d1765e0810e)
#### 리뷰 작성
![reviewwirte](https://github.com/user-attachments/assets/14030dda-0530-4076-8807-f12479cce926)
#### 대여 신청 모달
![rentalrequest](https://github.com/user-attachments/assets/d96f0030-f00a-4e7b-9a20-81205f9c3d68)
#### 리뷰 작성 모달
![review](https://github.com/user-attachments/assets/fcf311f6-152e-43a5-bc79-5fd363b66208)
#### 사용자 신고 모달
![report](https://github.com/user-attachments/assets/0a511ed9-8739-4256-8b81-47198f4b5e0b)
