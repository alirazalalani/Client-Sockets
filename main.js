const express = require("express");
const app = express();
const http = require("http").Server(app);
const port = process.env.PORT || 8080;

//attach http server to socket.io

const io = require("socket.io")(http);

app.get("/", (req, res) => {
  res.json("get Request");
});

//create a new connection
io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("driver-current-location", (loc) => {
    console.log({ driver_loc: loc })

    io.emit("driver-c-l", loc);
  });

  socket.on("get-dropoff-locations", (data) => {
    console.log({ data });
    io.emit("send-dropoff-locations", data);
  });

  socket.on("send-customer-loc", (data) => {
    console.log({ customer: data });
    io.emit("customer-loc", data);
  });

  socket.on("number-plate", (data) => {
    console.log({ numberPlate: data });
    io.emit("driver-number-plate", data);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});
http.listen(port, () => {
  console.log(`app listening on port ${port} `);
});
