import bcrypt from "bcrypt";
import withSession from "../../lib/session";
import { client } from "./sqlHelper/client"

export default withSession(async (req, res) => {
    const {
        username,
        password: purePassword
    } = await req.body;
    const query = `
        SELECT
            username,
            email,
            password
        FROM
            accounts
        WHERE
            username LIKE '${ username }'
    `;

    try {
        await client.connect();
        
        const result = await client.query({
            rowMode: 'array',
            text: query,
        });

        client.end();

        if (result.rowCount !== 1) {
            throw {
                response: { status: 418 },
                data: { message: "Invalid password or login!" }
            };
        }

        const [ username, email, password ] = result.rows[0];
        const isMatched = await bcrypt.compare(purePassword, password);

        if (!isMatched) {
            throw {
                response: { status: 418 },
                data: { message: "Invalid password or login!" }
            };
        }

        const user = {
            isLoggedIn: true,
            login: username,
            email: email
        };

        req.session.set("user", user);
        await req.session.save();

        res.json(user);
    } catch (error) {
        const { response: fetchResponse } = error;
        res.status(fetchResponse?.status || 500).json(error.data);
    }
});
