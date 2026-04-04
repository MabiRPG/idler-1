import { Button, Statistic } from "antd";
import React, { useEffect, useRef, useState } from "react";

import styles from './Skill.module.css';

interface SkillProps {
  coins: number;
  cost: number;
  onSpend: (level: number) => void;
}

export const Skill: React.FC<SkillProps> = ({ coins, cost, onSpend }: SkillProps) => {
  const [level, setLevel] = useState<number>(0);
  const levelRef = useRef(level);

  levelRef.current = level;

  const handleSpend = () => {
    const newLevel = level + 1;
    setLevel(newLevel);
    onSpend(newLevel);
  };

  useEffect(() => {
    const save = () => {
      localStorage.setItem("level", String(levelRef.current));
    }

    const load = () => {
      const oldLevel = localStorage.getItem("level");

      if (oldLevel !== null) {
        setLevel(Number(oldLevel));
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
    <div className={styles.skill}>
      <div onClick={(e) => e.stopPropagation()}>
        <Button
          type="primary"
          danger
          disabled={coins < cost}
          onClick={handleSpend}
        >
          Spend {cost} Coins
        </Button>
        <Statistic title="Level" value={level} />
      </div>
    </div>
  );
}
