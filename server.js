const express = require("express");

const app = express();
const PORT = process.argv.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));





app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:/${PORT}`);
})