const router = require('../_router');
const createClient = require('./_webdav');

module.exports = router({
  async head(req, res) {
    const webdav = createClient(req);
  
    try {
      if (await webdav.exists(req.query.filename)) {
        res
          .status(200)
          .send();
      } else {
        res
          .status(404)
          .send();
      }
    } catch (e) {
      res
        .status(500)
        .send(e);
    }
  },

  async get(req, res) {
    const webdav = createClient(req);
  
    try {
      const content = await webdav.getFileContents(req.query.filename);
      
      res
        .status(200)
        .send(content);
    } catch (e) {
      res
        .status(500)
        .send(e);
    }
  },

  async put(req, res) {
    const webdav = createClient(req);

    try {
      const stat = await webdav.putFileContents(req.query.filename);

      res
        .status(200)
        .send(stat);
    } catch (e) {
      res
        .status(500)
        .send(e);
    }
  },
});