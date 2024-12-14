import axios from "axios";
import { useEffect, useState } from "react";

export function useUsername() {
  const [username, setUsername] = useState("");

  useEffect(() => {
    axios.get("/username.json").then((r) => {
      setUsername(r.data);
    });
  }, []);

  return username;
}
