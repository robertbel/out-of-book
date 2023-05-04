import { createPool, sql } from '@vercel/postgres';

async function seed() {
  const createTable = await sql`
    CREATE TABLE IF NOT EXISTS positions (
      id SERIAL PRIMARY KEY,
      opening VARCHAR(255) NOT NULL,
      pgn VARCHAR(255) UNIQUE NOT NULL,
      note VARCHAR(255),
      "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
    `;

  console.log(`Created "positions" table`);

  const users = await Promise.all([
    sql`
          INSERT INTO users (name, email, image)
          VALUES ('Guillermo Rauch', 'rauchg@vercel.com', 'https://pbs.twimg.com/profile_images/1576257734810312704/ucxb4lHy_400x400.jpg')
          ON CONFLICT (email) DO NOTHING;
      `,
    sql`
          INSERT INTO users (name, email, image)
          VALUES ('Lee Robinson', 'lee@vercel.com', 'https://pbs.twimg.com/profile_images/1587647097670467584/adWRdqQ6_400x400.jpg')
          ON CONFLICT (email) DO NOTHING;
      `,
    sql`
          INSERT INTO users (name, email, image)
          VALUES ('Steven Tey', 'stey@vercel.com', 'https://pbs.twimg.com/profile_images/1506792347840888834/dS-r50Je_400x400.jpg')
          ON CONFLICT (email) DO NOTHING;
      `,
  ]);
  console.log(`Seeded ${users.length} users`);

  return {
    createTable,
    users,
  };
}
export default defineEventHandler(async () => {
  const startTime = Date.now();
  const db = createPool({
    connectionString: process.env.POSTGRES_URL,
  });
  try {
    const { rows: positions } = await db.query('SELECT * FROM positions');
    const duration = Date.now() - startTime;
    return {
      positions: positions,
      duration: duration
    };
  } catch (error) {
    // @ts-ignore
    if (error?.message === `relation "positions" does not exist`) {
      console.log(
        "Table does not exist, creating and seeding it with dummy data now..."
      );
      // Table is not created yet
      await seed();
      const { rows: positions } = await db.query('SELECT * FROM users');
      const duration = Date.now() - startTime;
      return {
        positions: positions,
        duration: duration
      };
    } else {
      throw error;
    }
  }
});
