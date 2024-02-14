"use server";

import pgInit from "./pgInit";

export default async function PublishPage(data: FormData) {
  try {
    const database = await pgInit();

    if (database.error || !database.database) {
      return { error: "Unexpected Server Error" };
    }
    const db = database.database;

    const page = await db.query(
      "UPDATE linktreepages SET public = $1 WHERE pageid = $2 RETURNING *",
      [true, data.get("pageid")]
    );

    const pagename = page.rows[0].pagetitle.replace(/\s+/g, "-").toLowerCase();

    return {
      success: true,
      pageurl: `${process.env.DOMAIN}/page/${pagename}?id=${page.rows[0].pageid}`,
    };
  } catch (error) {
    return { error: error };
  }
}
