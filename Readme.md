# ReadME

# **Ⅰ. 서비스 소개**

## 1. 서비스 설명

### 개요 📰

- 한줄 소개 : 온택트에 익숙해진 현대인을 위한`웹 화상 게임`서비스
- 서비스 명 :**칩칩포커(ChipChipPoker)**
- 서비스 개발 기간: 2024.01.08 ~ 2024.02.16

### 타겟 🎯

- 새 학기를 맞이한 학생들
- 카드 게임 & 보드 게임을 좋아하는 사람들

## 2. 기획 배경

### 배경 🗺️

우리는 프로젝트나 단체 활동에서 모르는 사람들과 팀을 꾸려 일을 시작할 때 어색함을 느끼곤 합니다.`칩칩포커`는 이러한 어색함이 제대로 해소되지 않고, 프로젝트를 진행했을 때 생기는 문제에 집중했습니다.

이`어색함`은 서로에게 실례가 될까봐 의견을 제시하지 못하거나, 원하지 않는 의견에 어쩔 수 없게 동의하여 프로젝트의 진행 과정과 성과에 불이익을 초래합니다.

반면 적절한`아이스 브레이킹`으로 팀원들간에 친밀감이 있는 상태에서 프로젝트가 진행되면 일의 성과가 더 높고, 의사 결정에 긍정적인 결과가 있다고 합니다.

그래서 우리는 아이스 브레이킹 게임 중 하나로 인디언 포커를 골랐지만, 카드가 필요하고 사람들이 모여서 해야 되는 공간적 제약이 있었습니다.

이를 해결하기 위해 칩칩포커를 기획하게 되었습니다.

### 목적 🥅

- **처음 팀을 이룬 사람들이 효과적으로 아이스브레이킹을 하게 하자**
- **물리적, 공간적 제약 없이 인디언 포커 게임을 즐기게 하자**

### 의의

- 간단한 게임으로 서로를 더 잘 알아가고, 아이스브레이킹의 효과
- 비대면으로 직접 만나지 않고, 카드 없이도 즐길 수 있는 온라인 웹 화상 게임

## 3. 서비스 화면

### 시연 영상

