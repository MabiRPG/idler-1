import { Button, Statistic } from "antd";
import React, { useEffect, useRef, useState } from "react";

import styles from './Skill.module.css';
import { SkillDef } from '../../data/skills';

interface SkillProps {
  skill: SkillDef;
  coins: number;
  isActive: boolean;
  onEquip: () => void;
  onDamage: (amount: number) => void;
  onSpend: (cost: number) => void;
}

export const Skill: React.FC<SkillProps> = ({ skill, coins, isActive, onEquip, onDamage, onSpend }: SkillProps) => {
  const [level, setLevel] = useState<number>(0);
  const levelRef = useRef(level);

  levelRef.current = level;

  const currentCost = skill.cost(level);

  const handleSpend = () => {
    const newLevel = level + 1;
    setLevel(newLevel);
    onSpend(currentCost);
  };

  const tickRef = useRef(() => {});
  tickRef.current = () => onDamage(skill.dpsChange(level));

  useEffect(() => {
    if (level === 0 || !isActive) return;

    const id = setInterval(() => tickRef.current(), skill.interval);

    return () => clearInterval(id);
  }, [level > 0, skill.interval, isActive])

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
      <Button
        type={isActive ? "primary" : "default"}
        disabled={level === 0}
        onClick={onEquip}
      >
        {isActive ? "Equipped" : "Equip"}
      </Button>
      <Statistic title="Level" value={level} />
      <Statistic title="Effect" value={skill.effect(level)} />
    </div>
  );
}
