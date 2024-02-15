"use server";

import pgInit from "./pgInit";

export default async function UnPublishPage(data: FormData) {
  try {
    const database = await pgInit();

    if (database.error || !database.database) {
      return { error: "Unexpected Server Error" };
    }
    const db = database.database;

    const page = await db.query(
      "UPDATE linktreepages SET public = $1 WHERE pageid = $2 RETURNING *",
      [false, data.get("pageid")]
    );

    return {
      success: true,
    };
  } catch (error) {
    return { error: error };
  }
}
