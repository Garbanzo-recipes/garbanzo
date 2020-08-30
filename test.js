const fetch = require('@zeit/fetch')();
const xmlParser = require('fast-xml-parser');

const request = async (method, path, username, password) => {
  const res = await fetch(path, {
    headers: {
      authorization: `Basic ${ Buffer.from(`${username }:${ password}`).toString('base64')}`,
    },
    method,
  });

  const xml = await res.text();

  const json = xmlParser.parse(xml, {
    arrayMode: false,
    ignoreNameSpace: true,
  });

  return json.multistatus.response;
};

request('PROPFIND', 'https://cloud.dlemper.de/public.php/webdav/', '3aTPwXXGfAqM4eW', '')
  .then(console.log);

/*
{
  "multistatus": {
    "response": [
      {
        "href": "/public.php/webdav/",
        "propstat": {
          "prop": {
            "getlastmodified": "Sun, 17 May 2020 21:46:27 GMT",
            "resourcetype": {
              "collection": ""
            },
            "quota-used-bytes": 676245,
            "quota-available-bytes": 19963843740,
            "getetag": "&quot;5ec1b0b404e1f&quot;"
          },
          "status": "HTTP/1.1 200 OK"
        }
      },
      {
        "href": "/public.php/webdav/test.json",
        "propstat": [
          {
            "prop": {
              "getlastmodified": "Sun, 17 May 2020 21:39:41 GMT",
              "getcontentlength": 1,
              "resourcetype": "",
              "getetag": "&quot;7087b1e56ad53d011af491b70e7e10d9&quot;",
              "getcontenttype": "application/json"
            },
            "status": "HTTP/1.1 200 OK"
          },
          {
            "prop": {
              "quota-used-bytes": "",
              "quota-available-bytes": ""
            },
            "status": "HTTP/1.1 404 Not Found"
          }
        ]
      },
      {
        "href": "/public.php/webdav/wohn.json",
        "propstat": [
          {
            "prop": {
              "getlastmodified": "Thu, 27 Dec 2018 22:29:26 GMT",
              "getcontentlength": 676244,
              "resourcetype": "",
              "getetag": "&quot;70d427c8e0b1d102dd3e6bb2457f0f35&quot;",
              "getcontenttype": "application/json"
            },
            "status": "HTTP/1.1 200 OK"
          },
          {
            "prop": {
              "quota-used-bytes": "",
              "quota-available-bytes": ""
            },
            "status": "HTTP/1.1 404 Not Found"
          }
        ]
      }
    ]
  }
}
*/

/*
{
  "multistatus": {
    "response": [
      {
        "href": "/public.php/webdav/",
        "propstat": {
          "prop": {
            "getlastmodified": "Mon, 18 May 2020 19:02:38 GMT",
            "resourcetype": {
              "collection": ""
            },
            "quota-used-bytes": 676244,
            "quota-available-bytes": 19963843741,
            "getetag": "&quot;5ec2dbce5f9b3&quot;"
          },
          "status": "HTTP/1.1 200 OK"
        }
      },
      {
        "href": "/public.php/webdav/wohn.json",
        "propstat": [
          {
            "prop": {
              "getlastmodified": "Thu, 27 Dec 2018 22:29:26 GMT",
              "getcontentlength": 676244,
              "resourcetype": "",
              "getetag": "&quot;70d427c8e0b1d102dd3e6bb2457f0f35&quot;",
              "getcontenttype": "application/json"
            },
            "status": "HTTP/1.1 200 OK"
          },
          {
            "prop": {
              "quota-used-bytes": "",
              "quota-available-bytes": ""
            },
            "status": "HTTP/1.1 404 Not Found"
          }
        ]
      }
    ]
  }
}
*/

/*
{
  "multistatus": {
    "response": {
      "href": "/public.php/webdav/",
      "propstat": {
        "prop": {
          "getlastmodified": "Mon, 18 May 2020 19:03:17 GMT",
          "resourcetype": {
            "collection": ""
          },
          "quota-used-bytes": 0,
          "quota-available-bytes": 19964519985,
          "getetag": "&quot;5ec2dbf5b3acf&quot;"
        },
        "status": "HTTP/1.1 200 OK"
      }
    }
  }
}
*/
