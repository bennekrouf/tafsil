import { Logger } from 'mayo-logger';
import { getIndicesByName } from '../modals/SourateConfiguration/getIndicesByName';
import { makeAutoObservable, action } from "mobx";
import { LessonListProps } from '../models/LessonListProps';

class LessonStore {
  data: LessonListProps | null = null;
  loading = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this, {
      fetchData: action.bound
    });
  }

  async fetchData(chapterNo?:number, ranges?: string[]) {
    try {
      this.setLoading(true);
      this.setData(null);
      this.setError(null);

      const indices = getIndicesByName(ranges);

      // const url = `${process.env.DOMAIN}/similars/${chapterNo}?ranges=${convertIndicesToRanges(indices)}`;
      // const url = `http://test.similar.mayorana.ch/similars/${chapterNo ?? 2}?ranges=${convertIndicesToRanges(indices)}`;
      const url='http://test.similar.mayorana.ch/similars/90?ranges=90-114';
    
      Logger.info(`Fetching lessons from the API...`, null, { tag: 'loadLessons' });
      const response = await fetch(url);
      Logger.info(`Lessons API call successful`, `${JSON.stringify(response)}`, { tag: 'loadLessons' });

      if (!response.ok) {
        throw new Error('Failed to fetch lessons ${JSON.stringify(response)}');
      }
      const jsonData = await response.json();
      this.setData(jsonData);
    } catch (error:any) {
      console.error('Error fetching data:', error.message);
      this.setError(error.message);
    } finally {
      this.setLoading(false);
    }
  }

  // Action to set data
  setData(data: LessonListProps | null) {
    this.data = data;
  }

  // Action to set loading state
  setLoading(loading: boolean) {
    this.loading = loading;
  }

  // Action to set error state
  setError(error: string | null) {
    this.error = error;
  }
}

const lessonStore = new LessonStore();
export default lessonStore;
