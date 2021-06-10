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
    "abc": {
        users: []
    }
};

io.on("connect", (socket) => {
    socket.emit("ping", {
        message: "ping pong"
    });
});

io.of(/^\/room\/([a-zA-Z0-9-]+)$/)
.on("connect", (socket) => {
    const { nsp } = socket;
    const result = /\/room\/([a-zA-Z0-9-]+)/.exec(nsp.name);

    if (!result) {
        return;
    }

    const id = result[1];

    socket.emit("init", {
        room: rooms[id]
    });

    socket.on("user-connected", (message) => {
        const newUser = {
            id: message.id,
            name: message.name,
            score: 0
        };
        rooms[id].users.push(newUser);

        socket.emit("user-connected", { user: newUser });

        if (rooms[id].users.length >= 6) {
            const imageNumber = parseInt(1 + Math.random() * 10);

            socket.emit("start-play", {
                image: `/img/${ imageNumber }.jpeg`
            });
        }
    });

    socket.on
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
            room: rooms[id] || null
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
