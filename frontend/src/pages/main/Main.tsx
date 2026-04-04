import { useEffect, useState } from "react";
import { Button, Statistic } from "antd";

export default function Main() {
  const [coins, setCoins] = useState(() => {
    const saved = localStorage.getItem("coins");
    return saved ? Number(saved) : 0;
  });
  const [level, setLevel] = useState(0);

  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.setItem("coins", String(coins));
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [coins]);

  useEffect(() => {
    if (level === 0) return;
    const id = setInterval(() => {
      setCoins((c) => c + level);
    }, 5000);
    return () => clearInterval(id);
  }, [level]);

  return (
    <div
      onClick={() => setCoins((c) => c + 1)}
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: 48,
      }}
    >
      <Statistic title="Coins" value={coins} />
      <div
        style={{ display: "flex", alignItems: "center", gap: 16, marginTop: "auto", marginBottom: 48 }}
        onClick={(e) => e.stopPropagation()}
      >
        <Button
          type="primary"
          danger
          disabled={coins < 5}
          onClick={() => {
            setCoins((c) => c - 5);
            setLevel((p) => p + 1);
          }}
        >
          Spend 5 Coins
        </Button>
        <Statistic title="Level" value={level} />
      </div>
    </div>
  );
}
