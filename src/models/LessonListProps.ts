import { Verse } from "./Verse";

export interface LessonListProps {
  verses: Verse[];
  similars: Verse[];
  opposites: Verse[];
  kalima?: string;
}