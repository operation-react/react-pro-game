import withSession from "../../lib/session";
import {client} from "./sqlHelper/client";
const { Pool, Client } = require('pg');

export default withSession(async (req, res) => {
  let user = req.session.get("user");
  const char = "'";
  let query = 'DELETE FROM accounts where username like ' + char + user.login + char + ' RETURNING *';
  try{
    await client.connect();
    const result = await client.query({
      rowMode: 'array',
      text: query,
    });
    if(result.rowCount!==1){
      throw {response:{status:418},data:{message:"Something went wrong"}};
    }
    client.end();
    req.session.destroy();
    res.json({ isLoggedIn: false });
  } catch (error) {
    console.log(error);
    const { response: fetchResponse } = error;
    res.status(fetchResponse?.status || 500).json(error.data);
  }
});
