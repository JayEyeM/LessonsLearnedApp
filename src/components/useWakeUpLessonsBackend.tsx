import { useEffect } from "react";

const useWakeUpLessonsBackend = () => {
  useEffect(() => {
    const wakeUp = async () => {
      try {
        await fetch("https://lessonslearnedbackend.onrender.com/lessons");
        console.log("Lessons backend pinged!");
      } catch (err) {
        console.error("Error pinging lessons backend:", err);
      }
    };

    wakeUp();
  }, []);
};

export default useWakeUpLessonsBackend;
