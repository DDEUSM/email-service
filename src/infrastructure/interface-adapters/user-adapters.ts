import { User } from "../../domain/entities/user";

export class UserAdapter
{
    public static toDatabase(user: User)
    {
        let object = {
            id: user.id,
            team_id: user.teamId,
            role_id: user.roleId,
            first_name: user.firstName,
            last_name: user.lastName,
            email: user.email,
            password_hash: user.password
        }
        return Object.keys(object).reduce((finalQueryObj: any, currentKey: any, index: number) => 
            {
                object[currentKey]? finalQueryObj[currentKey] = object[currentKey] : null
                return finalQueryObj 
            }, {})
    }

    public static queryToDatabase(userQuery: any)
    {   
        let object = {
            id: userQuery.id,
            team_id: userQuery.teamId,
            role_id: userQuery.roleId,
            first_name: userQuery.firstName,
            last_name: userQuery.lastName,
            email: userQuery.email,
            created_at: userQuery.createdAt
        }
        return Object.keys(object).reduce((finalQueryObj: any, currentKey: any, index: number) => 
        {
            object[currentKey]? finalQueryObj[currentKey] = object[currentKey] : null
            return finalQueryObj 
        }, {})
    }
}
