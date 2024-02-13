"use server";

import pgInit from "./pgInit";

export default async function GetUserDocuments(userid: number) {
  try {
    const database = await pgInit();

    if (database.error || !database.database) {
      return { error: "Unexpected Server Error" };
    }
    const db = database.database;

    const documents = await db.query(
      "SELECT * FROM linktreepages WHERE pagecreator = $1",
      [userid]
    );

    await db.end();

    return { success: true, documents: documents.rows };
  } catch (error) {
    return { error: error };
  }
}
