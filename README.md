
### blog-app 

backend: node.js koa f/w
dependency
 koa, koa-bodyparser, koa-router
 패스워드 암호화: bcrypt
 JWT: jsonwebkoken   
 https://www.npmjs.com/package/jsonwebtoken
 mac os random hash key 만들기 
 $ openssl rand -hex 64
 콘솔에서 명령어 실행하면 해시 리턴됨 
 


client: react 
리액트를 다루는 기술 final project 

blog-backend
## API List
### POST /posts
포스트 작성
### GET /posts
포스트 목록 조회
### GET /posts/:id
특정 포스트 조회
### DELETE /posts/:id
특정 포스트 삭제
### PATCH /posts/:id
특정 포스트 업데이트(구현 방식에 따라 PUT으로도 사용 가능)
### POST /posts/:id/comments
특정 포스트에 덧글 등록
### GET /posts/:id/comments
특정 포스트의 덧글 목록 조회
### DELETE /posts/:id/comments/:commentId
특정 포스트의 특정 덧글 삭제

__


