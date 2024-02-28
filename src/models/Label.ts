export interface Label {
    name: string;
    start: number;
    end: number;
    section: "sourates" | "otherDivisions" | "quarters" | "all";
    h?: string;
    default?: boolean;
}