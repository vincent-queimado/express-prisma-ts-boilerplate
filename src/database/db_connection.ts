import { PrismaClient } from '@prisma/client';

class PrismaSingleton {
  private static instance: PrismaSingleton | null = null;
  private prisma: PrismaClient;

  private constructor() {
    this.prisma = new PrismaClient();
  }

  public static getInstance(): PrismaSingleton {
    if (!PrismaSingleton.instance) {
      PrismaSingleton.instance = new PrismaSingleton();
    }
    return PrismaSingleton.instance;
  }

  public async checkConnection(): Promise<{ success: boolean; error: any }> {
    try {
      await this.prisma.$connect();
      return { success: true, error: null };
    } catch (err) {
      return { success: false, error: err };
    } finally {
    }
  }

  // Get the PrismaClient instance for other uses
  public getPrismaClient(): PrismaClient {
    return this.prisma;
  }

  // Optional: Method to cleanly disconnect (e.g., on app shutdown)
  public async disconnect(): Promise<void> {
    await this.prisma.$disconnect();
  }
}

// Export an object with checkConnection to match existing import
const prismaSingleton = PrismaSingleton.getInstance();

export default {
  checkConnection: () => prismaSingleton.checkConnection(),
};

// Export the singleton instance for accessing PrismaClient elsewhere
export const prisma = prismaSingleton.getPrismaClient();
