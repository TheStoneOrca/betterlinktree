"use server";

import pgInit from "./pgInit";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default async function LoginIn(data: FormData) {
  try {
    const database = await pgInit();

    if (database.error || !database.database) {
      return { error: "Unexpected Server Error" };
    }
    const db = database.database;
    let user;

    const checkUsername = await db.query(
      "SELECT * FROM users WHERE username = $1",
      [data.get("username") as any]
    );
    const checkEmail = await db.query("SELECT * FROM users WHERE email = $1", [
      data.get("email") as any,
    ]);
    if (checkUsername.rows.length === 0) {
      if (checkEmail.rows.length > 0) {
        user = checkEmail.rows[0];
      } else {
        return { error: "User does not exist!" };
      }
    } else {
      user = checkUsername.rows[0];
    }

    const checkPassword = await bcrypt.compare(
      data.get("password") as string,
      user.password
    );

    if (checkPassword) {
      return {
        success: true,
        userJWT: jwt.sign(user, process.env.JWT_SECRET as string),
      };
    } else {
      return { error: "Invalid username or password." };
    }
  } catch (error) {
    return { error: error };
  }
}
