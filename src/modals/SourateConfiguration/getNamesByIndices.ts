import labels from './labels.json';

type Entry = {
    name: string;
    start: number;
    end: number;
    section: string;
};
const entries: Entry[] = labels as Entry[];

export function getNamesByIndices(indices: number[]): string[] {
  const sortedIndices = [...indices].sort((a, b) => a - b);
  const names = entries
    .filter(entry => {
      // Check if the sortedIndices array includes all indices of the entry's range
      return Array.from({ length: entry.end - entry.start + 1 }, (_, i) => entry.start + i)
        .every(index => sortedIndices.includes(index));
    })
    .map(entry => entry.name);
  
  return names;
}