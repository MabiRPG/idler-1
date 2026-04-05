import React, { useEffect, useRef, useState } from "react";
import { Button, Layout, Statistic } from "antd";
import styles from "./Main.module.css";
import { Header, Content } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import { Skill } from "@/components/skill/Skill";
import { SKILLS } from "@/data/skills";

export const Main: React.FC = () => {
  const [coins, setCoins] = useState<number>(0);
  const coinsRef = useRef(coins);

  coinsRef.current = coins;

  const addCoins = React.useCallback((amount: number) => {
    setCoins((c) => c + amount);
  }, []);

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
        <Layout>
          <Sider width="auto" onClick={(e: React.MouseEvent) => e.stopPropagation()}>
            {SKILLS.map((skill) => (
              <Skill
                key={skill.id}
                skill={skill}
                coins={coins}
                addCoins={addCoins}
                onSpend={(cost) => { setCoins((c) => c - cost); }}
              />
            ))}
          </Sider>
          <Content onClick={() => setCoins((c) => c + 1)}>
            Click to earn coins
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}
