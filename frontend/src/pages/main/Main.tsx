import React, { useEffect, useRef, useState } from "react";
import { Layout, Progress, Statistic } from "antd";
import styles from "./Main.module.css";
import { Header, Content } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import { Skill } from "@/components/skill/Skill";
import { SKILLS } from "@/data/skills";

export const Main: React.FC = () => {
  const [coins, setCoins] = useState<number>(0);
  const [monsterLevel, setMonsterLevel] = useState<number>(1);
  const [monsterMaxHealth, setMonsterMaxHealth] = useState<number>(10);
  const [monsterHealth, setMonsterHealth] = useState<number>(monsterMaxHealth);
  const [activeSkillId, setActiveSkillId] = useState<string | null>(null);

  const coinsRef = useRef(coins);
  const monsterMaxHealthRef = useRef(monsterMaxHealth);
  const monsterHealthRef = useRef(monsterHealth);

  coinsRef.current = coins;
  monsterMaxHealthRef.current = monsterMaxHealth;
  monsterHealthRef.current = monsterHealth;

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

  return (
    <div className={styles.main}>
      <Layout>
        <Header>
          <Statistic title="Coins" value={coins} />
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
                isActive={activeSkillId === skill.id}
                onEquip={() => setActiveSkillId(skill.id)}
                onDamage={onDamage}
                onSpend={(cost) => { setCoins((c) => c - cost); }}
              />
            ))}
          </Sider>
          <Content onClick={() => onDamage(1)}>
            <div className={styles.healthBar}>
              <Progress
                percent={Math.round((monsterHealth / monsterMaxHealth) * 100)}
                showInfo={false}
                strokeColor={`hsl(${Math.round((monsterHealth / monsterMaxHealth) * 120)}, 80%, 45%)`}
                size={[undefined as unknown as number, 25]}
              />
              <span className={styles.healthText}>{monsterHealth} / {monsterMaxHealth}</span>
            </div>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}
