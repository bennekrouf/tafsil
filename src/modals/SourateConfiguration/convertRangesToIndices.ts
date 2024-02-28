export function convertRangesToIndices(ranges: string[]) {
    const indices:number[] = [];
  
    ranges.forEach(range => {
      if (range.includes('-')) {
        // It's a range, split it into start and end, then expand
        const [start, end] = range.split('-').map(Number);
        for (let i = start; i <= end; i++) {
          indices.push(i);
        }
      } else {
        // It's a single number, just add it
        indices.push(Number(range));
      }
    });
  
    return indices?.sort((a, b) => a - b);
  }