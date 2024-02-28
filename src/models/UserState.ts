import { AnswerStat } from "./AnswerStat";

export const initialState: UserState = {
  answerStats: [],
  ranges: ["حافظ"],
  selectedChapter: 2,
  currentIndex: 0,
};

export interface UserState {
  answerStats: AnswerStat[];
  ranges: string[];
  selectedChapter: number;
  currentIndex: number;
}