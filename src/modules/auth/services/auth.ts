import AuthBaseInterface, { AuthError } from '../interfaces/auth-base-interface'
import { signIn, signUp, confirmSignUp, signOut, fetchUserAttributes } from "aws-amplify/auth"
import useUserStore from '../store/user-store'

class Auth implements AuthBaseInterface {
    async login(username: string, password: string) {
        try{
            await signIn({
                username, 
                password
            })
            return {
                success: true
            }
        } catch(e) {
            return {
                success: false,
                error: new AuthError(e instanceof Error ? e?.message : 'Error when "signIn" in with aws-amplify/auth', 400)
            }
        }
    }

    async registration(username: string, password: string, email: string) {
        try{
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
            return {
                success: true
            }
        } catch(e) {
            return {
                success: false,
                error: new AuthError(e instanceof Error ? e?.message : 'Error when "signUp" in with aws-amplify/auth', 400)
            }
        }
    }

    async confirmRegistration(email: string, confirmationCode: string) {
        try{
            await confirmSignUp({
                username: email,
                confirmationCode
            })
            return {
                success: true
            }
        } catch(e) {
            return {
                success: false,
                error: new AuthError(e instanceof Error ? e?.message : 'Error when "confirmSignUp" in with aws-amplify/auth', 400)
            }
        }
    }

    async getUser() {
        try{
            const store = useUserStore.getState();
            if(store.user) return store.user
            
            const user = await fetchUserAttributes();
            const userData = { 
                id: user.sub,
                email: user.email,
                name: user.name
            }
            useUserStore.setState({ user: userData });
            return userData
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch(e) {
            return null
        }
    }

    async checkUser() {
        const a = await this.getUser()
        return !!a
    }

    async logout() {
        try{
            await signOut()
            const store = useUserStore.getState();
            store.clearUser()
            return {
                success: true
            }
        } catch(e){
            return {
                success: false,
                error: new AuthError(e instanceof Error ? e?.message : 'Error when "confirmSignUp" in with aws-amplify/auth', 400)
            }
        }
    }
}

export default new Auth()