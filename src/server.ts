import app from './app';
import http from 'http';
import debug from 'debug';

const logger = debug('nodestr:server');

// PORT based on express-generator
function normalizePort(portVal: string | number | undefined): number | string | undefined {
  const port = parseInt(`${portVal}`, 10);

  if (isNaN(port) && typeof portVal === 'string') {
    return portVal;
  }

  if (port >= 0 && typeof portVal === 'number') {
    return port;
  }

  return portVal;
}

const port = normalizePort(process.env.PORT || 3000);
app.set('port', port);

// Error handler
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }
  
  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);

    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);

    default:
      throw error;
  }
}

// Listener handler
function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr?.port}`;
  logger('Listening on ' + bind);
}

// Server
const server = http.createServer(app);
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
console.log(`API is alive on ${port}!`);
