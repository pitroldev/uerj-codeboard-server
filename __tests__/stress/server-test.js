import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  stages: [
    { duration: "15s", target: 500 },
    { duration: "30s", target: 500 },
    { duration: "15s", target: 0 },
  ],
};

function logResponse(res) {
  if (res.error_code) {
    console.error(
      JSON.stringify({
        timestamp: new Date().toISOString(),
        latency: res.timings.duration,
        status: res.error_code,
      })
    );
  } else {
    console.log(
      JSON.stringify({
        timestamp: new Date().toISOString(),
        latency: res.timings.duration,
        status: res.status,
        body: res.body,
      })
    );
  }
}

export default function () {
  const url = "http://localhost:3333/api/health";
  const res = http.get(url);

  logResponse(res);

  check(res, { "status is 200": (r) => r.status === 200 });

  sleep(1);
}
