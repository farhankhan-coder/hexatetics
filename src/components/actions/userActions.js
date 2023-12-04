import {API, graphqlOperation} from "aws-amplify";
import * as queries from "../../graphql/queries";

export const getUserPermissions = async (userId) => {
    let permissions = [];
    let nextToken = null;
    let hasMoreData = true;

    while (hasMoreData) {
        const userPermission = await API.graphql(graphqlOperation(queries.listUserAppsPermissions, {
            filter: {
                UserId: {eq: userId},
            },
            limit: 1000,
            nextToken: nextToken,
        }));
        const {items, nextToken: newNextToken} = userPermission.data.listUserAppsPermissions;

        permissions = [...permissions, ...items];
        nextToken = newNextToken;
        hasMoreData = nextToken !== null && nextToken !== undefined ? nextToken : false;
    }
    return permissions;
}