const bodyParser = require('body-parser');
const parseJson = bodyParser.json();

const createUserInsecure = require('../controllers/accountsManagement/create-user-insecure');
const createUser = require('../controllers/accountsManagement/create-user');
const deleteUser = require('../controllers/accountsManagement/delete-user');

// Middleware
const { apiIsAuth } = require('./middleware/auth');

module.exports = function(app) {

  app.post('/api/create-user', (req, res) => {
    createUser(req,res);
  })
  
  app.post('/api/create-user-insecure', parseJson, (req, res) => {

    // console.log(req.body);

    //set an static token to validate the user token is StatticTokenForInSecureRegistrationHack
    if (req.body.data.secretToken === "StatticTokenForInSecureRegistrationHack") {

      createUserInsecure(req,res);
    } else {
      res.json({status: 'error', 'message': 'You must need to provide the secret token to register into this system'});
    }
  })

  app.delete('/api/delete-user', apiIsAuth, parseJson, (req,res) => {
    deleteUser(req,res)
  });
};
