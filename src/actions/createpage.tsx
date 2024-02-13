"use server";

import pgInit from "./pgInit";

export default async function CreatePage(data: FormData) {
  try {
    const database = await pgInit();

    if (database.error || !database.database) {
      return { error: "Unexpected Server Error" };
    }
    const db = database.database;

    const hasPurchasedPremiumn = await db.query(
      "SELECT * FROM premuimpurchase WHERE purchasingperson = $1",
      [data.get("userid")]
    );

    if (hasPurchasedPremiumn.rows.length === 0) {
      const documents = await db.query(
        "SELECT * FROM linktreepages WHERE pagecreator = $1",
        [data.get("userid")]
      );

      if (documents.rows.length > 2) {
        return { error: "You have purchased the max amount of documents." };
      }
    }

    const page = await db.query(
      "INSERT INTO linktreepages(pagetitle, pagecreator, public) VALUES($1, $2, $3) RETURNING *",
      [data.get("pagetitle") as string, data.get("userid") as string, false]
    );

    await db.end();

    return { pageid: page.rows[0].pageid };
  } catch (error) {
    return { error: "Unexpected Server Issue!" };
  }
}
