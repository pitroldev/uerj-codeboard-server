import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  stages: [
    { duration: "15s", target: 500 },
    { duration: "30s", target: 500 },
    { duration: "15s", target: 0 },
  ],
};

export default function () {
  const url = "http://localhost:3333/api/health";
  const res = http.get(url);

  if (res.error_code) {
    console.error(
      JSON.stringify({
        timestamp: new Date().toISOString(),
        error_code: res.error_code,
        error_message: res.error,
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

  check(res, { "status is 200": (r) => r.status === 200 });

  sleep(1);
}
