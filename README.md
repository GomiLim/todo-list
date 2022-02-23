# Todo List

> 자유롭게 Todo 리스트를 작성해보세요!

> [서비스 바로 가기](https://gomilim.github.io/todo-list/)

<p align='center'>
  <img src='https://user-images.githubusercontent.com/52882286/155250032-b60c7084-4e83-4a05-847d-7b7be7e7a6c4.png' width='400'/>
</p>

### 기술 스택 및 라이브러리

1. React js
2. typescript
3. scss
4. styled-components

### 구현 기능

1. Todo 추가 / 수정 / 삭제 기능
2. Todo 추가 시 태그 설정 기능
3. TODO 완료 여부 Toggle 기능
4. TODO 개수에 따라 완료 미완요 상태를 나타내는 Progress bar 기능 및 완료 미완요 개수 출력 기능
5. 태그 추가 / 수정 / 삭제 기능
6. 로컬 스토리지를 활용하여 Todo와 태그 데이터 영속성 유지
7. 태그를 이용한 필터 기능
8. 입력창에 값을 입력받아 Todo 제목 기준으로 검색 기능
9. 반응형 작업 (최소 해상도 375px)

### 설치 방법

소스 코드 다운로드하여 프로젝트 환경 구성하기

1. github repository 우측 상단의 녹색 버튼을 누른 후 'Download Zip' 버튼을 눌러 코드를 다운 받은 후 원하는 곳에 압축을 해제합니다.
2. `npm install` 터미널에서 해당 명령어를 입력해 필요한 패키지를 인스톨합니다.
3. `npm start` 터미널에 해당 명령어를 입력해 프로젝트를 실행합니다.
4. 프로젝트가 실행되면 [http://localhost:3000](http://localhost:3000) 페이지로 이동합니다.

Git Clone으로 프로젝트 환경 구성하기

1. github repository 우측 상단의 녹색 버튼을 누른 후 'Clone with HTTPS'의 repository 주소를 복사합니다.
2. 원하는 곳에서 터미널에 `git@github.com:GomiLim/todo-list.git` 명령어를 입력해 코드를 내려받습니다.
3. `npm install` 터미널에서 해당 명령어를 입력해 필요한 패키지를 설치합니다.
4. `npm start` 터미널에 해당 명령어를 입력해 프로젝트를 실행합니다.
5. 프로젝트가 실행되면 [http://localhost:3000](http://localhost:3000) 페이지로 이동합니다.

### 사용 방법

<p align='center'>
  <img src='https://user-images.githubusercontent.com/52882286/155249010-a375544a-3d3f-44f5-ab4b-0af8f0082976.gif' width='400'/>
</p>

1. 하단의 +ADD NEW TODO 버튼을 클릭하면 새로운 TODO를 생성합니다.
2. 필수값인 제목을 입력하고 생성하기 버튼을 클릭하면 Todo가 생성됩니다. ( 제목을 입력하지 않으면 TODO를 생성할 수 없습니다. )
3. 새로운 TODO생성시, 설명란 작성과 태그를 생성 / 설정할 수 있습니다.
4. 새로운 TODO생성시, 태그 생성, 수정 삭제를 할 수 있습니다.
5. 태그를 생성할 땐 동일한 이름의 태그는 생성할 수 없으며 Color Picker에서 태그의 색상을 선택해야 합니다.

<p align='center'>
  <img src='https://user-images.githubusercontent.com/52882286/155249134-bd7add9c-471f-49af-984a-ce52b1e2a98f.gif' width='400'/>
</p>

6. TODO에 hover 하여 수정 버튼을 클릭하면 만들어진 TODO는 제목, 내용, 태그를 수정할 수 있습니다.
7. 태그 내용을 변경하면 해당 태그가 전체적으로 업데이트됩니다.

<p align='center'>
  <img src='https://user-images.githubusercontent.com/52882286/155249158-4d0691a4-8d1c-49df-96e1-baed32c86b80.gif' width='400'/>
</p>

6. 태그를 삭제할 시에는 모든 TODO에서 해당 태그가 사라지며 태그로 하는 필터에서도 해당 태그가 삭제됩니다.

<p align='center'>
  <img src='https://user-images.githubusercontent.com/52882286/155249115-c4a9f531-9c6c-4ce1-ae89-7d7dbdb2918a.gif' width='400'/>
</p>

7. TODO에 있는 체크박스로 완료 미완료 토글할 수 있습니다.
8. TODO에 hover하여 삭제 버튼을 클릭하면 해당 TODO를 삭제할 수 있습니다.

<p align='center'>
  <img src='https://user-images.githubusercontent.com/52882286/155249151-dac51b90-de9a-494c-b686-1a2a40e85b6e.gif' width='400'/>
</p>

9. 메인 페이지에서 TAG리스트에 있는 태그를 클릭 시, 해당 태그를 포함한 TODO들이 출력됩니다.
10. 검색창에 값을 입력하면, TODO들의 제목 내에 해당 값이 있는 리스트를 출력합니다.
