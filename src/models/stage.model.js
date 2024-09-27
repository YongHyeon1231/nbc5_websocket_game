
// 스테이지 정보를 객체에 {key: uuid, value: array}의 형태로 저장합니다.
//key: uuid, value: array -> stage 정보는 배열 (여러개)
// value: array에는 stageId를 가진 객체가 들어갑니다.
const stages = {};

export const createStage = (uuid) => {
    // 초기 스테이지 배열 생성
    stages[uuid] = [];
}

export const getStage = (uuid) => {
    return stages[uuid];
}

export const setStage = (uuid, id, timestamp) => {
    return stages[uuid].push({id, timestamp});
}