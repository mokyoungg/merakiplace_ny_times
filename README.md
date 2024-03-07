# React + TypeScript + Vite
This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

# 프로젝트 실행방법
프로젝트는 Vite + React + Typescript 로 만들어졌습니다.</br>
패키지 관리자로는 yarn 을 사용하였습니다.</br>
패키지 관리자로 yarn 을 사용했기 때문에 먼저, 명령어 ‘yarn’ 으로 패키지를 설치해야합니다.</br>
이후 구동은 명령어 ‘yarn dev’ 를 사용합니다.
```
// 패키지 설치
yarn

// 프로젝트 구동
yarn dev
```

# New York Times API 설명
New York Times API 를 사용하기 위해 API Key 가 필요합니다.</br>
API Key 발급 및 적용없이 프로젝트를 바로 실행할 수 있도록 API Key 는 api/article.ts 파일에서 선언하여 사용하였습니다.</br>
API 호출은 1분당 최대 5회입니다.</br>
5회 이상이 넘어갈 경우 data fetch 에서 에러가 발생합니다.</br>
(에러 발생시 보여지는 UI 는 따로 작업하지 않았습니다.)
