const axios = require("axios");
const fs = require("fs");
const { parse } = require("json2csv");

const TARGET_URL = "https://api.growthstation.ai/health";
const REQUEST_COUNT = 5000;
const OUTPUT_FILE = "request_statuses.csv";

async function makeRequest() {
  try {
    const response = await axios.get(TARGET_URL, {
      withCredentials: false,
      timeout: 5 * 1000,
    });

    return {
      timestamp: new Date().toISOString(),
      status: response.status,
      pid: response.data.pid,
      aws_instance_id: response.data.aws_instance_iD,
    };
  } catch (error) {
    return {
      status: error.response ? error.response.status : "Error",
      timestamp: new Date().toISOString(),
    };
  }
}

async function main() {
  const results = [];

  for (let i = 0; i < REQUEST_COUNT; i++) {
    console.log(`Making request ${i + 1} of ${REQUEST_COUNT}...`);
    const result = await makeRequest(i + 1);
    results.push(result);
  }

  console.log("All requests completed. Writing to CSV...");

  const csv = parse(results, {
    fields: ["timestamp", "status", "pid", "aws_instance_id"],
  });

  fs.writeFileSync(OUTPUT_FILE, csv, "utf8");

  console.log(`CSV file saved as ${OUTPUT_FILE}`);
}

main();
