export function deepFreeze<T = {}>(obj: T): Readonly<T> {
  const propNames = Object.getOwnPropertyNames(obj);
  for (const name of propNames) {
    const _name = name as keyof typeof obj;
    const value = obj[_name];
    obj[_name] = (value && typeof value === 'object' ? deepFreeze(value) : value) as T[typeof _name];
  }
  return Object.freeze(obj);
}

export function prettyString(sentence: string) {
  return sentence
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.substring(1).toLocaleLowerCase())
    .join(' ');
}
