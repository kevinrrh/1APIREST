const config = require('./configuracion');
const mongoose = require('mongoose');

let connection = null;

module.exports = {
  connect: () => {
    if (connection) return Promise.resolve(connection);
    
    return mongoose.connect(config.DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(conn => {
      connection = conn;
      console.log('La conexión fue exitosa');
      return connection;
    })
    .catch(e => {
      console.log(`Error en la conexión: ${e}`);
      throw e;
    });
  }
};
