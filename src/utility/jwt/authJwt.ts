import {JwtPayload} from "jsonwebtoken";
import {BEFORE_LINK_V1, currentUserData, SECRET_JWT} from "../constant";
import {expressjwt} from "express-jwt";

export function authJwt()
{
    return expressjwt({
        secret: SECRET_JWT,
        algorithms: [
            'HS256'
        ],
        isRevoked: (req, token) =>
        {
            let tokenPayload: JwtPayload = <JwtPayload>token!['payload']
            currentUserData.IS_USER_LOGIN = true
            currentUserData.LOGIN_USER_ID = tokenPayload.userId
            currentUserData.IS_USER_ADMIN = tokenPayload.isAdmin
            console.log(currentUserData)
            // console.log(`Admin : ${tokenPayload['isAdmin']}`)
            return false
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