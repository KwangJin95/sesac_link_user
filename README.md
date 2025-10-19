# SeSAC Link User (SeSAC 학생 지원 플랫폼 - 학생용)

## 📌 프로젝트 개요
* **기간** : 2025.03.05 ~ 2025.06.08
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
- 학생용 👉 http://13.236.84.21:8092
- 운영자용 👉 http://13.236.84.21:8091

### 🧪 테스트 계정
- **예비 학생** : pre_user1 ~ pre_user30 / link1! 
- **학생** : ddm_user1 ~ ddm_user30 / link1!
- **SeSAC 회원 정보 가져오기** : sesac_user22, sesac_user52, sesac_user74, sesac_user96 + @sesaclink.kr

### ⚠️ 참고사항
- 계정 이메일은 아이디@sesaclink.kr 입니다.
- 이메일 인증 코드(6자리)는 테스트를 위해 alert 창으로도 제공됩니다.
- SeSAC 회원 정보 가져오기로 회원가입할 경우 해당 캠퍼스와 학생 권한으로 가입됩니다. 
- 예약 내역은 6~7월 데이터 참고 바랍니다.

---

## 🎥 서비스 미리보기

### 👋 메인 페이지 & 로그인

![Image](https://github.com/user-attachments/assets/07602079-630b-40b5-b185-e745605f4b47)


### 👤 마이페이지

- **계정 관리**

![Image](https://github.com/user-attachments/assets/02015758-2fbe-427e-bb8f-d0a1bfd4a1aa)


- **예약 관리**

![Image](https://github.com/user-attachments/assets/49e569bb-eed0-49fa-9ed0-108b427ede38)


### 📅 예약
- **공간 예약**

![Image](https://github.com/user-attachments/assets/8b452cfb-6767-4063-889f-8e7f479d4b9a)

  
- **상담 예약**

![Image](https://github.com/user-attachments/assets/428237d4-3f4a-4fb6-aac2-03e3bbebacab)


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
- **👤 마이페이지** : 계정 정보 관리 및 예약 관리

### - 예정 기능
- **📢 공지사항** : 캠퍼스별 공지사항 조회
- **❓ QnA** : 운영자와의 질의응답
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
| 계정 정보 조회 & 수정 | ✅ | ✅ |
| 계정 탈퇴 | ✅ | ✅ |

### 🏢 공간 예약

| 기능 | PRE_USER | USER |
|------|----------|------|
| 예약 등록 | ❌ | ✅ |
| 내 예약 목록 조회 (날짜/예약 상태별 필터링) | ❌ | ✅ |
| 내 예약 정보 상세 조회 | ❌ | ✅ |
| 예약 취소 | ❌ | ✅ |

### 📅 상담 예약

| 기능 | PRE_USER | USER |
|------|----------|------|
| 예약 등록 | ❌ | ✅ |
| 내 예약 목록 조회 (날짜/예약 상태별 필터링) | ❌ | ✅ |
| 내 예약 정보 상세 조회 | ❌ | ✅ |
| 첨부파일 다운로드 | ❌ | ✅ |
| 첨부파일 수정 | ❌ | ✅ |
| 예약 취소 | ❌ | ✅ |

---

## ⚙️ 기능 흐름도
> 작성 예정입니다.

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

> 작성 예정입니다.

---

## 📚 API 문서

- 👉 [Notion에서 보기](https://www.notion.so/215798a6acd780dcac1ef28a6c21be15?v=215798a6acd78177b990000c99e62dfa&source=copy_link)

---

## 📦 패키지 구조

### 📁 전체 구조 개요

```
src/main/java/kr/sesaclink/
├── domain/                            # 도메인별 비즈니스 로직
├── global/                            # 전역 설정 및 공통 기능
└── SesacLinkUserApplication.java
```

### 🏗️ 아키텍처 패턴

본 프로젝트는 **Domain-Driven Design (DDD)** 와 **레이어드 아키텍처**를 기반으로 구성되어 있습니다.

### 레이어 구조
- **Controller Layer** : HTTP 요청 처리 및 응답
- **Service Layer** : 비즈니스 로직 처리
- **Repository Layer** : 데이터 액세스
- **Entity Layer** : 엔터티

### 📂 도메인별 구조

#### 1. Campus (캠퍼스)
```
campus/
├── entity/         
└── repository/     
```

#### 2. Course (강좌)
```
course/
├── controller/               
├── dto/                    # 강좌 관련 DTO
│
├── entity/                   
│   ├── Course.java         # 강좌 정보
│   └── UserCourse.java     # 학생-강좌 매핑
│
├── repository/               
└── service/                  
```

#### 3. Member (회원)
```
member/
├── controller/
│   ├── MemberController.java          # 회원 공통
│   ├── MyMemberController.java        # 마이페이지
│   ├── MemberApiController.java       # 회원 API
│   └── EmailApiController.java        # 이메일 API
│
├── dto/                               # 회원 관련 DTO
│
├── entity/                          
│   ├── MemberStatus.java              # 회원 상태
│   ├── AdminAuth.java                 # 운영자 권한
│   ├── AdminMember.java               # 운영자 회원 정보
│   ├── UserAuth.java                  # 학생 권한
│   └── UserMember.java                # 학생 회원 정보
│
├── repository/                      
└── service/                         
```

#### 4. Reservation (예약)
```
reservation/
├── controller/
│   ├── SpaceApiController.java                 # 공간 API
│   ├── SpaceReservationController.java         # 공간 예약
│   ├── SpaceReservationApiController.java      # 공간 예약 API
│   ├── AdviceReservationController.java        # 상담 예약
│   ├── AdviceReservationApiController.java     # 상담 예약 API
│   └── MyReservationController.java            # 내 예약 관리
│
├── dto/                                        # 예약 관련 DTO
│
├── entity/
│   ├── SpaceStatus.java                        # 공간 상태
│   ├── Space.java                              # 공간 정보
│   ├── ReservationStatus.java                  # 예약 상태
│   ├── SpaceReservation.java                   # 공간 예약 정보
│   └── AdviceReservation.java                  # 상담 예약 정보
│
├── repository/
└── service/
```

#### 5. 기타 도메인들
- **Sesac** : SeSAC 학생, 학생-강좌 매핑
- **Notice** : 공지사항
- **Notification** : 알림
- **QnA** : QnA

### 🌍 Global 패키지

```
global/
├── config/                      # 설정 클래스들
│   ├── RootConfig.java          # 루트 설정
│   ├── S3Config.java            # AWS S3 설정
│   └── WebConfig.java           # 웹 설정
│
├── dto/                         # 공통 DTO
│   └── PageResponseDTO.java     # 페이징 응답
│
├── entity/                      # 공통 엔터티
│   └── BaseEntity.java          # 기본 엔터티 (생성일/수정일)
│
├── exception/                   # 예외 처리 핸들러
├── security/                    # 보안 설정 관련 클래스들
├── service/                     # 공통 서비스 (메시지 등)
│
└── util/                        # 유틸리티 클래스
    ├── CustomFileUtil.java      # 파일 처리
    └── S3Util.java              # S3 유틸리티
```

### 📁 Resources 구조

```
resources/
├── application*.properties    # 환경별 설정 파일
├── logger/                    # 로그 설정 파일
├── messages/                  # 응답 메시지 설정 파일
│
├── static/                    # 정적 리소스
│   ├── images/                # 이미지 파일들(배너 등)
│   │
│   └── js/                    # JavaScript 파일들
│       ├── domain/            # 도메인별 JS
│       └── global/            # 공통 JS
│
└── templates/                 # Thymeleaf 템플릿
    ├── layout/                # 레이아웃 템플릿
    ├── fragment/              # 템플릿 조각
    ├── my/                    # 마이페이지(계정, 예약 관리)
    └── reservation/           # 예약 페이지
```

### 🧪 Test 구조

```
test/java/kr/sesaclink/
├── repository/            # Repository 테스트
└── service/               # Service 테스트
```

---
## 🔧 향후 개선 방향
- **기능 확장**: 공지사항, QnA, 채용정보, 알림 서비스 개발
- **사용자 경험**: UI/UX 개선
- **성능 최적화**: 캐싱 시스템 도입
  
---
