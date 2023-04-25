import {JwtPayload} from "jsonwebtoken";
import {BEFORE_LINK_V1, currentAuthType, SECRET_JWT} from "../../constant";
import {expressjwt} from "express-jwt";
import {isAnyUserLogin} from "../../coreMethod/user";
import {getUserTokenByUserIdAndTokenUniqueCode} from "../../coreMethod/userToken";

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
            currentAuthType.LOGIN_USER_ID = tokenPayload.userId
            currentAuthType.IS_USER_ADMIN = tokenPayload.isAdmin
            currentAuthType.LOGIN_USER_TOKEN_UNIQUE_CODE = tokenPayload.uniqueCode
            currentAuthType.IS_USER_LOGIN = await isAnyUserLogin()

            let currentUserToken: any = await getUserTokenByUserIdAndTokenUniqueCode(currentAuthType.LOGIN_USER_ID, currentAuthType.LOGIN_USER_TOKEN_UNIQUE_CODE)
            return currentUserToken.isWorkingYet != true;
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