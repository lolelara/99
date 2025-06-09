import { Pool } from 'pg';

// Custom error class for database errors
export class DatabaseError extends Error {
  code: string;
  constraint?: string;

  constructor(message: string, code: string, constraint?: string) {
    super(message);
    this.name = 'DatabaseError';
    this.code = code;
    this.constraint = constraint;
  }
}

// Interface for PostgreSQL error
interface PostgresError extends Error {
  code?: string;
  constraint?: string;
}

// Create a connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? {
    rejectUnauthorized: false
  } : false,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// Function to execute queries with automatic retries and enhanced error handling
export async function query(text: string, params?: any[], retries = 3) {
  let lastError;
  for (let i = 0; i < retries; i++) {
    try {
      const client = await pool.connect();
      try {
        const result = await client.query(text, params);
        return result;
      } catch (error) {
        const pgError = error as PostgresError;
        if (pgError.code === '23505') { // Unique violation
          throw new DatabaseError('Duplicate entry', pgError.code, pgError.constraint);
        }
        throw error;
      } finally {
        client.release();
      }
    } catch (error) {
      if (error instanceof DatabaseError) {
        throw error;
      }
      console.error(`Database query attempt ${i + 1} failed:`, error);
      lastError = error;
      // Wait before retrying (exponential backoff)
      await new Promise(resolve => setTimeout(resolve, Math.pow(2, i) * 100));
    }
  }
  throw lastError;
}

export default pool; 