function intersectFileId(arr1, arr2) {
  let result = 0;

  const map = arr1.reduce((acc, i) => {
    acc[i] = acc[i] ? acc[i] + 1 : 1;
    return acc;
  }, {});

  for (let i = 0; i < arr2.length; i++) {
    const current = arr2[i];
    const count = map[current];

    if (count && count > 0) {
      result++;
      map[current] -= 1;
    }
  }
  return result;
}

export default intersectFileId;
