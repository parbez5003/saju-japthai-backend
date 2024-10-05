const { serverPort } = require("./src/secret");
const http = require("http");
const app = require("./app");
const connectToDB = require("./src/config/db");
const server = http.createServer(app);

const main = async () => {
  await connectToDB();
  server.listen(serverPort, () => {
    console.log(
      `Sayu Japthai server is running on: http://localhost:${serverPort}`
    );
  });
};

main();
