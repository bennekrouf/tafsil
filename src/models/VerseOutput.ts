import { UngroupedText } from "./UngroupedText";

export type VerseOutput = {
  chapter_no: number;
  verse_no: number;
  sourate?: string;
  ungrouped_text?: UngroupedText;
}