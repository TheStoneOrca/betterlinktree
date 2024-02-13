"use server";

import pgInit from "./pgInit";

export default async function CreateLink(data: FormData) {
  try {
    const database = await pgInit();

    if (database.error || !database.database) {
      return { error: "Unexpected Server Error" };
    }
    const db = database.database;

    const iconFormData = new FormData();
    iconFormData.append("file", data.get("cardicon") as string);
    iconFormData.append("upload_preset", "vt0rlkqz");

    const IconDataFetch = await fetch(
      "https://api.cloudinary.com/v1_1/dnslox6ni/image/upload",
      { method: "POST", body: iconFormData }
    );

    const icon = await IconDataFetch.json();

    await db.query(
      "INSERT INTO links(linkname, linkhref, linkcolor, linkicon, linkbuttonpage, textcolor)  VALUES($1, $2, $3, $4, $5, $6)",
      [
        data.get("cardtitle"),
        data.get("cardhref"),
        data.get("bgcolor"),
        icon.secure_url,
        data.get("linkdocument"),
        data.get("textcolor"),
      ]
    );

    return { success: true };
  } catch (error) {
    return { error: error };
  }
}
