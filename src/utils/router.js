import { Wallet } from "react-bootstrap-icons";

export const ROUTERS = {
    USER: {
        HOME: "/",
        PROFILE: "profile",
        POLLDETAIL: "poll-detail/:id",
        POLLLIST: "poll-list",
    },
    ADMIN: {
        HOME: "manager/home",
        ADDPOLL: "manager/add-poll",
    },
    AUTH: {
        LOGIN: "login",
        REGISTER: "register",
    }
}