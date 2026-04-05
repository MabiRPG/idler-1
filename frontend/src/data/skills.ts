export interface SkillDef {
  id: string;
  name: string;
  description: string;
  cost: (level: number) => number;
  effect: (level: number) => string;
  interval: number;
}

export const SKILLS: SkillDef[] = [
  {
    id: "autoClicker",
    name: "Auto Clicker",
    description: "Earn coins automatically every 5 seconds",
    cost: (level) => 5 + (level * 2),
    effect: (level) => `+${level}/5s`,
    interval: 5000,
  },
];
