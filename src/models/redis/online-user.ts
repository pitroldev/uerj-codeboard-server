import redis from "@/db/redis";

export default {
  findByRoomId: async (roomId: string): Promise<string[]> => {
    return redis.smembers(`room:${roomId}:users`);
  },
  addToRoom: async (roomId: string, userId: string) => {
    return redis.sadd(`room:${roomId}:users`, userId);
  },
  removeFromRoom: async (roomId: string, userId: string) => {
    return redis.srem(`room:${roomId}:users`, userId);
  },
};
