import { observer } from "mobx-react-lite";
import chapterStore from "./stores/chapters";
import lessonStore from "./stores/lessons";
import { useFetchUser } from "./hooks/useFetchUser";
import { UserState, initialState } from './models/UserState';
import { useVerifiedUser } from "./hooks/useVerifiedUser";
import { useEffect, useState } from "react";
import { AuthSession } from '@supabase/supabase-js';
import { supabase } from "./database/supabaseClient";

function App() {
  const [userState, setUserState, isUserLoading] = useFetchUser<UserState>(initialState);
  const verifiedUser = useVerifiedUser();
  const [isUserVerified, setIsUserVerified] = useState(false);
  const [session, setSession] = useState<AuthSession | null>(null);
  const [isDebug, setIsDebug] = useState(false);

  useEffect(() => {
    if (!isDebug) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session);
      });

      supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session);
      });
    }
  }, [isDebug]);

  useEffect(() => {
    setIsUserVerified(!!verifiedUser);
  }, [verifiedUser]);

  const handleClick = () => {
    chapterStore.fetchData(["الربع الأول"]);
    lessonStore.fetchData();
    // console.log(user);
  };

  if (isUserLoading) {
    return <p>Loading...</p>;
  }

  if (!isUserVerified) {
    return <p>User is not verified. Please verify the user.</p>; // Display a message if user is not verified
  }

  return (
    <div>
      <header>
        {/* Your header content goes here */}
        <h1>Header Content</h1>
      </header>
      <div className="content">
        <div className="container">
          <button onClick={handleClick} disabled={chapterStore.loading}>
            {chapterStore.loading ? 'Loading...' : 'Fetch Data Again'}
          </button>
          {chapterStore.error && <p>Error: {chapterStore.error}</p>}
          {chapterStore.data && <p>Data: {JSON.stringify(chapterStore.data)}</p>}
          {lessonStore.data && <p>Data: {JSON.stringify(lessonStore.data)}</p>}
        </div>
      </div>
    </div>
  );
}

export default observer(App);
