"use server";

import pg from "pg";

const pgInit = async () => {
  try {
    const db = new pg.Client({
      host: "localhost",
      user: "postgres",
      password: process.env.DB_PASSWORD,
      database: "betterlinktree",
      port: 5432,
    });

    await db.connect();

    return { database: db };
  } catch (error) {
    console.error(error);
    return { error: error };
  }
};

export default pgInit;
