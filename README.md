# 영화 앱 프로젝트

https://shongs27.github.io/GripMovie/

## 폴더구조
```
src
 │ 
 ├── assets 
 │      └── // svg파일등이 모여있는 폴더
 ├── styles 
 │      └── // 스타일 폴더 (ex color.scss)
 ├── commons 
 │      └── // 공통으로 쓰게 된 컴포넌트가 있는 폴더
 ├── components 
 │      └── // 페이지에 사용된 컴포넌트들을 모아놓은 폴더
 ├── pages 
 │      └── // 라우터에 따라 분리된 페이지 컴포넌트가 있는 폴더 
 ├── utils 
 │      └── // 컴포넌트에서 사용하는 유용한 기능을 모아놓은 폴더
 │
 ├── App.js   // 앱 시작 파일
 ├── slice.js // redux의 action, reducer가 있는 파일
 └── store    // 리덕스 저장소
```


## 설계   

리액트의 컴포넌트는 UI를 그려내는데 포인트를 두고, 비즈니스 로직은 가능한 리덕스나 상위의 컴포넌트에서 총괄적으로 처리하려고 했습니다        
<br/>
예를 들어 SearchPage 컴포넌트에서 하위의 SearchBar, Category 컴포넌트의 로직을 처리해서 props로 넘겼습니다  
<br/>
무한 스크롤의 구현을 위해 MovieList 컴포넌트와 MovieItem 컴포넌트의 결합도를 높여서 작성했는데, 이러한 점으로 인해    
후에 즐겨찾기 페이지에서 두 컴포넌트를 활용해 react-beautiful-dnd를 구현하려는데 어려움이 되었습니다  


## 어려웠던 점

1. 설계미스  

검색페이지와 즐겨찾기페이지는 비슷하지만 엄연히 다른 로직을 가지므로 작은 컴포넌트 단위로 쪼개어 함께 처리할 수 있는 문제들을 구분지어 묶어서 해결해 나가야 했는데, 급한대로 구현을 하니 무비 리스트와 아이템의 결합도가 높아졌고, 후에 즐겨찾기페이지를 구현하는데 어려움을 가지게 되었습니다. 그로 인해 라이브러리로 가볍게 적용할 수 있는 드래그 앤 드랍을 구현하지 못했습니다
<br/>
최우선적으로 컴포넌트의 설계가 정밀해야 한다는 점을 느끼고 **작은 컴포넌트 단위에서 공통부분**찾아가면서 설계할 수 있어야 한다는 것과 단순히 라이브러리가 아닌 드래그앤드랍에 도전해봐야 겠다는 생각을 가지게 되었습니다  

2. 무한스크롤   

과제 조건중에 '하단 탭바'를 보고 휴대폰 화면이 적합하다고 생각하여 구현하게 되었는데, 스크롤바가 화면 전체가 아니라 화면 안에서 부분적인 곳에서 이루어지기 때문에 무한스크롤과 맞물려 구현하기가 어려웠던 점이었습니다. 

처음에는 사용자의 스크롤에 의해 발생하는 이벤트를 통해 스크롤API를 가져와서 구현을 하려했는데, 스로틀링 등의 기능으로 보완이 가능하다하더라도 빈번한 액션으로 인한 까다로운 상태관리, 사용자의 컴퓨터환경에 따라 스크롤의 위치 등을 고려하는 점으로 인해서 intersectObserve 하는 API 방법을 찾았고 적용하게 되었습니다   

3. 적용 못한 것    


- 상태관리
Recoil을 이용해 상태관리를 사용했는데, atom만을 이용해서 구현을 하다보니 로직이 지나치게 복잡해지는 일이 생겼습니다. 그렇기에 리덕스로 우선 구현을 해놓고 후에 리팩토링하려 시도했습니다

- 타입스크립트 및 린트
부분적인 eslint를 적용했고, 타입스크립트를 공부하며 시도중입니다
   

## 공부할 점
- [ ] 타입스크립트와 ESlint
- [ ] 드래그앤드랍 직접구현해보기