import { UserState } from "./UserState";

export type HeaderProps = {
    userState: UserState
    setUserState: any,
    loading: boolean,
    count: number
    goodCount:number,
    wrongCount:number,
    onSelectExercise: () => void,
  };