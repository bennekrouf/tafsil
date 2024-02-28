import { useState, useEffect } from 'react';
import loadFromSupa from '../database/loadFromSupa';
import { Logger } from 'mayo-logger';
import { getBestIndex } from '../utils/getBestIndex';
import { UserState } from '../models/UserState';
import { loadFromCache } from '../database/loadFromCache';
import { writeToCache } from '../database/writeToCache';

export const useFetchUser = <T extends UserState>(initialState: T): [T, (data: T) => Promise<any>, boolean] => {
  const [userSettings, setUserSettings] = useState<T>(initialState);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const user = { email: "mohamed.bennekrouf@gmail.com" };
    if (!user) return; // Ensure user exists before proceeding with fetching data

    const loadData = async () => {
      try {
        setLoading(true);
        let savedState: T | null = await loadFromCache(user.email);
        if (!savedState) {
          savedState = (await loadFromSupa() as unknown) as T;
        }
        console.log(`Saved user settings: ${JSON.stringify(savedState)}`);

        if (savedState?.ranges?.length) {
          Logger.info('Fetching currentIndex from storage', { tag: 'Lesson' });
          savedState.currentIndex = await getBestIndex(savedState?.ranges, 'currentIndex');
          savedState.selectedChapter = await getBestIndex(savedState?.ranges, 'selectedChapter');
          await updateUserSettings({ ...savedState });
        } else {
          await updateUserSettings({ ...initialState, ok: true });
        }
      } catch (error) {
        console.error('Failed to fetch the data from storage', error);
        setUserSettings(initialState);
      } finally {
        setLoading(false);
      }
    };

    loadData(); // Call loadData immediately after defining it

  }, [initialState]); // Ensure useEffect runs whenever initialState changes

  const updateUserSettings = async (data: T) => {
    if (JSON.stringify(data) === JSON.stringify(userSettings)) {
      // Data is the same as current user settings, no need to update
      return;
    }

    try {
      if (data?.ranges?.length) {
        data.currentIndex = await getBestIndex(data?.ranges, 'currentIndex');
        data.selectedChapter = await getBestIndex(data?.ranges, 'selectedChapter');
      }
      writeToCache('currentIndex', data.currentIndex);
      writeToCache('selectedChapter', data.selectedChapter);
      setUserSettings(data);
    } catch (error) {
      console.error('Failed to save the data to storage', error);
    }
  };

  return [userSettings, updateUserSettings, isLoading];
};
