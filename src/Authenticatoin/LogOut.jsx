import React, { useContext, useEffect } from "react";
import { UserContext } from "../Context/ContextProvider";
import { useNavigate } from "react-router";

const LogOut = () => {
  const { LogOut } = useContext(UserContext);
  const navigation = useNavigate();
  useEffect(() => {
    LogOut();
    navigation("/login");
  }, [LogOut,navigation]);
  return <div></div>;
};

export default LogOut;
