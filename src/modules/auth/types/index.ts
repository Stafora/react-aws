export enum AuthFormsEnum {
    LOGIN = 1,
    REGISTRATION = 2,
    CONFIRM_REGISTRATION = 3
}

export type AuthFormsType = AuthFormsEnum.LOGIN | AuthFormsEnum.REGISTRATION | AuthFormsEnum.CONFIRM_REGISTRATION