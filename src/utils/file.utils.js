const fs = require("fs/promises");
const path = require("path");

const DB_PATH = "./db.json";

async function readDb(resource) {
  const data = await fs.readFile(DB_PATH, "utf-8");
  const json = JSON.parse(data);
  return json[resource] || [];
}

async function writeDb(resource, data) {
  const file = await fs.readFile(DB_PATH, "utf-8");
  const json = JSON.parse(file);
  json[resource] = data;
  await fs.writeFile(DB_PATH, JSON.stringify(json, null, 2));
}

module.exports = {
  readDb,
  writeDb,
};
