import { v4 as uuidv4 } from 'uuid';
import { handleConnection, handleDisconnect, hanlderEvent } from "./helper.js";
import { addUser } from "../models/user.model.js";

// io.on은 Socket.IO 서버에서 전체 연결에 대한 이벤트를 처리할 때 사용
// socket.on은 개별 소켓에서 특정 이벤트를 처리할 때 사용

const registerHandler = (io) => {
    io.on('connection', (socket) => {
        // 최초 커넥션을 맺은 이후 발생하는 각종 이벤트를 처리하는 곳
        // const userUUID = '1234';
        // 유저 처음 등록 시점
        const userUUID = uuidv4();
        addUser({uuid: userUUID, socketId: socket.id});

        // 
        handleConnection(socket, userUUID);


        // 이벤트 처리하는 메서드 추가
        socket.on('event', (data) => hanlderEvent(io, socket, data));
        // 접속 해제시 이벤트
        socket.on('disconnect', (socket) => {
            handleDisconnect(socket, userUUID);
        });
    })
}

export default registerHandler;