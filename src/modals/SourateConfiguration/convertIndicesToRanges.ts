export function convertIndicesToRanges(indices: number[]) {
  if(!indices?.length) return [];
    // Sort indices to ensure they are in order
    indices?.sort((a, b) => a - b);
  
    const ranges = [];
    let rangeStart = indices[0];
    let prev = indices[0];
  
    for (let i = 1; i < indices.length; i++) {
      // If current index is not consecutive, end the current range
      if (indices[i] !== prev + 1) {
        ranges.push(ft(rangeStart,prev));
        rangeStart = indices[i];
      }
      prev = indices[i];
    }
  
    // Add the last range
    ranges.push(ft(rangeStart,prev));
    return ranges;
  }

  const ft = (rangeStart:number, prev:number) => {
    return rangeStart === prev ? `${rangeStart}` : `${rangeStart}-${prev}`
  }