export type RootStackParamList = {
  ErrorScreen: { errorMessage: string };
  Login: undefined;
  Home: undefined;
  SignIn: { config?: any };
  Lesson: {
    count?: number;
    goodCount?: number;
    wrongCount?: number;
  };
  Exercise: {
    settings: any,
    kalima?: string;
    exercises?: any;
    chapterName?: string;
  };
};