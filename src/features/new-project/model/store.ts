import { PageType, Quiz, QuizItem } from "@/shared/types/quiz-types";
import { create } from "zustand";
import { useShallow } from "zustand/react/shallow";

interface IQuizState {
  quizProject: Quiz;
  quizPage: QuizItem;
}

interface IQuizActions {
  createNewQuiz: (title: string) => void;
  createQuizPage: (title: string, pageType: PageType) => void;
  resetQuiz: () => void;
  resetQuizPage: () => void;
  addQuizPage: (page: QuizItem) => void;
}

export const createDefaultQuizPage = (
  title = "",
  pageType: PageType = "CHECKBOX",
): QuizItem => ({
  title,
  groupName: "",
  fields: { options: "" },
  mapLabels: new Map<string, string>(),
  pageType,
});

export const createDefaultQuizState = (): IQuizState => ({
  quizProject: {
    id: "",
    title: "",
    quizPages: [],
  },
  quizPage: createDefaultQuizPage(),
});

export const defaultInitQuizState: IQuizState = createDefaultQuizState();

export type QuizStore = IQuizState & IQuizActions;

const generateId = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : Math.random().toString(36).slice(2);

export const useQuizStore = create<QuizStore>()((set) => ({
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

  createQuizPage: (title, pageType) =>
    set((state) => {
      const nextPage = createDefaultQuizPage(title, pageType);

      return { quizPage: nextPage };
    }),

  resetQuiz: () => set(() => createDefaultQuizState()),
  resetQuizPage: () =>
    set(() => ({ quizPage: createDefaultQuizPage("", "CHECKBOX") })),

  addQuizPage: (page) =>
    set((state) => ({
      quizProject: {
        ...state.quizProject,
        quizPages: [...state.quizProject.quizPages, page],
      },
    })),
}));

export const useQuizProject = () => useQuizStore((state) => state.quizProject);
export const useQuizPage = () => useQuizStore((state) => state.quizPage);

export const useQuizActions = () =>
  useQuizStore(
    useShallow((state) => ({
      createNewQuiz: state.createNewQuiz,
      createQuizPage: state.createQuizPage,
      resetQuiz: state.resetQuiz,
      resetQuizPage: state.resetQuizPage,
      addQuizPage: state.addQuizPage,
    })),
  );
