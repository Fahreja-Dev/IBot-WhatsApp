export function sizeFile(byte, decimals = 2) {
  if (!+byte) return "0 Bytes";

  const resultDecimal = decimals < 0 ? 0 : decimals;
  const nameSize = ["Bytes", "Kb", "Mb", "Gb", "Tb", "Pb", "Eb", "Zb", "Yb"];

  const resultMath = Math.floor(Math.log(byte) / Math.log(1024));

  return `${parseFloat(
    (byte / Math.pow(1024, resultMath)).toFixed(resultDecimal)
  )} ${nameSize[resultMath]}`;
}
