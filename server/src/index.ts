import server from './server';

const serverStartMsg = 'Express server started on port: ';
const port = (process.env.PORT || 8000);

server.listen(port, () => {
  console.log(serverStartMsg + port);
});
