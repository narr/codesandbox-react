import { useEffect } from "react";

export default function ErroableComponent() {
  useEffect(() => {
    // Returns a random integer from 1 to 10:
    const randomNumber = Math.floor(Math.random() * 10) + 1;
    if (randomNumber < 5) {
      throw new Error("Error occurred");
    }
  }, []);
  return "No error happened";
}
