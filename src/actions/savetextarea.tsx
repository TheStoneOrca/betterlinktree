"use server";

import pgInit from "./pgInit";

export default async function SaveTextArea(data: FormData) {
  try {
    const database = await pgInit();

    if (database.error || !database.database) {
      return { error: "Unexpected Server Error" };
    }
    const db = database.database;

    await db.query(
      "UPDATE linktreepages SET pagetextcontent = $1 WHERE pageid = $2",
      [data.get("text"), data.get("textareadocument")]
    );

    await db.end();

    return { success: true };
  } catch (error) {
    return { error: error };
  }
}
