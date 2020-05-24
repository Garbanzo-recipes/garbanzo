const router = require('../_router');
const createClient = require('./_webdav');

module.exports = router({
  async get(req, res) {
    const webdav = createClient(req);
  
    try {
      const contents = await webdav.getDirectoryContents('/');
      
      res
        .status(200)
        .send(contents);
    } catch (e) {
      res
        .status(500)
        .send(e);
    }
  }
})