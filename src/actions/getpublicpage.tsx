"use server";

import pgInit from "./pgInit";

export default async function GetPublicPageDetails(pageid: number) {
  try {
    const database = await pgInit();

    if (database.error || !database.database) {
      return { error: "Unexpected Server Error" };
    }
    const db = database.database;

    const pagedetails = await db.query(
      "SELECT * FROM linktreepages WHERE pageid = $1 AND public = true",
      [pageid]
    );
    const pagelinks = await db.query(
      "SELECT * FROM links WHERE linkbuttonpage = $1",
      [pageid]
    );

    if (pagedetails.rows.length === 0) {
      return { pagedetails: null };
    }

    await db.end();

    return { pagedetails: pagedetails.rows[0], pagelinks: pagelinks.rows };
  } catch (error) {
    return { error: error };
  }
}
