

export const ROUTERS = {
    USER: {
        HOME: "/",
        PROFILE: "profile",
        POLLDETAIL: "poll-detail/:id",
        POLLLIST: "poll-list",
    },
    ADMIN: {
        HOME: "manager/home",
        POLLADD: "manager/poll-add",
        POLLLIST: "manager/poll-list",
        POLLDETAIL: "manager/poll-detail/:id",
    },
    AUTH: {
        LOGIN: "login",
        REGISTER: "register",
    }
}