export type ColorOption =
  "red" | "yellow" | "green" | "blue" | "purple" | "orange" | "pink" | "teal";
export type ColorOptionDetail = {
  background: `#${string}`;
  borderColor: `#${string}`;
};

export const useColorOptions = (): Record<ColorOption, ColorOptionDetail> => {
  return {
    red: {
      background: "#fdc1c1",
      borderColor: "#e57373",
    },
    yellow: {
      background: "#fff3cd",
      borderColor: "#ffd700",
    },
    green: {
      background: "#c3f8d6",
      borderColor: "#7ed492",
    },
    blue: {
      background: "#b7e1ff",
      borderColor: "#5ca7eb",
    },
    purple: {
      background: "#e0cfff",
      borderColor: "#9370db",
    },
    orange: {
      background: "#ffe6cc",
      borderColor: "#ffb86c",
    },
    pink: {
      background: "#fbcfe8",
      borderColor: "#e91e63",
    },
    teal: {
      background: "#b2dfdb",
      borderColor: "#00bcd4",
    },
  };
};
