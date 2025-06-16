# SeSAC Link User (SeSAC 학생 지원 플랫폼 - 학생용)

## 📌 프로젝트 개요
* **기간** : 2025.03.05 ~ 진행중
* **인원** : 1명 (개인 프로젝트)
* **현재 상태** : 예약 시스템 구현 완료
* **소개** :

  **SeSAC LINK**는 청년취업사관학교 **SeSAC**에서 필요한 '공지사항', 'QnA', '상담 및 시설 예약', '채용 정보' 등을 제공하는 **학생 지원 플랫폼**입니다.
  
  기존에는 이러한 서비스들이 **여러 플랫폼에 분산**되어 있어 학생들이 **불편함**을 겪고 있었습니다.
  
  이를 해결하고자, **모든 기능을 하나의 웹 서비스로 통합**한 플랫폼을 개발하게 되었습니다.

  현재는 **시설 및 상담 예약 기능을 중심으로 구현되어 있으며**, 향후 공지사항, QnA, 채용 정보 기능을 순차적으로 추가할 예정입니다.

  본 저장소는 **학생용** 시스템으로, 운영자용 서비스와 **분리**되어 운영됩니다.

---

## 🚀 배포 링크
- 학생용 👉 http://13.236.117.196:8092
- 운영자용 👉 http://13.236.117.196:8091

### 🧪 테스트 계정
- **학생** : ddm_user1 ~ ddm_user30 / link1!

### ⚠️ 참고사항

---

## 🎥 서비스 미리보기

### 📅 예약
- **공간 예약**

  
- **상담 예약**

---

## 🛠️ 기술스택

| 영역 | 기술 |
|------|------|
| **Backend** | Java 17, Spring Boot, Spring Security, Spring Data JPA, QueryDSL |
| **Frontend** | Thymeleaf, HTML5, CSS3, JavaScript, Tailwind CSS |
| **Database** | AWS RDS (MySQL) |
| **DevOps** | AWS EC2, S3, Git, GitHub |
| **Logging** | Log4j2 (레벨별/날짜별 파일 저장) |

---

## 🎯 주요 기능

### - 핵심 기능 (구현 완료)

- **🏢 공간 예약** : 회의실 등 공간 예약 서비스
- **📅 상담 예약** : 잡코디네이터 상담 예약 서비스
- **👤 마이페이지** : 계정 정보 관리 및 예약 내역 조회

### - 예정 기능
- **📢 공지사항** : 캠퍼스별 공지사항 조회
- **❓ QnA** : 운영진과의 질의응답
- **💼 채용 정보** : 맞춤형 채용 정보 조회
- **📢 알림 서비스**: 예약 확인, 공지사항 등 실시간 알림(SSE 활용)

---

## 🏗️ 시스템 아키텍처

<img src="https://github.com/user-attachments/assets/fb693ee3-db66-45d8-9791-924b6a945783" alt="system_architecture" width="700"/>

- EC2 인스턴스 : `nohup java -Xms128m -Xmx256m -jar .jar > /dev/null 2>&1 &`로 실행
- 포트 구성 : 8091(운영자) / 8092(학생)
- 데이터베이스 : RDS MySQL (3306 포트)
- 파일 저장소 : S3 정적 파일 로드
  
---

## 📐 ERD

