import { observer } from "mobx-react-lite";
import chapterStore from "./stores/chapters";
import lessonStore from "./stores/lessons";
// import { convertIndicesToRanges } from '../modals/SourateConfiguration/convertIndicesToRanges';
import { useFetchUser } from "./hooks/useFetchUser";
import { UserState, initialState } from './models/UserState';
import { useVerifiedUser } from "./hooks/useVerifiedUser";
import { useEffect, useState } from "react";

function App() {
  const [userState, setUserState, loading] = useFetchUser<UserState>(initialState);
  const verifiedUser = useVerifiedUser();
  const [isUserVerified, setIsUserVerified] = useState(false);

  useEffect(() => {
    setIsUserVerified(!!verifiedUser); // Set isUserVerified based on the verification status
  }, [verifiedUser]);

  const handleClick = () => {
    chapterStore.fetchData(["الربع الأول"]);
    lessonStore.fetchData();
    // console.log(user);
  };

  if (loading) {
    return <p>Loading...</p>; // Display a loading indicator while fetching user data
  }

  if (!isUserVerified) {
    return <p>User is not verified. Please verify the user.</p>; // Display a message if user is not verified
  }

  return (
    <div className="container">
      <button onClick={handleClick} disabled={chapterStore.loading}>
        {chapterStore.loading ? 'Loading...' : 'Fetch Data Again'}
      </button>
      {chapterStore.error && <p>Error: {chapterStore.error}</p>}
      {chapterStore.data && <p>Data: {JSON.stringify(chapterStore.data)}</p>}
      {lessonStore.data && <p>Data: {JSON.stringify(lessonStore.data)}</p>}
    </div>
  );
}

export default observer(App);
