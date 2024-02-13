"use client";

import getUser from "@/actions/getuser";
import { useEffect, useState } from "react";
import reactsecurestorage from "react-secure-storage";

type user = {
  userid: bigint;
  username: string;
  email: string;
  userrole: "member" | "admin" | "owner";
};

type UserHookData = {
  isLoaded: boolean;
  isSignedIn: boolean;
  user: user | null;
};

export default function useUser() {
  const [userData, setUserData] = useState<UserHookData>({
    isLoaded: false,
    isSignedIn: false,
    user: null,
  });

  useEffect(() => {
    try {
      if (reactsecurestorage.getItem("user_token") === null) {
        setUserData({ isLoaded: true, isSignedIn: false, user: null });
      } else {
        getUser(reactsecurestorage.getItem("user_session") as string).then(
          (res) => {
            if (res.error) {
              setUserData({ isLoaded: true, isSignedIn: false, user: null });
            } else {
              setUserData({
                isLoaded: true,
                isSignedIn: true,
                user: res.user as user,
              });
            }
          }
        );
      }
    } catch (error) {
      console.error(error);
      setUserData({ isLoaded: true, isSignedIn: false, user: null });
    }
  }, []);
  return userData;
}
