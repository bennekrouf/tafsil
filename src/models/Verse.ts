import { UngroupedText } from "./UngroupedText";

export interface Verse {
    chapter_no: number;
    verse_no: number;
    ungrouped_text: UngroupedText;
    sourate: string;
    background_color: string;
    color: string;
  }