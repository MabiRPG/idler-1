import { Button, Statistic } from "antd";
import React, { useEffect, useRef, useState } from "react";

import styles from './Skill.module.css';
import { SkillDef } from '../../data/skills';

interface SkillProps {
  skill: SkillDef;
  coins: number;
  onSpend: (cost: number, level: number) => void;
}

export const Skill: React.FC<SkillProps> = ({ skill, coins, onSpend }: SkillProps) => {
  const [level, setLevel] = useState<number>(0);
  const levelRef = useRef(level);

  levelRef.current = level;

  const currentCost = skill.cost(level);

  const handleSpend = () => {
    const newLevel = level + 1;
    setLevel(newLevel);
    onSpend(currentCost, newLevel);
  };

  useEffect(() => {
    const key = `skill_${skill.id}_level`;

    const save = () => {
      localStorage.setItem(key, String(levelRef.current));
    }

    const load = () => {
      const saved = localStorage.getItem(key);

      if (saved !== null) {
        setLevel(Number(saved));
      }
    }

    load();
    window.addEventListener("beforeunload", save);

    return () => {
      window.removeEventListener("beforeunload", save);
      save();
    };
   }, [skill.id])

  return (
    <div className={styles.skill}>
      <Button
        type="primary"
        danger
        disabled={coins < currentCost}
        onClick={handleSpend}
      >
        {skill.name} - {currentCost} Coins
      </Button>
      <Statistic title="Level" value={level} />
      <Statistic title="Effect" value={skill.effect(level)} />
    </div>
  );
}
