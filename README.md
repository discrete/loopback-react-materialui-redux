# My Application

The project is generated by [LoopBack](http://loopback.io).

## Table of Contents

- [TL;DR](#tldr)
- [개발환경](#개발환경)
- [로그인](#로그인)
- [사용자정의](#사용자정의)
- [Material UI](#Material-UI)
- [다국어지원](#i18n)

## tldr

#### 처음사용하는 경우

REST API 서버용 terminal 하나와 frontend 개발을 위한 static contents 서비스용 terminal 하나, 총 2개의 terminal에서 작업

```
$ git clone git@github.com:discrete/loopback-react-materialui-redux.git project_dir
$ cd project_dir
$ cp providers.json.template providers.json
#### THIS IS COMMENT LINE. Change the configuration as you setup in facebook / google
$ yarn install
$ docker-compose up -d
$ yarn start
```
다른 terminal을 하나 더 열어서 frontend 개발용 webpack dev server를 시작한다.
```
$ cd clinet_src
$ yarn install
$ yarn start
```

Browser를 열고 [http://localhost:3000](http://localhost:3000)을 연다. SPA app이 열린다.
http://localhost:3001/explorer loopback REST API explorer를 볼 수 있다.

### 설치가 되어 있는 상태에서 개발을 진행할 경우
```
$ cd project_dir
$ docker-compose start
$ yarn start
```

## 개발환경

* Loopback(backend): port 3001
* React+Redux+React-Router4+Material UI+ redux form(frontend): port 3000
* mongodb(DB): port 27017

loopback의 scaffolding을 이용해서 backend app을 만들고, client_src folder를 추가하고 그 안에서 create-react-app을 이용해서 frontend app을 만든다.

docker-compose를 통해서 mongodb를 container안에서 가동시키기 때문에 시작시에 별도로 준비할 필요없이 docker-compose up 해주면 mongodb를 가져다가 돌리기 시작한다.

Note: 아쉽게도 Windows에서는 Mongodb가 docker로 돌아가지 않는다. Mongodb가 file의 lock을 독점할 수 없는 형태로 Hyper-V와 Host machine이 volume을 공유하기 때문이다. Windows에서는 docker를 사용하지 말고 cloud에서 제공하는 Mongodb as a service하나를 골라서 사용하면 좋다. 운영시에는 문제가 되지 않는다. [MongoDB Atlas](#https://cloud.mongodb.com)


## 로그인

SPA에서 로그인을 유지하는 방법에는 아래와 같이 3가지가 있다.
loopback은 API 지향적이지만, passportjs를 붙여 놓은 [loopback-component-passport](https://loopback.io/doc/en/lb3/Third-party-login-using-Passport.html)가 cookie-based authentication을 사용하도록 강제한다.

* Session-based authentication
* Cookie-based authentication
* Token-based authentication

현재의 구현은 development와 production에서 똑같은 UX를 가지고 개발하기 위해서 development는 create-react-app에서 제공하는 Webpack-dev server의 proxy를 이용해서 /auth를 proxy로 요청한다.

## 사용자정의

운영하고자하는 서비스에서 필요한 사용자 정보를 저장하는 방법은..

## Material UI

React로 뭔가 차별화된 UI를 만들어 간다면 create-react-app이 만들어준 그 상태에서 시작하면 된다. 기본적으로 redux는 있어야 변경 되는 data를 관리할 수 있는 point를 갖게되니까 redux를 붙이고, SPA를 page단위로는 나눠서 작업을 해야 편하니 react-router 써주자, 이왕이면 4 새로 나왔으니까.. 써보니 좋다. 이런거 없이 그냥 SPA 만드는 사람들 존경스럽다. 그 많은 것들을 다 머리에 꾀고

이렇게 붙였는데도 돌려보면 할 수 있는게 `<h2>Root</h2>`, `<h2>Sign In</h2>` 정도라면 힘빠진다. [Material UI](https://material.io/)가 반응형이고 spec이 잘 정의되어 있고, 고객들도 특별히 원하는 디자인이 있지 않을땐 거부감이 없기때문에 Material UI를 사용해 본다.

## 다국어지원

[react-localize-redux](https://github.com/ryandrewjohnson/react-localize-redux)를 이용해서 다국어를 지원하는 기본을 갖춘다. 다국어 리소스가 필요한 페이지에서 messages를 정의하고 render() 안에서 직접 translation을 이용해서 사용하기 때문에 여기 저기 왔다갔다하는 번거로움없이 작업 할 수 있다.

다국어 메세지를 추가하는 방법
- 상단의 messages를 찾아서 지원하려는 언어별 resource를 입력한다. TODO: 영어를 기본으로 하고 한글은 직접 넣더라도 Google translate를 이용해서 번역해서 자동으로 build 할때 넣어주는 것으로 변경해보자.
- 준비된 messages를 store에 보내서 저장해야한다. store.dispatch(addTranslation(messages)); 적당한 위치에서 보내주면 되는데 store를 각 route에서 접근하기 편한곳은 react-redux.connect를 통해서 react component와 redux를 연결하면 react component 안에서 store.dispatch로 props를 통해서 접근이 가능하다. 시점상으로는 componentDidMount()에서 해주면 딱 좋을 것 같다.
- 이제 store 안에 있는 messages를 사용하면 된다. getTranslate()으로 store에 'locale'밑에 저장한 message에 접근 할 수 있는 함수를 translate props로 mapping한다.
- render() 안에서는 translate에 key 값으로 호출하면 현재 언어의 message를 얻을 수 있다. TODO: 다국어가 들어가는 image들도 이런식으로 지원 할 수 있는 library를 만들어보자 Picture는 해상도에 따라서 imageset를 구 할 수 있지만 언어별로 맞출 수 있는 방법이 있는지 확인해보자.

> Note: nested 형태로 data를 갖추더라도 data structure가 tree가 아니고 table로 store에 저장되고 있는데 많아질 경우에 속도가 문제가 된다면 tree구조로 저장하고, 범위를 줄여서 translate에서 찾는다면 속도가 크게 향상될 것이다.

[react-intl](https://github.com/yahoo/react-intl) 단순한 메세지의 출력이 아니라 formatting이 필요한 경우에는 react-intl을 이용해서 더 세련된 formatting을 지원할 수 있다. 날짜, 숫자등을 출력 할 때도 사용할 수 있다.

