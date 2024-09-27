import { getGameAssets } from "../init/assets.js";
import { getUsers, removeUser } from "../models/user.model.js"
import { getStage, setStage } from "../models/stage.model.js";
import { CLIENT_VERSION } from "../constants.js";
import handlerMappings from "./handlerMapping.js";

export const handleDisconnect = (socket, uuid) => {
    removeUser(socket.id);
    console.log(`User disconnected: ${socket.id}`);
    console.log('Current Users:', getUsers());
};

export const handleConnection = (socket, userUUID) => {
    console.log(`New user connected!: ${userUUID} with socket ID ${socket.id}`);
    console.log('Current Users: ', getUsers());

    // socket.emit은 본인에게 보내는 것
    socket.emit('connection', {uuid: userUUID});
}

export const hanlderEvent = (io, socket, data) => {
    if (!CLIENT_VERSION.includes(data.clientVersion)) {
        socket.emit('response', {status: 'fail', message: "Client version mismatch"});
        return;
    }

    const handler = handlerMappings[data.handlerId];
    if (!handler) {
        socket.emil('response', {status: 'fail', message: "Handler not fount"});
        return;
    }

    const response = handler(data.userId, data.payload);

    if( response.broadcast) {
        io.emit('response', 'broadcast');
        return;
    }

    socket.emit('response', response);

}