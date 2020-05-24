const { createClient } = require('webdav');

/*const fetch = require('@zeit/fetch')();
const xmlParser = require('fast-xml-parser');

const request = async (method, path, body, username, password) => {
  const auth = Buffer
    .from(`${username}:${password}`)
    .toString('base64');
  
  const res = await fetch(path, {
    headers: {
      authorization: `Basic ${auth}`
    },
    method,
    body,
    mode: 'cors',
    depth: 1,
  });
  
  const xml = await res.text();

  const json = xmlParser.parse(xml, {
    arrayMode: false,
    ignoreNameSpace: true
  });

  return json.multistatus.response;
};*/

module.exports = function (req) {
  const { authorization } = req.headers;

  const [username, password] = Buffer
    .from(authorization, 'base64')
    .toString()
    .split(':');

  const webdav = createClient("https://cloud.dlemper.de/public.php/webdav/", {
    username,
    password,
  });

  return webdav;
};