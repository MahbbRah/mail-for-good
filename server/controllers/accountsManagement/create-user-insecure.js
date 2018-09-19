const db = require('../../models');

module.exports = function(req, res) {
  db.user.createOne(req.body.data)
    .catch((error, errorStatus) => { res.status(500).send('The application has\'nt been able to create the user.') })
    .then(success => { res.status(200).send('User successfully created.') })
}
