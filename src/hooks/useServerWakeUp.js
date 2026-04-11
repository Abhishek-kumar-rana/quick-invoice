import { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { AppContext } from "../context/AppContext";

const useServerWakeUp = () => {
  const [isServerAwake, setIsServerAwake] = useState(false);
  const [loading, setLoading] = useState(true);
  const intervalRef = useRef(null);
  const {baseURL} = useContext(AppContext);

  const pingServer = async () => {
    try {
      const start = Date.now();
      await axios.get(`${baseURL}/invoices/hello`);
      const duration = Date.now() - start;

      // If response comes, server is awake
      setIsServerAwake(true);
      setLoading(false);

    //   toast.success(`Server awake 🚀, took ${duration} ms`);

      // Switch to slow polling (40s)
      clearInterval(intervalRef.current);
      intervalRef.current = setInterval(pingServer, 40000);
    } catch (error) {
      console.log("Server sleeping 😴");

      setIsServerAwake(false);
      setLoading(true);

      // Retry fast (5s)
      clearInterval(intervalRef.current);
      intervalRef.current = setInterval(pingServer, 5000);
    }
  };

  useEffect(() => {
    pingServer(); // initial call

    intervalRef.current = setInterval(pingServer, 5000);

    return () => clearInterval(intervalRef.current);
  }, [baseURL]);

  return { isServerAwake, loading };
};

export default useServerWakeUp;