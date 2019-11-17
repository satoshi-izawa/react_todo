// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isShallowEqual = (a: any, b: any) => {
  const type = typeof a;
  if (type !== typeof b) {
    return false;
  }
  if (type !== 'object' || !a || !b) { // object以外、またはどちらかがnullの場合、等号比較で判別できる
    return a === b;
  }
  const keys = Object.keys(a);
  if (keys.length !== Object.keys(b).length) {
    return false;
  }
  return !keys.some(key => a[key] !== b[key]); // 一致しないものが見つかった時点でfalse
};
