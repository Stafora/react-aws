import AuthBaseInterface, { AuthError, UserInterface, ResultInterface } from '../interfaces/auth-base-interface'
import { signIn, signUp, confirmSignUp, signOut, fetchUserAttributes } from "aws-amplify/auth"
import useUserStore from '../store/user-store'

class Auth implements AuthBaseInterface {
    async login(username: string, password: string): Promise<ResultInterface> {
        try {
            await signIn({ username, password })
            return { success: true }
        } catch (error) {
            return this.handleError(error, 'signIn');
        }
    }

    async registration(username: string, password: string, email: string): Promise<ResultInterface> {
        try {
            await signUp({
                username: email,
                password,
                options: {
                    userAttributes: {
                        email,
                        name: username,
                    },
                }
            })
            return { success: true }
        } catch (error) {
            return this.handleError(error, 'signUp');
        }
    }

    async confirmRegistration(email: string, confirmationCode: string): Promise<ResultInterface> {
        try {
            await confirmSignUp({
                username: email,
                confirmationCode
            })
            return { success: true }
        } catch (error) {
            return this.handleError(error, 'confirmSignUp');
        }
    }

    async getUser(): Promise<UserInterface | null> {
        try {
            const store = useUserStore.getState();
            if (store.user) return store.user;

            const userAttributes = await fetchUserAttributes();
            const userData: UserInterface = {
                id: userAttributes.sub,
                email: userAttributes.email,
                name: userAttributes.name
            };

            useUserStore.setState({ user: userData });
            return userData;
        } catch (error) {
            return null;
        }
    }

    async checkUser(): Promise<boolean> {
        const user = await this.getUser();
        return !!user;
    }

    async logout(): Promise<ResultInterface> {
        try {
            await signOut();
            useUserStore.getState().clearUser();
            return { success: true };
        } catch (error) {
            return this.handleError(error, 'signOut');
        }
    }

    private handleError(error: unknown, context: string): ResultInterface {
        const message = error instanceof Error ? error.message : `Unknown error during ${context}`;
        return {
            success: false,
            error: new AuthError(message, 400)
        };
    }
}

export default new Auth()