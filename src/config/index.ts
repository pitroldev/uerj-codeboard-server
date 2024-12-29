import { z } from "zod";

const envSchema = z.object({
  ENV: z.string(),
  SECRET: z.string().default("secret_key"),
  SERVER_PORT: z.string().default("3333"),
  SQS_QUEUE_URL: z
    .string()
    .default(
      "http://sqs.us-east-2.localhost.localstack.cloud:4566/000000000000/codeboard-messages"
    ),
  MONGO_URI: z.string().default("mongodb://127.0.0.1:27017/dev_uerj_codeboard"),
  REDIS_HOST: z.string().default("127.0.0.1"),
  REDIS_PASS: z.string().default("redis_password"),
  REDIS_PORT: z.string().default("6379"),
  REDIS_USER: z.string().optional(),
});

const parsedEnv = envSchema.parse(process.env);

export const {
  ENV,
  SECRET,
  SERVER_PORT,
  SQS_QUEUE_URL,
  MONGO_URI,
  REDIS_HOST,
  REDIS_PASS,
  REDIS_PORT,
  REDIS_USER,
} = parsedEnv;
