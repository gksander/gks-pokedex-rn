export const truncateStatName = (name: string) =>
  name
    .replace(/special/i, "Sp")
    .replace(/attack/i, "Atk")
    .replace(/defense/i, "Def");
