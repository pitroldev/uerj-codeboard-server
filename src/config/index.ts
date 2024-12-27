export const {
  ENV = "development",
  SECRET = "secret_key",
  SERVER_PORT = 3333,
  SQS_QUEUE_URL = "http://sqs.us-east-2.localhost.localstack.cloud:4566/000000000000/codeboard-messages",
  MONGO_URI = "mongodb://127.0.0.1:27017/dev_uerj_codeboard",
  REDIS_HOST = "127.0.0.1",
  REDIS_PASS = "redis_password",
  REDIS_PORT = "6379",
  REDIS_USER,
} = process.env as Record<string, string>;
