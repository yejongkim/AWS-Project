# 🛒 YJ Shop - AWS 클라우드 기반 React 쇼핑몰

> **AWS 클라우드 컴퓨팅 과제 1)** GitHub Actions를 활용하여 CI/CD 환경 구축 (실습4)

React로 구현한 쇼핑몰 웹시스템을 GitHub Actions와 AWS S3를 활용해 자동으로 배포하는 프로젝트입니다.

---

## 📖 시스템 소개

`YJ Shop`은 React 18 기반의 SPA(Single Page Application) 쇼핑몰입니다.
사용자가 카테고리별로 상품을 탐색하고, 검색하고, 장바구니에 담아 결제까지 진행할 수 있습니다.
코드를 GitHub `main` 브랜치에 push 하면 GitHub Actions가 자동으로 빌드하여 AWS S3로 배포합니다.

---

## ✨ 주요 기능

| 기능 | 설명 |
| --- | --- |
| 🛍️ **상품 카탈로그** | 8가지 상품을 카드 형태로 진열 (이미지, 가격, 재고 표시) |
| 🔍 **실시간 검색** | 상품명으로 즉시 필터링 |
| 📂 **카테고리 필터** | 전자제품 / 의류 / 주방 / 도서 카테고리별 조회 |
| 🛒 **장바구니** | 담기 / 수량 변경 / 삭제 / 합계 자동 계산 |
| 💳 **결제 시뮬레이션** | 총 결제 금액 확인 후 결제 완료 처리 |
| 📱 **반응형 UI** | 모바일 / 태블릿 / 데스크톱 모두 지원 |
| ⚠️ **재고 부족 경고** | 재고가 10개 미만이면 빨간색으로 강조 |

---

## 🏗️ 프로젝트 구조

```
AWS-Project/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions CI/CD 워크플로우
├── public/
│   └── index.html              # 메인 HTML (브라우저가 읽는 파일)
├── src/
│   ├── App.js                  # 쇼핑몰 메인 컴포넌트
│   ├── App.css                 # 스타일시트
│   └── index.js                # React 엔트리 포인트
├── .gitignore
├── package.json                # 프로젝트 설계도 / 의존성
└── README.md
```

---

## 🛠️ 기술 스택

- **Frontend**: React 18, JavaScript (ES6+), CSS3
- **Build Tool**: Create React App (react-scripts 5.0.1)
- **CI/CD**: GitHub Actions
- **Cloud**: AWS S3 (정적 웹 호스팅), AWS Academy

---

## 🚀 로컬에서 실행하기

```bash
# 1. 의존성 설치
npm install

# 2. 개발 서버 실행
npm start
# → http://localhost:3000 에서 확인

# 3. 프로덕션 빌드
npm run build
```

---

## ⚙️ GitHub Actions CI/CD 환경

### 워크플로우 동작 흐름

```
[개발자] git push origin main
        ↓
[GitHub Actions 트리거]
        ↓
   1. 코드 체크아웃 (actions/checkout@v4)
        ↓
   2. Node.js 18 환경 셋업
        ↓
   3. npm ci (의존성 설치)
        ↓
   4. npm test (테스트 실행)
        ↓
   5. npm run build (프로덕션 빌드)
        ↓
   6. AWS 자격증명 설정
        ↓
   7. aws s3 sync (build → S3 업로드)
        ↓
[AWS S3] 정적 웹사이트 호스팅 → 사용자 접근
```

### GitHub Secrets 설정

`Repository → Settings → Secrets and variables → Actions`에서 아래 값을 등록합니다.
**AWS Academy의 자격증명은 세션마다 갱신되므로 매 실습 시 업데이트해야 합니다.**

| Secret Name | 설명 | 예시 |
| --- | --- | --- |
| `AWS_ACCESS_KEY_ID` | AWS Academy Access Key | `ASIAXXXXXXXXXXXXXXXX` |
| `AWS_SECRET_ACCESS_KEY` | AWS Academy Secret Key | `xxxxxxxxxxxxxxxxxxxxxxxx` |
| `AWS_SESSION_TOKEN` | AWS Academy Session Token (Academy 필수) | `IQoJb3JpZ2lu...` |
| `AWS_REGION` | 배포 리전 | `us-east-1` |
| `S3_BUCKET_NAME` | 배포 대상 S3 버킷 이름 | `yj-shop-bucket` |

> 💡 AWS Academy의 자격증명은 `AWS Details → AWS CLI`에서 확인할 수 있습니다.

---

## ☁️ AWS S3 배포 사전 설정

### 1. S3 버킷 생성
1. AWS S3 콘솔에서 새 버킷 생성 (이름은 전 세계 고유)
2. **Block all public access** 체크 해제
3. **Static website hosting** 활성화
   - Index document: `index.html`
   - Error document: `index.html` (SPA 라우팅 대응)

### 2. 버킷 정책 (Bucket Policy)

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::버킷이름/*"
    }
  ]
}
```

---

# 🌐 배포 URL

> ⚠️ **AWS Academy 세션은 4시간만 유효합니다. 세션 만료 시 URL이 동작하지 않을 수 있습니다.**

---

## 📌 과제 1) GitHub Actions + AWS S3 배포 (실습4)

GitHub Actions를 활용하여 CI/CD 환경을 구축하고, AWS S3에 정적 웹사이트를 자동 배포합니다.

🔗 **S3 배포 URL**: http://mybucket-20263623.s3-website-us-east-1.amazonaws.com

### 과제 1 체크리스트

- [x] 생성형 AI를 활용하여 React로 동작하는 웹시스템 구현 (쇼핑몰)
- [x] GitHub Repository 생성 및 Code push
- [x] GitHub Actions로 CI/CD 환경 구축 (yaml 파일 작성)
- [x] Secret에 AWS Academy 키 작성
- [x] README.md 작성 (시스템 소개, 기능, GitHub Actions 환경, AWS URL, 시연 영상 링크)

🎬 **시연 영상**: `https://youtube.com/watch?v=YOUR_VIDEO_ID` *(영상 업로드 후 링크 교체)*

---

## 📌 과제 2) AWS Amplify 호스팅 (실습5)

과제 1의 GitHub Repository를 AWS Amplify 서비스를 활용하여 호스팅합니다.

🔗 **Amplify 배포 URL**: https://main.d355597970px0t.amplifyapp.com/

### 과제 2 체크리스트

- [x] 과제 1의 GitHub Repository를 AWS Amplify에 연결
- [x] AWS Amplify 서비스를 활용하여 자동 배포 구축
- [x] README.md 추가 작성 (Amplify 배포 URL)

🎬 **시연 영상**: `https://youtube.com/watch?v=YOUR_VIDEO_ID` *(영상 업로드 후 링크 교체)*

---

## 👤 Author

**김예종 (Yejong Gim)**
AWS 클라우드 컴퓨팅 강의 - 과제 1 & 과제 2