[https://youtu.be/vLpCnBJbCUg](https://youtu.be/vLpCnBJbCUg)

# **Ⅱ. 기술스택**

- 프론트엔드
- 백엔드
- WebRTC
- Openvidu
- Web Socket & STOMP(End Point)
- Face API
- Prometheus & Grafana

## 1. 프론트엔드

### Vue.js 선택 이유

> Vue.js는 오픈 소스 자바스크립트 프론트엔드 프레임워크로, 사용자 인터페이스(UI) 개발에 초첨을 맞춰 복잡하고 동적인 웹 페이지를 쉽게 개발할 수 있는 개발도구 입니다.
>

가벼운 크기와 직관적인 문법으로 인해, SPA 개발에 매우 적합한 프레임워크 입니다.

- SPA란?

  SPA는 Single Page Application(단일 페이지 애플리케이션)을 의미하는데, 페이지 전환 없이 동적으로 콘텐츠를 로드하고 업데이트하는 웹 애플리케이션을 뜻합니다.
  기존의 다중 페이지 애플리케이션은 사용자가 링크를 클릭할 때마다 서버로부터 새로운 페이지를 로드하는 방식이었습니다. 하지만 SPA는 초기에 전체 페이지를 로드하고, 사용자 인터랙션에 따라 필요한 데이터만
  서버로부터 비동기적으로 로드하여 업데이트합니다. 이를 통해 사용자 경험을 향상시키고 애플리케이션의 성능을 개선할 수 있습니다.

Vue.js를 선택한 이유는 다음과 같습니다.

첫째, 가상 DOM(Virtual DOM)을 사용하여 효율적인 렌더링을 구현하고, DOM 조작을 최소화하여 성능을 향상시킵니다.

많은 부분이 동적으로 변경 표시되는 웹페이지 화면의 경우, 직접적으로 브라우저의 DOM을 다시 그리게 되면 성능상의 저하가 일어날 수 있습니다. 가상 DOM(Virtual DOM)을 이용해 메모리 상에서 가상
DOM을 변경하고, 최종 브라우저의 실제 DOM에 변경되는 부분은 이전 DOM 과의 차이가 나는 부분만 계산하여, DOM 변경을 최소화하는 기법을 사용합니다.

둘째, 낮은 러닝 커브입니다.

Vue js의 Template 문법이 기존 html 개발 방식과 유사하여 새로운 SPA 웹 애플리케이션을 도입하고자 하는 기업에 손쉽게 적용이 가능합니다. 팀원들과의 협업을 위해서 낮은 러닝 커브를 가진 프레임워크를
선택했습니다.

## 2. 백엔드

### Spring Boot 선택 이유

> 스프링 부트는 스프링으로 애플리케이션을 만들 때에 필요한 설정을 간편하게 처리해주는 별도의 프레임워크입니다.
>

첫째, 스프링 부트를 사용하면 기존에 어려운 초기 설정에 쏟아야 했을 시간과 노력을 절약하여 비즈니스 로직을 구현하는데에 집중할 수 있습니다.

둘째, 빠르고 간편하게 배포를 진행할 수 있습니다. 기존에는 별도의 외장 웹 서버를 설치해야 했지만, 스프링 부트는 자체적인 웹 서버를 내장하고 있기 때문에 효율적인 개발이 가능합니다.

## 3. WebRTC

### WebRTC란?

![https://github.com/parkjisu6239/2021_Narang/raw/master/README.assets/image-20210828151835934.png](https://github.com/parkjisu6239/2021_Narang/raw/master/README.assets/image-20210828151835934.png)

![https://github.com/parkjisu6239/2021_Narang/raw/master/README.assets/image-20210828152033949.png](https://github.com/parkjisu6239/2021_Narang/raw/master/README.assets/image-20210828152033949.png)

> WebRTC (Web Real-Time Communication)는 웹 브라우저 간에 플러그인의 도움 없이 서로 통신할 수 있도록 설계된 API이다.
>
>
> W3C에서 제시된 초안이며, 음성 통화, 영상 통화, P2P 파일 공유 등으로 활용될 수 있다.
>

### openVidu [🔗](https://openvidu.io/)

![https://github.com/parkjisu6239/2021_Narang/raw/master/README.assets/image-20210828152009951.png](https://github.com/parkjisu6239/2021_Narang/raw/master/README.assets/image-20210828152009951.png)

> OpenVidu is a platform to facilitate the addition of video calls in your web or mobile application. It provides a
> complete stack of technologies very easy to integrate in your application. Our main goal is to allow developers to add
> real-time communications to their apps very fast and with low impact in their code.
>

WebRTC를 보다 간단하게 적용할 수 있고, 다양한 프레임워크와 호환성이 높은 openvidu를 사용하여 프로젝트를 진행했습니다.

Demo Project의 사용 방법은 [openvidu tutorial](https://docs.openvidu.io/en/2.29.0/tutorials/openvidu-hello-world/)
또는[openvidu deployment](https://docs.openvidu.io/en/2.29.0/deployment/ce/on-premises/)에서 확인 가능합니다.

### 적용

`칩칩포커`에서는 화상 통화 및 채팅 기능을 사용하기 위해 openvidu를 사용합니다.

게임방, 대기방, 관전방 컴포넌트에서 openvidu를 사용하여 사용자간의 비디오 스트림을 지원하고, 텍스트 스트리밍을 통해 실시간 영상 통화 및 채팅이 가능합니다.

## 4. Web Socket

### web socket 이란?

![https://github.com/parkjisu6239/2021_Narang/raw/master/README.assets/image-20210828152557863.png](https://github.com/parkjisu6239/2021_Narang/raw/master/README.assets/image-20210828152557863.png)

> 웹소켓(WebSocket)은 하나의 TCP 접속에 전이중 통신 채널을 제공하는 컴퓨터 통신 프로토콜이다.
> 웹소켓 프로토콜은 2011년 IETF에 의해 [RFC 6455](https://datatracker.ietf.org/doc/html/rfc6455)로 표준화되었으며 웹 IDL의 웹소켓 API는 W3C에 의해
> 표준화되고 있다.
[RFC 7936](https://datatracker.ietf.org/doc/html/rfc7936),[RFC 8307](https://datatracker.ietf.org/doc/html/rfc8307),[RFC 8441](https://datatracker.ietf.org/doc/html/rfc8441)
> 로 2018년까지 꾸준히 업데이트되고 있는 기술이다.
>

일반적인`Ajax`통신과 다르게, 특정`end point`를 구독하면 종단지점과 연결된 모든 통신을 수신할 수 있으며, 실시간 소통이 가능합니다. 그래서 실시간 채팅등에 많이 활용되고 있습니다.

### Stomp.js [🔗](https://github.com/stomp-js/stompjs)

> 이 라이브러리를 사용하면 WebSocket을 통해 STOMP 브로커에 연결할 수 있습니다. 이 라이브러리는 모든 현재 프로토콜 변형을 포함하여 완전한 STOMP 사양을 지원합니다. 가장 인기 있는 메시징 브로커는
> 기본적으로 또는 플러그인을 사용하여 WebSocket을 통해 STOMP 및 STOMP를 지원합니다.
>

소켓 통신을 가능케하기 위한 두 번째 라이브러리입니다.`Stomp.js`로 생성된`socket`객체로부터`stompClient`를 생성하고, 연결 및 구독, 전송합니다. 프론트에서 소켓을 통해 전송된 내용은
백엔드에서 동일한 endpoint로 일괄적으로 수신되며, 백엔드에서 이를 다시 프론트로 전달합니다. 채팅 소켓에 경우 추가적인 처리 없이 받은 내용을 그대로 모든 구독자에게 반환하고, 투표등 집계가 필요한 경우에는
백엔드에서 로직을 통한 처리 후에 결과값을 반환합니다.

### 적용

칩칩포커 에서는 채팅과 게임의 실시간 상태 공유 및 진행에 web socket을 사용합니다. 서로 다른 여러개의`endpoint`를 구독하고, 각각의 역할에 맞는 로직을 두어 게임을 진행합니다. 자세한
코드는`backend`폴더 내에`websocket`의 하위 폴더를 확인 할 수 있습니다.

- `dto`에서 주고받는 데이터의 구조를 설정합니다.
- `model` 에서는 서버에서 관리하는 자원의 구조를 설정합니다.
- `controller`는 각`endpoint`와 그에 해당하는 method를 정의합니다.

## 5. API

`칩칩포커`에서는 게임의 재미을 더하고,`칩칩포커`만의 차별점을 갖기 위해 다양한 API를 사용합니다.

### face API [🔗](https://github.com/justadudewhohacks/face-api.js)

> JavaScript face recognition API for the browser and nodejs implemented on top of tensorflow.js core
>

![https://github.com/parkjisu6239/2021_Narang/raw/master/README.assets/57224752-ad3dc080-700a-11e9-85b9-1357b9f9bca4.gif](https://github.com/parkjisu6239/2021_Narang/raw/master/README.assets/57224752-ad3dc080-700a-11e9-85b9-1357b9f9bca4.gif)

칩칩포커 에서는`face api`의 다양한 기능 중 위 이미지에 있는 2가지 기능을 사용합니다.`land mark`와`emotion detection`을 사용합니다. 자세한 내용은 하단의 게임 컨텐츠에서 소개합니다.

# **Ⅲ. 게임 컨텐츠 소개**

## 게임 기본 설명

![image](https://github.com/SuyeonSun/test/assets/77823761/e071de34-8f75-4460-82fa-6c191ba6877a)

![image](https://github.com/SuyeonSun/test/assets/77823761/c1cc3cbc-b48b-47d2-8268-9edff1e099a6)
![image](https://github.com/SuyeonSun/test/assets/77823761/ac09adf1-3753-411e-8994-c66f99794a61)
![image](https://github.com/SuyeonSun/test/assets/77823761/5e0e6359-b10e-43a3-92f5-fc74ace35428)

![image](https://github.com/SuyeonSun/test/assets/77823761/dd48c377-87b9-40e3-8a59-f0ae33dcca0e)

## 특별 기능

### 매칭

- 매칭은 친선모드와 경쟁모드로 나뉘며, 인원수를 선택할 수 있습니다.
- 친선 모드
    - 해당 인원수의 게임방이 존재할 시 그 방으로 즉시 입장하며, 게임방이 존재하지 않는 경우에는 입장이 불가능합니다.
- 경쟁 모드
    - 경쟁 모드 매칭을 통해 게임을 진행하면, 해당 인원이 전부 매칭이 될 때까지 대기하며 매칭이 완료될 시 즉시 게임방으로 이동합니다.
    - 경쟁 모드는 게임 종료 시 코인 개수에 따라, 유저의 포인트를 변화시키며 이를 기반으로 랭킹을 매길 수 있습니다.

### 관전

- 친선 모드의 게임을 관전할 수 있는 기능입니다. 관전을 통해 플레이어들의 카드와 표정을 보며 게임을 즐길 수 있습니다. 또한 관전자들끼리의 채팅도 가능합니다.

### 표정 인식

- 남들이 나의 표정을 보고 패를 가늠하게 하는 인디언 포커의 특성을 살리기 위해, 표정 인식 기능을 넣었습니다. 카메라의 좌측 상단의 이모티콘을 통해 분노, 역겨움, 행복, 슬픔, 놀람, 평온 등 상대의 표정에서
  드러나는 가장 큰 감정이 무엇인지 알 수 있습니다.

# **Ⅳ. 프로젝트 진행**

![image](https://github.com/SuyeonSun/test/assets/77823761/460afdb8-86b3-4505-9707-dfaa94881010)

![image](https://github.com/SuyeonSun/test/assets/77823761/94b9a621-323b-4455-9a92-ed6f1c65ef3f)

- Git
    - Git Flow
        - git flow 사용을 위해`우아한 형제들`의[git flow 사용](https://techblog.woowahan.com/2553/)을 참고했습니다. 각자 맡은 기능에 맞게`feature`브랜치를
          생성하고, 완료된 기능은`develop`에 merge하여 사용했습니다.
        - 충돌 상황을 최소하하기 위해 로컬 저장소에서 `develop` 최신 버전을  `rebase` 옵션으로 `pull` 받고 이후 `develop` 브런치로 `merge` 하는 것을 규칙으로 했습니다.
        - 각 `pull request` 는 다른 파트 팀원에게 리뷰를 받고 공통된 템플릿을 통해 관리했습니다.
        - 각 `pull request` 는 `squash merge` 를 사용하여 각 기능에 대해 커밋을 깔끔하게 관리하고 변경사항에 대한 내용을 빠르게 추적할 수 있도록 했습니다.
        - 각 `pull request` 는 `[프론트or백엔드or] Jira Issue` 와 같이 (변경필요)
    - Commit Convention
        - 또한`commit message`는`tag name: Description`와 같이 통일하여 작성했습니다.

            ```
            feat: 회원 가입 기능 구현
            
            SMS, 이메일 중복확인 API 개발
            
            Refs: #123
            ```

- Jira
    - 에픽, 스토리, 태스크
        - `에픽` 은 큰 기능 혹은 화면단위
        - `스토리` 는 기획, 설계, 디자인과 같은 비 개발작업
        - `태스크`는 에픽보다 작은 개발에 해당하는 모든 작업
    - 이슈 생성 규칙
        - 정형화 된 이슈 생성 규칙을 사용하여 이슈 추적에 원활하게 구성했습니다.
        - EX) 에픽인 경우 : [프론트] 메인페이지 제작 or 스토리 혹은 작업인 경우 : [프론트] 개발 전체 랭킹 리스트 컴포넌트
        - EX) 에픽인 경우 : [백엔드] 게임기능 제작 or 스토리 혹은 작업인 경우 : [백엔드] 개발 배팅기능

        ```
        [프론트/백엔드/데브옵스/기획] (작업이름)
        ```

    - 담당자 및 스토리 포인트 설정
        - 담당자와 스토리 포인트를 설정하고 개발하여 자원 관리 및 추적에 원활하게 구성했습니다.
- Notion
    - 자료 공유 방법

      ![image](https://github.com/SuyeonSun/test/assets/77823761/8755954a-a232-43a5-961c-ff4e84d325e5)

    - 모두가 공유해야할 자료 및 링크는 노션에 정리했습니다. 특히`userflow`나`api 명세`와 같이 여러번 다시 봐야하고 중요한 정보들은 특히 노션에 공유하여 불필요한 커뮤니케이션 리소스를 줄이기 위해
      노력했습니다.
    - 스크럼
        - 매일 아침 각자 할 일과 어제 한일을 공유하는 스크럼을 진행했습니다. 스크럼을 통해 프로젝트의 진행 상황을 파악하고, 발생한 문제를 공유하며 애자일하게 프로젝트를 진행했습니다.
- Figma
    - Figma를 사용하여 화면 설계 진행
      ![image](https://github.com/SuyeonSun/test/assets/77823761/c6b9e542-bb20-40f7-abfb-4507131fbbdb)

    - ERD
      ![image](https://github.com/SuyeonSun/test/assets/77823761/729c7d0f-a406-45c7-a7b8-5d4e383bebc7)

# **Ⅴ. 배포**

상세한 내용은 exec를 참고

서버는 AWS EC2 Ubuntu 22.04 version을 사용했습니다.

- Domain: https://chipchippoker.shop, http://i10a804.p.ssafy.io
- CPU: vCPU 4
- Memory: 16GB
- Disk: 320GB SSD
- Traffic: 6TB
  ![image](https://github.com/SuyeonSun/test/assets/77823761/ca50b238-afe4-4534-bba0-12994e2507ce)

## 1. Docker

- OpenVidu 서버 포트 번호: 5443
- 시그널 서버 포트 번호: 8500
- WAS 포트 번호: 5442
- Prometheus & Grafana 포트 번호: 9090, 3000

서로 다른 이미지로 각각의 컨테이너를 실행하며, 동일 배포 단위는 Docker-compose 기술을 이용하여 다중 컨테이너 관리를 진행합니다.

## 2. DevOps

`Jenkins` 로 CI/CD를 구축하여 `develop` 브랜치에 `push` 이벤트 발생시 `build` 하도록 구성했습니다.

각 `frontend-develop` , `backend-develop` 으로 분리하여 `build` 되도록 구성했습니다.

생성된 `docker` 이미지를 컨테이너 기반으로 실행하도록 했습니다.

`Jenkins`로 CI/CD를 구축하여 develop 브랜치에`push`이벤트 발생시 build하도록 구성했습니다.

build 후 docker-compose를 실행하도록 했습니다.

## 3. How to

### Jenkins

1. Jenkins 관리 > System > Jenkins Location 의 Jenkins URL을 맞게 설정한다.
2. GitLab > (Connection name, GitLab host URL, Credentials) 을 각각 작성한다.

1. 새로운 Item > PipeLine
2. gitlab 소스코드 관리(repository, branch 설정)
3. Build Trigger 설정
4. PipeLine Script 작성

### Gitlab Webhook

1. Jenkins PipeLine > 구성 > Build Triggers > 고급에서 토큰을 발급한다.
2. Gitlab Setting > Webhook > Add new Webhook > Secret Token에 발급받은 토큰을 작성한다.
3. 생성된 Pipeline URL을 Webhook URL로 설정하고 push event를 추가한다.

# **Ⅵ. UI / UX (수정필요)**

## Figma

- **WireFrame**
  ![image](https://github.com/SuyeonSun/test/assets/77823761/8661b086-98c0-4819-8035-c3e1fcbe73c8)
  ![image](https://github.com/SuyeonSun/test/assets/77823761/d7fd3b42-6d69-4fc8-afe4-f7de92e86c3c)
  ![image](https://github.com/SuyeonSun/test/assets/77823761/8a82b8b6-6e6a-4ad4-bb47-94cd8bb28d04)
- **프로토 타입**

## Logic Flow

![Logic Flow](https://github.com/yebin113/django_prac/assets/139421100/9014fcc0-8161-4ad4-ae07-a50d67a1b2e7)

## Design Component

1. 로그인 페이지
2. 메인 페이지
3. 플레이 페이지
4. 나의 프로필

## Assets(Custom)

- **로고**
  ![로고](https://github.com/yebin113/django_prac/assets/139421100/f6f86b02-a4e7-4512-9029-ea93c2482323)

- **카드**
    - 네 개의 카드 세트 , 1~ 10까지의 카드 숫자
    - 예시
    -
  ![카드앞면](https://github.com/yebin113/django_prac/assets/139421100/9609d9b8-1d7b-4030-944f-81f404b71931)

    - 뒷면

      ![카드 뒷면](https://github.com/yebin113/django_prac/assets/139421100/5b9c6fc1-9d7b-4891-a4d0-81330c7dcb4f)

- **코인**
    - 플레이어에 따라 다른 코인 디자인
    - 예시

      ![코인](https://github.com/yebin113/django_prac/assets/139421100/2c7e34d1-8675-499e-a668-c76af324cd4e)

- **티어**
    - 레어, 다이아, 플래티넘, 골드, 실버, 브론즈 등의 티어 디자인
    - 예시
      ![image](https://github.com/SuyeonSun/test/assets/77823761/6b7fa029-16f0-42b6-9e71-56a7360840d8)


- 출처
    - [https://github.com/justadudewhohacks/face-api.js](https://github.com/justadudewhohacks/face-api.js)
    - [https://docs.openvidu.io/en/2.29.0/](https://docs.openvidu.io/en/2.29.0/)