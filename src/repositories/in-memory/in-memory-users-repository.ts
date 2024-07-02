import { prisma } from "@/lib/prisma";
import { Prisma, User } from "@prisma/client";
import { UsersRepository } from "../users-repository";
import { randomUUID } from "crypto";

export interface InMemoryUsersRepository extends UsersRepository {
  reset(): void;
  users: User[];
}

export const inMemoryUsersRepository: InMemoryUsersRepository = {
  users: [],

  async create(data: Prisma.UserCreateInput) {
    const user = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      passwordHash: data.passwordHash,
      role: data.role!,
      createdAt: new Date(),
    };

    this.users.push(user);

    return user;
  },
  async findByEmail(email: string) {
    const user = this.users.find((user) => user.email === email);

    if (!user) {
      return null;
    }

    return user;
  },
  async findById(id: string) {
    const user = this.users.find((user) => user.id === id);

    if (!user) {
      return null;
    }

    return user;
  },

  reset() {
    this.users = [];
  },
};
