import { getIndicesByName } from "../modals/SourateConfiguration/getIndicesByName";
import { loadFromCache } from "../database/loadFromCache";
import { writeToCache } from "../database/writeToCache";

export const getBestIndex = async (selectedSourates: string[], storageKey: string) => {
  // Use type assertion to tell TypeScript that you expect a string.
  let storedIndexStr = await loadFromCache(storageKey) as string;

  // Since you now have asserted that storedIndexStr is a string,
  // you can safely use it in operations expecting a string.
  let storedIndexInt = parseInt(storedIndexStr, 10) > 1 ? parseInt(storedIndexStr, 10) : 2;

  const indices = getIndicesByName(selectedSourates);
  const bestIndex = indices.includes(storedIndexInt) ? storedIndexInt : indices[0];

  await writeToCache(storageKey, bestIndex.toString());

  return bestIndex;
};
