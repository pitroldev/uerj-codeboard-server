import Redis from "ioredis";

const { REDIS_HOST, REDIS_PORT, REDIS_PASS } = process.env;
if (!REDIS_HOST) throw new Error("REDIS_HOST is not provided");

const client = new Redis({
  host: REDIS_HOST,
  port: REDIS_PORT ? parseInt(REDIS_PORT) : 6379,
  password: REDIS_PASS,
  lazyConnect: true,
  retryStrategy: (times) => {
    const delay = Math.min(times * 50, 2000);
    return delay;
  },
});

client.on("connect", () => {
  console.log("[REDIS] Successfully connected!");
});

client.on("error", (err) => {
  console.log("[REDIS][ERROR] Error:", err);
});

client.connect().catch((error) => {
  console.error("[REDIS][ERROR][CRITICAL] Failed to connect to Redis:", error);
  process.exit(1);
});

export default client;
