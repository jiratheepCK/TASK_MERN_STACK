# TASK_MERN_STACK

## install lib

`npm i`

## running input commandline

`npm run start`

## running spec test 
1 `cd backend`
2 `npm run test:unit` or `jest`

แนะนำให้รันผ่าน docker-compose เพราะมี nginx คอย reverse proxy ด้วย 

เข้าไป build frontend

`cd frontend`

`npm run build`

`cd..` (พยายามออกมารัน docker-compose ณ ตำแหน่งที่ไฟล์อยู่)

`docker-compose up --build`

ในโปรเจคมี collection ของ postman ที่เซ็ตไว้สามารถใช้งานได้เลย 

- Task.postman_collection.json
- Task [Reverse Proxy].postman_collection.json
