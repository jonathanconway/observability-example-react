import express from "express";

import {
  MOCK_SHAREHOLDERS,
  MOCK_SHAREHOLDERS_BY_ID,
} from "../src/shareholder.mocks";

const app = express();
const port = 3100;

app.use(express.json());

app.get("/shareholders", (req, res) => {
  res.json(MOCK_SHAREHOLDERS);
});

app.patch("/shareholder/:id", (req, res) => {
  res.json(MOCK_SHAREHOLDERS_BY_ID[req.params.id]);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