- 👉 [ERD Cloud에서 보기](https://www.erdcloud.com/d/oWYh4L629Kzbut6Ei)

<img src="https://github.com/user-attachments/assets/5e5ef095-17f0-48cd-9201-a9eeebd7f596" alt="ERD" width="700"/>

---

## ✨ 권한별 기능 정리

### 📝 권한
<table>
 <tr>
  <th>구분</th>
  <th>권한</th>
  <th>설명</th>
 </tr>
 <tr>
  <th rowspan="2">학생</th>
  <td text-align="left"><b>PRE_USER</b></td>
  <td>예비 학생 (소속 캠퍼스 X)</td>
 </tr>
 <tr>
  <td text-align="left"><b>USER</b></td>
  <td>학생</td>
 </tr>
</table>

### 🔓 비로그인 사용자

| 기능 |
|------|
| 회원가입(이메일 인증) |
| 아이디 찾기 |
| 비밀번호 재설정(이메일 인증) |
| 로그인 |

### 👤 계정 관리

| 기능 | PRE_USER | USER |
|------|----------|------|
| 개인정보 조회 & 수정 | ✅ | ✅ |
| 비밀번호 변경 | ✅ | ✅ |
| 회원 탈퇴 | ✅ | ✅ |

### 🏢 시설 예약

| 기능 | PRE_USER | USER |
|------|----------|------|
| 예약 가능한 시설 조회 | ❌ | ✅ |
| 시설 예약하기 | ❌ | ✅ |
| 내 예약 현황 조회 | ❌ | ✅ |
| 예약 취소 | ❌ | ✅ |

### 📅 상담 예약

| 기능 | PRE_USER | USER |
|------|----------|------|
| 잡코디네이터 조회 | ❌ | ✅ |
| 상담 예약하기 | ❌ | ✅ |
| 내 상담 예약 현황 조회 | ❌ | ✅ |
| 상담 예약 취소 | ❌ | ✅ |


---

## ⚙️ 기능 흐름도
> 추후 업데이트 예정입니다.

---

## 📋 로깅 전략

### - 환경별 로그 레벨 설정
| 구분 | 개발 환경 | 운영 환경 |
|------|-----------|-----------|
| **애플리케이션 로그** (`kr.sesaclink`) | `DEBUG` | `INFO` |
| **시스템 로그** (Root Logger) | `INFO` | `WARN` |
| **Hibernate SQL** | `DEBUG` | `OFF` |
| **Spring Security** | `DEBUG` | `WARN` |
| **Spring Framework** | `INFO` | `WARN` |

### - 로그 파일 구조
```
logs/
├── spring-info.log                   # 시스템 INFO 이상 로그 (운영 환경)
├── spring-warn.log                   # 시스템 WARN 이상 로그 (개발 환경)
├── debug/
│   └── spring-app-debug.log          # 애플리케이션 DEBUG 로그
├── info/
│   └── spring-app-info.log           # 애플리케이션 INFO 로그
├── warn/
│   └── spring-app-warn.log           # 애플리케이션 WARN 로그
└── error/
    └── spring-app-error.log          # 애플리케이션 ERROR 로그
```

### - 주요 특징
- **환경별 차등 로깅** : 개발 환경에서는 상세한 디버깅 정보, 운영 환경에서는 필수 정보만 기록
- **일별 로그 롤링** : 매일 자정에 로그 파일 분할 및 GZ 압축 저장
- **레벨별 파일 분리** : DEBUG, INFO, WARN, ERROR 각각 별도 파일로 관리
- **SQL 로그 제어** : 개발 시에만 Hibernate SQL 쿼리 로그 활성화
- **성능 최적화** : 운영 환경에서 불필요한 로그 비활성화로 성능 향상

---

## 📱 화면 및 설명

<table>
  <tr>
    <th>기능</th>
    <th>화면</th>
  </tr>
  <tr>
    <td><b>채널</b></td>
    <td width="85%"><img src="https://github.com/user-attachments/assets/66147753-aab9-46f4-b5f3-b9f5013285a0"></td>
  </tr>
</table>

 - 채널 프로필 사진 또는 이름 클릭 시 이동되는 페이지
 - 내 채널인 경우 프로필 사진 클릭 시 비밀번호 확인 및 회원 정보 수정 페이지로 이동
 - 채널 자세히 알아보기 클릭 시 채널 세부 정보 창을 띄워 채널 URL, 구독자 수, 동영상 개수, 조회수, 가입일 등의 정보 조회 가능
 - 동영상 관리 버튼 클릭 시 채널 콘텐츠 화면으로 이동
 - 만들기 버튼 클릭 시 동영상 업로드 창을 띄움
 - 동영상 섬네일 또는 제목 클릭 시 해당 동영상 시청 페이지로 이동

---

## 📚 API 문서

- 👉 [Notion에서 보기](https://www.notion.so/210798a6acd780b8b9cae037d15ae62f?v=210798a6acd78082853f000cde73220b&source=copy_link)

---

## 📁 패키지 구조

```
pom.xml
fakeTube.sql                            : DB 관련 SQL문 작성 파일
└─src
     └─main
         ├─java
         │   └─com
         │       └─spring
         │           └─ft
         │               ├─comments     : 댓글 service 인터페이스 및 댓글 VO 클래스
         │               │   └─impl     : 댓글 service 구현 클래스 및 댓글 DAO 클래스
         │               ├─common       : 페이징 클래스
         │               ├─likes        : 좋아요 service 인터페이스 및 좋아요 VO 클래스
         │               │   └─impl     : 좋아요 service 구현 클래스 및 좋아요 DAO 클래스
         │               ├─members      : 회원, 이메일 인증 service 인터페이스 및 회원, 구독 VO 클래스
         │               │   └─impl     : 회원 service 구현 클래스 및 회원 DAO 클래스
         │               ├─qna          : 문의 service 인터페이스 및 문의, 페이징 VO 클래스
         │               │   └─impl     : 문의 service 구현 클래스 및 문의 DAO 클래스
         │               ├─sub          : 구독 service 인터페이스 및 구독 VO 클래스
         │               │   └─impl     : 구독 service 구현 클래스 및 구독 DAO 클래스
         │               ├─video        : 동영상 service 인터페이스 및 동영상, 채널 VO 클래스
         │               │   └─impl     : 동영상 service 구현 클래스 및 동영상 DAO 클래스
         │               └─view         : controller
         │                   ├─comments
         │                   ├─likes
         │                   ├─members
         │                   ├─myChannel
         │                   ├─qna
         │                   └─video
         │                           
         ├─resources
         │   │   applicationContext.xml : root 컨테이너 설정 파일
         │   │   log4j.xml              : log4j 설정 파일
         │   │   mybatis-config.xml     : mybatis 설정 파일
         │   └─mappings                 : mybatis mapper 파일
         │       ├─comments   
         │       ├─likes
         │       ├─members
         │       ├─qna
         │       ├─sub
         │       └─video
         │               
         └─webapp                       : 각종 jsp 파일
             ├─common                   : 각종 jsp 파일
             ├─iconImage                : 아이콘 이미지 파일
             ├─profileImage             : 계정 이미지 파일
             ├─resources
             │   ├─css                  : css 파일
             │   └─images
             │       ├─icon             : 아이콘 이미지 파일
             │       └─members          : 기본 계정 이미지 파일
             ├─thumimgs                 : 동영상 섬네일 이미지 파일
             ├─videos                   : 동영상 파일
             └─WEB-INF
                 │   web.xml
                 ├─config               : servlet 컨테이너 설정 파일
                 ├─jsp                  : 각종 jsp 파일
                 │   ├─comments
                 │   ├─frame
                 │   ├─member
                 │   ├─myChannel
                 │   ├─qna
                 │   └─video
                 └─views                : 각종 jsp 파일

```

---
## 🔧 향후 개선 방향
- **기능 확장**: 공지사항, QnA, 채용정보, 알림 서비스 개발
- **사용자 경험**: UI/UX 개선
- **성능 최적화**: 캐싱 시스템 도입
  
---
