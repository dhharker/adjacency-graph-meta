// @flow

export const compareNumbers = (a: number, b: number) => {
  if (a > b) return 1;
  if (a < b) return -1;
  return 0;
};

export const tail = <T>(arr: Array<T>, offset: number = 0): T => {
  if (!arr || !Array.isArray(arr) || !arr.length || arr.length <= offset)
    throw new Error("Not array or out of bounds");
  return arr[arr.length - 1 - offset];
};
