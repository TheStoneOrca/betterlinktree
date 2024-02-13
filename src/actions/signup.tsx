"use server";

import pgInit from "./pgInit";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default async function SignUp(data: FormData) {
  try {
    const database = await pgInit();

    if (database.error || !database.database) {
      return { error: "Unexpected Server Error" };
    }
    const db = database.database;

    const checkUsername = await db.query(
      "SELECT * FROM users WHERE username = $1",
      [data.get("username") as any]
    );
    const checkEmail = await db.query("SELECT * FROM users WHERE email = $1", [
      data.get("email") as any,
    ]);
    if (checkEmail.rows.length > 0 || checkUsername.rows.length > 0) {
      return { error: "Username or Email already registered!" };
    }

    const hashedPassword = await bcrypt.hash(
      data.get("password") as string,
      10
    );

    const user = await db.query(
      "INSERT INTO users(username, password, email, userrole) VALUES($1, $2, $3, $4) RETURNING userid, username, email, userrole",
      [
        data.get("username") as string,
        hashedPassword,
        data.get("email") as string,
        "member",
      ]
    );

    const userTOKEN = jwt.sign(user.rows[0], process.env.JWT_SECRET as string);

    await db.end();

    return { success: true, userJWT: userTOKEN };
  } catch (error) {
    console.error(error);
    return { error: "Unexpected Server Error" };
  }
}
