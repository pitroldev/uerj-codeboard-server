import redis from "@/db/redis";

export default {
  findByRoomId: async (roomId: string): Promise<string[]> => {
    return redis.smembers(`rooms:${roomId}:users`);
  },
  addToRoom: async (roomId: string, userId: string) => {
    return redis.sadd(`rooms:${roomId}:users`, userId);
  },
  removeFromRoom: async (roomId: string, userId: string) => {
    return redis.srem(`rooms:${roomId}:users`, userId);
  },
};
