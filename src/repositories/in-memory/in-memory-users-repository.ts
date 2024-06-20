import { prisma } from "@/lib/prisma";
import { Prisma, User } from "@prisma/client";
import { UsersRepository } from "../users-repository";

let users: User[] = [];

export interface InMemoryUsersRepository extends UsersRepository {
  reset(): void;
}

export const inMemoryUsersRepository: InMemoryUsersRepository = {
  async create(data: Prisma.UserCreateInput) {
    const user = {
      id: "user-1",
      name: data.name,
      email: data.email,
      passwordHash: data.passwordHash,
      createdAt: new Date(),
    };

    users.push(user);

    return user;
  },
  async findByEmail(email: string) {
    const user = users.find((user) => user.email === email);

    if (!user) {
      return null;
    }

    return user;
  },

  reset() {
    users = [];
  },
};
