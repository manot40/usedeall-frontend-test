export function stringToRGB(str: string, a: number) {
  const hash = str.split('').reduce((acc, char) => {
    acc = (acc << 5) - acc + char.charCodeAt(0);
    return acc & acc;
  }, 0);

  const r = (hash & 0x00ff0000) >> 16;
  const g = (hash & 0x0000ff00) >> 8;
  const b = hash & 0x000000ff;

  return `rgba(${r}, ${g}, ${b}, ${a})`;
}
