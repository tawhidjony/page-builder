// types/global.d.ts ফাইলে এটা যোগ করুন
import { PrismaClient } from "@prisma/client";

declare global {
    var prisma: PrismaClient | undefined;
}