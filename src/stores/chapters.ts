import { Logger } from 'mayo-logger';
import { getIndicesByName } from '../modals/SourateConfiguration/getIndicesByName';
import { convertIndicesToRanges } from '../modals/SourateConfiguration/convertIndicesToRanges';
import { makeAutoObservable, action } from "mobx";
import { Sourate } from "../models/Sourate";

class ChapterStore {
  data: Sourate | null = null;
  loading = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this, {
      fetchData: action.bound
    });
  }

  async fetchData(ranges?: string[]) {
    try {
      this.setLoading(true);
      this.setData(null);
      this.setError(null);

      const indices = getIndicesByName(ranges);
      Logger.info(`Indices: ${JSON.stringify(indices)}`, null, { tag: 'loadChapters' });
  
      const chapterRanges = convertIndicesToRanges(indices);
      Logger.info(`Chapter Ranges: ${JSON.stringify(chapterRanges)}`, null, { tag: 'loadChapters' });
  
      const url = `http://test.similar.mayorana.ch/chapters?ranges=${chapterRanges.join(',')}`;
  
      console.log('Fetching chapters from the API...');
      const response = await fetch(url);
      console.log('API chapters call successful');
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
  setData(data: Sourate | null) {
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

const chapterStore = new ChapterStore();
export default chapterStore;
