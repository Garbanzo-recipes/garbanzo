// copied from https://github.com/jamo/micro-method-router/blob/3c355c2163af868bea6cf7045010e4e635eca460/index.js

module.exports = function (map) {
  const allowed_verbs = Object
    .keys(map)
    .map(verb => verb.toUpperCase())
    .join(', ');

  return (req, res, ...args) => {
    const method = req.method.toLowerCase();

    if (method === 'options') {
      res
        .status(204)
        .setHeader('Access-Control-Request-Method', allowed_verbs)
        .setHeader('Access-Control-Max-Age', 86400)
        .send();
      
      return;
    }
    
    const fn = map[method];
    
    if (!fn) {
      res
        .writeHead(405)
        .end('Method Not Allowed');

      return;
    }

    return fn(req, res, ...args);
  }
}