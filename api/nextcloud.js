const fetch = require('@zeit/fetch')();
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
};

module.exports = (req, res) => {
  const { name = 'World' } = req.query;

  fetch("https://cloud.dlemper.de/s/3aTPwXXGfAqM4eW");

  // <head data-requesttoken="SuZExdAlI2fap4M1xCfmZc+F7H2mscPqzFbgt2qSgmE=:L9UHg7FQegLqxPln8mGwL42urxHO6aeznTOp4wW9wVU="></head>

  // Basic base64(<3aTPwXXGfAqM4eW>:<passphrase/"null">)

  fetch("https://cloud.dlemper.de/public.php/webdav/", {
    "headers": {
      "authorization": "Basic M2FUUHdYWEdmQXFNNGVXOm51bGw=",
      "content-type": "application/xml; charset=UTF-8",
      "depth": "1",
      "requesttoken": "I6ACp1gEmMLezwu0u9/gc8AFNBw63IYg2tbG7dzAfOo=:ddpx82oy/YOy5GTl07exXKpBRCl0mcVJr56clZ6vFJM=",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      "x-requested-with": "XMLHttpRequest",
      "cookie": "oc_sessionPassphrase=KrxkzVqQ3OwCrH5y3nWdZ5ZklfrUvdgNzpd8ZXlrLUZ05Ydp2jAPptVrVSz9AlkRZYEp85vf93dlHuYUnoW6Kc9%2FyKHVdnJrWThjx%2B33HPklIBqmMh7mfobxi66ipRuM; __Host-nc_sameSiteCookielax=true; __Host-nc_sameSiteCookiestrict=true; occ2zj22ye2f=18a457f12f36384c25a6d6a27940b83e"
    },
    "body": "<?xml version=\"1.0\"?>\n<d:propfind  xmlns:d=\"DAV:\" xmlns:oc=\"http://owncloud.org/ns\" xmlns:nc=\"http://nextcloud.org/ns\" xmlns:ocs=\"http://open-collaboration-services.org/ns\">\n  <d:prop>\n    <d:getlastmodified />\n    <d:getetag />\n    <d:getcontenttype />\n    <d:resourcetype />\n    <oc:fileid />\n    <oc:permissions />\n    <oc:size />\n    <d:getcontentlength />\n    <nc:has-preview />\n    <nc:mount-type />\n    <nc:is-encrypted />\n    <ocs:share-permissions />\n  </d:prop>\n</d:propfind>",
    "method": "PROPFIND",
    "mode": "cors"
  });

  fetch("https://cloud.dlemper.de/public.php/webdav/wohn.json", {
    "headers": {
      "authorization": "Basic M2FUUHdYWEdmQXFNNGVXOg==",
      "content-disposition": "attachment; filename=\"wohn.json\"",
      "content-type": "application/json",
      "ocs-apirequest": "true",
      "requesttoken": "2d1/taW8c0odsCS0Vik1bTt03dem+bUCUYCWxb+KmIM=:j6cM4ZeKFgtxm0vlPkFkQlEwreLovPZrJMjMvf3l8Po=",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      "x-oc-mtime": "1545949766.022",
      "x-requested-with": "XMLHttpRequest",
      "cookie": "oc_sessionPassphrase=KrxkzVqQ3OwCrH5y3nWdZ5ZklfrUvdgNzpd8ZXlrLUZ05Ydp2jAPptVrVSz9AlkRZYEp85vf93dlHuYUnoW6Kc9%2FyKHVdnJrWThjx%2B33HPklIBqmMh7mfobxi66ipRuM; __Host-nc_sameSiteCookielax=true; __Host-nc_sameSiteCookiestrict=true; occ2zj22ye2f=18a457f12f36384c25a6d6a27940b83e"
    },
    "body": null,
    "method": "PUT",
    "mode": "cors"
  });

  fetch("https://cloud.dlemper.de/public.php/webdav/wohn.json", {
    "headers": {
      "authorization": "Basic M2FUUHdYWEdmQXFNNGVXOm51bGw=",
      "content-type": "application/xml; charset=UTF-8",
      "depth": "0",
      "requesttoken": "2d1/taW8c0odsCS0Vik1bTt03dem+bUCUYCWxb+KmIM=:j6cM4ZeKFgtxm0vlPkFkQlEwreLovPZrJMjMvf3l8Po=",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      "x-requested-with": "XMLHttpRequest",
      "cookie": "oc_sessionPassphrase=KrxkzVqQ3OwCrH5y3nWdZ5ZklfrUvdgNzpd8ZXlrLUZ05Ydp2jAPptVrVSz9AlkRZYEp85vf93dlHuYUnoW6Kc9%2FyKHVdnJrWThjx%2B33HPklIBqmMh7mfobxi66ipRuM; __Host-nc_sameSiteCookielax=true; __Host-nc_sameSiteCookiestrict=true; occ2zj22ye2f=18a457f12f36384c25a6d6a27940b83e"
    },
    "body": "<?xml version=\"1.0\"?>\n<d:propfind  xmlns:d=\"DAV:\" xmlns:oc=\"http://owncloud.org/ns\" xmlns:nc=\"http://nextcloud.org/ns\" xmlns:ocs=\"http://open-collaboration-services.org/ns\">\n  <d:prop>\n    <d:getlastmodified />\n    <d:getetag />\n    <d:getcontenttype />\n    <d:resourcetype />\n    <oc:fileid />\n    <oc:permissions />\n    <oc:size />\n    <d:getcontentlength />\n    <nc:has-preview />\n    <nc:mount-type />\n    <nc:is-encrypted />\n    <ocs:share-permissions />\n  </d:prop>\n</d:propfind>",
    "method": "PROPFIND",
    "mode": "cors"
  });

  res
    .status(200)
    .send(`Hello ${name}!`);
}