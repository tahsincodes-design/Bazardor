export const toBn = (n: number | string): string =>
  String(n).replace(/\d/g, (d) => "০১২৩৪৫৬৭৮৯"[Number(d)]);

export const money = (n: number): string => {
  if (typeof n !== "number" || isNaN(n)) return "০";
  return toBn(Number.isInteger(n) ? n.toLocaleString("en-US") : n.toFixed(2));
};

export const unitBn: Record<string, string> = {
  kg: "কেজি",
  litre: "লিটার",
  dozen: "ডজন",
  piece: "পিস",
};