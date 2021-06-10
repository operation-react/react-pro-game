const app = require("express")();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const next = require("next");
const { v4: uuidv4 } = require("uuid");

const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const nextHandler = nextApp.getRequestHandler();
const port = 3000;

const rooms = {
    "room_1": {
        users: []
    }
};

io.on("connect", (socket) => {
    socket.emit("ping", {
        message: "ping pong"
    });
});

io.of(/^\/room\/[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/)
.on("connect", (socket) => {
    const { nsp } = socket;
    const [ , id ] = /\/room\/([a-zA-Z0-9-])/.exec(nsp);

    console.log("Hello world");

    socket.emit("hello", {
        message: "Here is room",
        id: id
    });
});

nextApp.prepare().then(() => {
    app.get("/api/rooms/new", (req, res) => {
        const newId = uuidv4();
        
        rooms[newId] = {
            users: []
        };

        res.redirect("/room/" + newId);
    });

    app.get("/api/rooms/:id", (req, res) => {
        const { id } = req.params;

        res.status(id in rooms ? 200 : 404).json({
            ok: id in rooms,
            room: rooms[id] ?? null
        });
    });

    app.get("/api/rooms", (req, res) => {
        const roomsArray = Object.entries(rooms)
            .map(([ key, value ]) => ({ id: key, ...value }));

        res.json(roomsArray);
    });

    app.get("*", (req, res) => nextHandler(req, res));
    app.post("*", (req, res) => nextHandler(req, res));

    server.listen(port, () => console.log("Started"));
});
