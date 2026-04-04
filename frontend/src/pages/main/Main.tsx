import { useEffect, useRef, useState } from "react";
import { Button, Layout, Statistic } from "antd";
import styles from "./Main.module.css";
import { Header, Content, Footer } from "antd/es/layout/layout";

export default function Main() {
  const [coins, setCoins] = useState(0);
  const [autoClicker, setAutoClicker] = useState(0);
  const coinsRef = useRef(coins);
  const autoClickerRef = useRef(autoClicker);

  coinsRef.current = coins;
  autoClickerRef.current = autoClicker;

  useEffect(() => {
    if (autoClicker === 0) return;

    const id = setInterval(() => {
      setCoins((c) => c + autoClicker);
    }, 5000);

    return () => clearInterval(id);
  }, [autoClicker]);

  useEffect(() => {
    const save = () => {
      localStorage.setItem("coins", String(coinsRef.current));
      localStorage.setItem("autoClicker", String(autoClickerRef.current));
    }

    const load = () => {
      const oldCoins = localStorage.getItem("coins");
      const oldAutoClicker = localStorage.getItem("autoClicker");

      if (oldCoins !== null) {
        setCoins(Number(oldCoins));
      }

      if (oldAutoClicker !== null) {
        setAutoClicker(Number(oldAutoClicker));
      }
    }

    load();
    window.addEventListener("beforeunload", save);

    return () => {
      window.removeEventListener("beforeunload", save);
      save();
    };
  }, [])


  return (
    <div className={styles.main}>
      <Layout>
        <Header>
          <Statistic title="Coins" value={coins} />
        </Header>
        <Content onClick={() => setCoins((c) => c + 1)}>
          Click to earn coins
        </Content>
        <Footer onClick={(e) => e.stopPropagation()}>
          <Button
            type="primary"
            danger
            disabled={coins < 5}
            onClick={() => {
              setCoins((c) => c - 5);
              setAutoClicker((p) => p + 1);
            }}
          >
            Spend 5 Coins
          </Button>
          <Statistic title="Level" value={autoClicker} />
        </Footer>
      </Layout>
    </div>
  );
}
