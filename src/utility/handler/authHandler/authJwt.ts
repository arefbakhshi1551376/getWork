import {JwtPayload} from "jsonwebtoken";
import {BEFORE_LINK_V1, currentAuthType, SECRET_JWT} from "../../constant";
import {expressjwt} from "express-jwt";
import {isAnyUserAdmin, isAnyUserLogin} from "../../coreMethod/user";
import {getUserTokenByAndTokenUniqueCode} from "../../coreMethod/userToken";

export function authJwt()
{
    return expressjwt({
        secret: SECRET_JWT,
        algorithms: [
            'HS256'
        ],
        isRevoked: async (req, token) =>
        {
            let tokenPayload: JwtPayload = <JwtPayload>token!['payload']

            currentAuthType.LOGIN_USER_TOKEN_UNIQUE_CODE = tokenPayload.uniqueCode
            let currentUserToken: any = await getUserTokenByAndTokenUniqueCode(currentAuthType.LOGIN_USER_TOKEN_UNIQUE_CODE)
            if (currentUserToken && currentUserToken.isWorkingYet == true)
            {
                currentAuthType.LOGIN_USER_ID = tokenPayload.userId
                console.log('------------------- User Id -------------------')
                console.log(currentAuthType.LOGIN_USER_ID)

                currentAuthType.IS_USER_ADMIN = await isAnyUserAdmin()
                console.log('------------------- Is User Admin -------------------')
                console.log(currentAuthType.IS_USER_ADMIN)

                currentAuthType.IS_USER_LOGIN = await isAnyUserLogin()
                console.log('------------------- Is Any User Login -------------------')
                console.log(currentAuthType.IS_USER_LOGIN)
            }

            return !currentUserToken ||
                !currentUserToken.uniqueCode ||
                currentUserToken.uniqueCode == '' ||
                currentUserToken.isWorkingYet == false;
        },
    }).unless({
        path: [
            {
                url: /\/api\/v1\/products(.*)/,
                methods: [
                    'GET',
                    'OPTIONS'
                ]
            },
            {
                url: /\/api\/v1\/categories(.*)/,
                methods: [
                    'GET',
                    'OPTIONS'
                ]
            },
            {
                url: /\/api\/v1\/user\/verify_email(.*)/,
                methods: [
                    'GET',
                    'OPTIONS'
                ]
            },
            {
                url: /\/api\/v1\/user\/verify_phone_number(.*)/,
                methods: [
                    'GET',
                    'OPTIONS'
                ]
            },
            {
                url: `${BEFORE_LINK_V1}/userRequest`,
                methods: [
                    'POST'
                ]
            },
            `${BEFORE_LINK_V1}/user/login`,
            `${BEFORE_LINK_V1}/user/add_by_user_itself`,
        ]
    })
}