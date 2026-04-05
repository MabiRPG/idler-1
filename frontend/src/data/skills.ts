export interface SkillDef {
  id: string;
  name: string;
  description: string;
  cost: (level: number) => number;
  effect: (level: number) => string;
  coinChange: (level: number) => number;
  interval: number;
}

export const SKILLS: SkillDef[] = [
  {
    id: "autoClicker",
    name: "Auto Clicker",
    description: "Earn coins automatically every 5 seconds",
    cost: (level) => 5 + (level * 2),
    effect: (level) => `+${level}/5s`,
    coinChange: (level) => level,
    interval: 5000,
  },
  {
    id: "autoClicker2",
    name: "Auto Clicker 2",
    description: "Earn coins automatically every 5 seconds",
    cost: (level) => 20 + (level * 5),
    effect: (level) => `+${level * 20}/5s`,
    coinChange: (level) => level * 20,
    interval: 5000,
  },
  {
    id: "autoClicker3",
    name: "Auto Clicker 3",
    description: "Earn coins automatically every 5 seconds",
    cost: (level) => 50 + (level * 15),
    effect: (level) => `+${level * 50}/5s`,
    coinChange: (level) => level * 50,
    interval: 5000,
  },
];
