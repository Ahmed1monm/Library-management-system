import Redis from "ioredis";

export const redisClient = new Redis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
});

redisClient.on("connect", () => {
 console.log("Redis connected");
});

redisClient.on("error", err => {
    console.log(`Error in redis connection: ${err}`);
    process.exit(1);
});

