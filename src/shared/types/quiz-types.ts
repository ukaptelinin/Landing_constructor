export type PageType = "TEXT" | "CHECKBOX" | "RADIO" | "SUBMIT";

export interface QuizItem {
  title: string;
  groupName: string;
  fields: object;
  mapLabels: Map<string, string>;
  pageType: PageType;
}

export interface Quiz {
  id: string;
  title: string;
  quizPages: QuizItem[];
}

export interface QuizList {
  email: string;
  quizes: Quiz[];
}
