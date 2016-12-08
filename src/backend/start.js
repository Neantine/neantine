/**
 * Created by Administrateur on 29/09/2016.
 */

const app = require('./app');
const config = require('./config/config');

let listener = app.listen(config.port, function () {
  console.log('Express server listening on port ' + config.port);

  //console.log(app);

});


