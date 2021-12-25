export const safe = <T>(func: (...params: any) => T, value: T) => {
  try {
    return func();
  } catch (err) {
    return value;
  }
};

export const limitTextLength = (text: string, max: number) => {
  try {
    if (!text.length) {
      throw new Error('Empty string');
    }
    if (text.length >= max) {
      return [text.slice(0, max), '...'].join('');
    }
    return text;
  } catch (err) {
    throw err;
  }
};
