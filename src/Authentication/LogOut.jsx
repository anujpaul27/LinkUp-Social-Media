import React, { useContext, useEffect } from "react";
import { UserContext } from "../Context/ContextProvider";
import { useNavigate } from "react-router";

const LogOut = () => {
  const { SignOut } = useContext(UserContext);
  const navigation = useNavigate();
  useEffect(() => {
    SignOut();
    navigation("/login");
  }, [SignOut,navigation]);
  return <div></div>;
};

export default LogOut;
