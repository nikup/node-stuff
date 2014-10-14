var http = require("http");

http.get("http://localhost:9615/all_chirps", function(res) {
  res.on("data", function(data) {
    console.log(data.toString());
  });
});
