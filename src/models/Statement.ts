import { VerseOutput } from "./VerseOutput";

export interface Statement {
    kalima: string;
    verse: VerseOutput;
    has_opposites: boolean;
}