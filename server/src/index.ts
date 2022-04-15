import server from './server';

const serverStartMsg = 'Express server started on port: ';
const port = (process.env.PORT || 3000);

server.listen(port, () => {
  console.log(serverStartMsg + port);
});
