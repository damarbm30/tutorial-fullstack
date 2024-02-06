import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Missing() {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(5);

  useEffect(() => {
    if (timeLeft === 0) {
      setTimeLeft(null);
      navigate("/");
    }

    if (!timeLeft) return;

    const interval = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    // avoid memory leaks
    return () => clearInterval(interval);
  }, [timeLeft]);

  return (
    <section className="flex h-screen flex-col items-center justify-center bg-zinc-950 text-white">
      <h1>Error 404: Page Not Found</h1>
      <p>You will be redirected to Home on {timeLeft} seconds</p>
    </section>
  );
}
