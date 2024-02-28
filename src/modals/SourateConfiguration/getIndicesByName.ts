import labels from './labels.json';

type Entry = {
    name: string;
    start: number;
    end: number;
    section: string;
};
  
const entries: Entry[] = labels as Entry[];

export function getIndicesByName(names?: string[]): number[] {
  if(!names) return [];
  const ranges = entries
    .filter(entry => names?.includes(entry.name))
    .map(entry => {
      const start = entry.start;
      const end = entry.end;
      return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    });

  // Flatten the array of arrays into a single array
  const flattenedArray = ([] as number[]).concat(...ranges);

  // Create a Set to remove duplicates and then convert it back to an array
  const distinctIndices = Array.from(new Set(flattenedArray));

  // Sort numerically
  return distinctIndices.sort((a, b) => a - b);
}
  
// Example usage:
//   const namesToSearch = ["الربع الأول"];
//   const indices = getIndicesByName(namesToSearch);
//   console.log(indices); // Should log: [1, 2, 3, 4, 5, 6]
  