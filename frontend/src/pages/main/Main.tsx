import React, { useEffect, useRef, useState } from "react";
import { Button, Layout, Statistic } from "antd";
import styles from "./Main.module.css";
import { Header, Content, Footer } from "antd/es/layout/layout";
import { Skill } from "@/components/skill/Skill";

export const Main: React.FC = () => {
  const [coins, setCoins] = useState<number>(0);
  const [tickerId, setTickerId] = useState<number>(0);
  const coinsRef = useRef(coins);
  
  coinsRef.current = coins;

  const updateTicker = (level: number) => { 
    if (tickerId !== null) {
      clearInterval(tickerId);
    }

    setTickerId(setInterval(() => {
      setCoins(c => c + level);
    }, 5000)
    );
  }

  useEffect(() => {
    const save = () => {
      localStorage.setItem("coins", String(coinsRef.current));
    }

    const load = () => {
      const oldCoins = localStorage.getItem("coins");

      if (oldCoins !== null) {
        setCoins(Number(oldCoins));
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
          <Skill coins={coins} cost={5} onSpend={(l) => { updateTicker(l); setCoins(coins - 5); }}/>
        </Footer>
      </Layout>
    </div>
  );
}
