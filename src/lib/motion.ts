export const easeOut = [0.22, 1, 0.36, 1] as const;

export const easeCinematic = [0.16, 1, 0.3, 1] as const;

export const springSoft = { stiffness: 170, damping: 28, mass: 0.75 } as const;

export const springSnappy = { stiffness: 240, damping: 26, mass: 0.55 } as const;

/** UI hover / accordion / nav — 300–500ms. */
export const durationUi = 0.4;

/** Section and group reveals — 600–700ms. */
export const durationReveal = 0.65;

/** Card stagger in seconds (70ms). */
export const staggerCard = 0.07;
