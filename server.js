const app = require("express")();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const nextHandler = nextApp.getRequestHandler();
const port = 3000;

const rooms = {
    "1": {
        name: "hello",
        user: 1
    }
};

io.on("connect", (socket) => {
    socket.emit("ping", {
        message: "ping pong"
    });
});

nextApp.prepare().then(() => {
    app.get("/api/rooms", (req, res) => {
        res.json(rooms);
    });

    app.get("*", (req, res) => nextHandler(req, res));

    server.listen(port, () => console.log("Started"));
});
