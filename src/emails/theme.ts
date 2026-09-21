// Mirrors tailwind.config's color tokens (src/app/globals.css @theme).
// React Email renders outside Tailwind's runtime, so these are duplicated
// here deliberately — keep in sync if the palette ever changes.
export const emailColors = {
  bone: "#F6F3ED",
  stone: "#E7E1D5",
  midnight: "#1D2430",
  champagne: "#B9A785",
  umber: "#7B6746",
};

export const emailFonts = {
  display: "'Cormorant Garamond', Georgia, 'Times New Roman', serif",
  body: "Georgia, 'Times New Roman', serif",
  label: "Helvetica, Arial, sans-serif",
};
