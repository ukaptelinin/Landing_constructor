import { Quiz, QuizItem } from "@/shared/types/quiz-types";
import { create } from "zustand";

interface IQuizState {
  quizProject: Quiz;
  quizPage: QuizItem;
}

interface IQuizActions {
  createNewQuiz: (title: string) => void;
  resetQuiz: () => void;
  addQuizPage: (page: QuizItem) => void;
}

export const createDefaultQuizState = (): IQuizState => ({
  quizProject: {
    id: "",
    title: "",
    quizPages: [],
  },
  quizPage: {
    title: "",
    groupName: "",
    fields: { options: "" },
    mapLabels: new Map<string, string>(), // ✅
    pageType: "CHECKBOX",
  },
});

export const defaultInitQuizState: IQuizState = createDefaultQuizState();

export type QuizStore = IQuizState & IQuizActions;

const generateId = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : Math.random().toString(36).slice(2);

export const useAppStore = create<QuizStore>()((set) => ({
  ...createDefaultQuizState(),

  createNewQuiz: (title) =>
    set(() => ({
      ...createDefaultQuizState(),
      quizProject: {
        id: generateId(),
        title,
        quizPages: [],
      },
    })),

  resetQuiz: () => set(() => createDefaultQuizState()),

  addQuizPage: (page) =>
    set((state) => ({
      quizProject: {
        ...state.quizProject,
        quizPages: [...state.quizProject.quizPages, page],
      },
    })),
}));
