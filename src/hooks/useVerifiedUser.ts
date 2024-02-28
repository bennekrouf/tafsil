import { useUser } from './UserContext';

/**
 * Custom hook to get the current user from the UserContext.
 * Throws an error if the user context is not available.
 */
export const useVerifiedUser = () => {
    const userContext = useUser();
    if (!userContext) {
        throw new Error("User context is not available");
    }
    return userContext.user;
};
