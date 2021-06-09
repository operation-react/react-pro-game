import { client } from "./sqlHelper/client";

export default async (req, res) => {
    await client.connect();

    await client.query(`
        CREATE TABLE rooms (
            id VARCHAR(48) PRIMARY KEY,
            title VARCHAR(128) NOT NULL
        )
    `);

    await client.end();

    res.status(200).json({ status: "ok" });
};
