export type MainStackParamList = {
    ErrorScreen: { errorMessage: string };
    InitialScreen: undefined;
    HomeScreen: undefined;
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