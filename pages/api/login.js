import fetchJson from "../../lib/fetchJson";
import withSession from "../../lib/session";
import {client} from "./sqlHelper/client"
const { Pool, Client } = require('pg')


export default withSession(async (req, res) => {
  const { username , password } = await req.body;
  const char = "'";
  let query = 'SELECT username, email from accounts where password like ' + char +  password + char +' and username  like ' + char + username+ char ;
  try {
    await client.connect();
    const result = await client.query({
      rowMode: 'array',
      text: query,
    });
    client.end();
    if(result.rowCount!==1){
      throw {response:{status:418},data:{message:"Invalid password or login!"}};
    }
    let email = result.rows[0][1];
    let login = result.rows[0][0];
    let user = { isLoggedIn: true, login, email };
    req.session.set("user", user);
    await req.session.save();
    res.json(user);
  } catch (error) {
    const { response: fetchResponse } = error;
    res.status(fetchResponse?.status || 500).json(error.data);
  }
});
