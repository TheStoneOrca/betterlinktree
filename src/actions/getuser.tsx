"use server";

import jwt from "jsonwebtoken";

export default async function getUser(userJWT: string) {
  try {
    const user = jwt.verify(userJWT, process.env.JWT_SECRET as string);
    return { success: true, user: user };
  } catch (error) {
    return { error: error };
  }
}
