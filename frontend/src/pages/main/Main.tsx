import React, { useCallback, useEffect, useRef, useState } from "react";
import { Button, Layout, Statistic } from "antd";
import styles from "./Main.module.css";
import { Header, Content } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import { Skill } from "@/components/skill/Skill";
import { SKILLS } from "@/data/skills";

export const Main: React.FC = () => {
  const [coins, setCoins] = useState<number>(0);
  const [dps, setDps] = useState<number>(0);
  const [monsterLevel, setMonsterLevel] = useState<number>(1);
  const [monsterMaxHealth, setMonsterMaxHealth] = useState<number>(10);
  const [monsterHealth, setMonsterHealth] = useState<number>(monsterMaxHealth);

  const coinsRef = useRef(coins);
  const monsterMaxHealthRef = useRef(monsterMaxHealth);
  const monsterHealthRef = useRef(monsterHealth);

  coinsRef.current = coins;
  monsterMaxHealthRef.current = monsterMaxHealth;
  monsterHealthRef.current = monsterHealth;

  // const monsterMaxHealth = (level: number) => 10 + (level + 1) * 100;

  const onUpgrade = (amount: number) => setDps(amount);

  const onDamage = (amount: number) => {
    if (monsterHealthRef.current - amount <= 0) {
      setMonsterLevel(v => v + 1);
    }
    else {
      setMonsterHealth(monsterHealthRef.current - amount);
    }
  };

  useEffect(() => { 
    if (monsterLevel > 1) {
      setCoins(v => v + monsterMaxHealthRef.current);
      setMonsterHealth(v => monsterMaxHealthRef.current * 2);
      setMonsterMaxHealth(v => v * 2);
    }
  }, [monsterLevel])

  // useEffect(() => {
  //   const save = () => {
  //     localStorage.setItem("coins", String(coinsRef.current));
  //   }

  //   const load = () => {
  //     const oldCoins = localStorage.getItem("coins");

  //     if (oldCoins !== null) {
  //       setCoins(Number(oldCoins));
  //     }
  //   }

  //   load();
  //   window.addEventListener("beforeunload", save);

  //   return () => {
  //     window.removeEventListener("beforeunload", save);
  //     save();
  //   };
  // }, [])

  return (
    <div className={styles.main}>
      <Layout>
        <Header>
          <Statistic title="Coins" value={coins} />
          {/* <Statistic title="DPS" value={dps} /> */}
          <Statistic title="Monster Level" value={monsterLevel} />
          <Statistic title="Monster Health" value={monsterHealth} />
        </Header>
        <Layout>
          <Sider width="auto" onClick={(e: React.MouseEvent) => e.stopPropagation()}>
            {SKILLS.map((skill) => (
              <Skill
                key={skill.id}
                skill={skill}
                coins={coins}
                onDamage={onDamage}
                onUpgrade={onUpgrade}
                onSpend={(cost) => { setCoins((c) => c - cost); }}
              />
            ))}
          </Sider>
          <Content onClick={() => onDamage(1)}>
            Click to earn coins
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}
