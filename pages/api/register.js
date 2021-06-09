import bcrypt from "bcrypt";
import withSession from "../../lib/session";
import { client } from "./sqlHelper/client"

const HASH_SALT_ROUNDS = 7;

export default withSession(async (req, res) => {
    const {
        username,
        email,
        password
    } = await req.body;

    const hashedPassword = await bcrypt.hash(password, HASH_SALT_ROUNDS);
    const queryInsert = `
        INSERT INTO accounts (username, email, password, created_on, last_login)
        VALUES ('${ username }', '${ email }', '${ hashedPassword }', NOW(), NOW())
    `;
    const querySelect = `
        SELECT
            username,
            email
        FROM
            accounts
        WHERE
            email LIKE '${ email }'
        OR
            username LIKE '${ username }'
    `;

    try {
        await client.connect();

        let result = await client.query({
            rowMode: 'array',
            text: querySelect,
        });

        if (result.rowCount !== 0) {
            throw {
                response: { status: 400 },
                data: { message: "Invalid username or email" }
            };
        }

        await client.query({
            rowMode: 'array',
            text: queryInsert,
        });

        client.end();

        const user = {
            isLoggedIn: true,
            login: username,
            email: email
        };
        
        req.session.set("user", user);
        await req.session.save();

        res.json(user);
    } catch (error) {
        console.log(error);

        const { response: fetchResponse } = error;

        res.status(fetchResponse?.status || 500)
            .json(error.data);
    }
});
