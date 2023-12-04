// import {API, graphqlOperation} from 'aws-amplify';
// import * as queries from '../../graphql/queries';
// import * as mutations from '../../graphql/mutations';


export const get_notifications = async (userId, appId, notificationId) => {
    let allNotifications = [];
    let nextToken = null;
    let hasMoreData = true;

    while (hasMoreData) {
        const result2 = await API.graphql(graphqlOperation(queries.listNotificationTables, {
            filter: {
                user_id: {eq: userId},
                AppId: {eq: appId},
                notification_type: {eq: notificationId}
            },
            limit: 1000,
            nextToken: nextToken,
            sort: {
                field: "created_at",
                direction: "desc"
            }
        }));
        const {items, nextToken: newNextToken} = result2.data.listNotificationTables;

        allNotifications = [...allNotifications, ...items];
        nextToken = newNextToken;
        hasMoreData = nextToken !== null && nextToken !== undefined ? nextToken : false;
    }

    return allNotifications;
}

export const get_all_notifications = async (userId, notificationId) => {
    let allNotifications = [];
    let nextToken = null;
    let hasMoreData = true;

    while (hasMoreData) {
        const result2 = await API.graphql(graphqlOperation(queries.listNotificationTables, {
            filter: {
                user_id: {eq: userId},
                notification_type: {eq: notificationId}
            },
            limit: 1000,
            nextToken: nextToken,
            sort: {
                field: "created_at",
                direction: "desc"
            }
        }));
        const {items, nextToken: newNextToken} = result2.data.listNotificationTables;

        allNotifications = [...allNotifications, ...items];
        nextToken = newNextToken;
        hasMoreData = nextToken !== null && nextToken !== undefined ? nextToken : false;
    }

    return allNotifications;
}

export const get_un_read_notifications = async (notificationIds) => {

    const unReadNotifications = [];
    const promises = [];

    notificationIds.forEach((id) => {
        let nextToken = null;
        let hasMoreData = true;

        const fetchData = async () => {
            while (hasMoreData) {
                const result2 = await API.graphql(graphqlOperation(queries.listNotificationReadTables, {
                    filter: {
                        notification_id: id,
                        read_at: { eq: null }
                    },
                    limit: 1000,
                    nextToken: nextToken,
                    sort: {
                        field: "createdAt",
                        direction: "desc"
                    }
                }));

                const { items, nextToken: newNextToken } = result2.data.listNotificationReadTables;

                unReadNotifications.push(...items);
                nextToken = newNextToken;
                hasMoreData = nextToken !== null && nextToken !== undefined;
            }
        };

        promises.push(fetchData());
    });

    await Promise.all(promises)
     .then(() => {
         return unReadNotifications;
     })
     .catch((error) => {
         return [];
     });
}

export const create_notification = async (userId, type, sourceId, sourceType, subject, message, appId) => {

    try {
        const notificationData = await API.graphql(
         graphqlOperation(mutations.createNotificationTable, {
             input: {
                 notification_type: type,
                 user_id: userId,
                 source_id: sourceId,
                 source_typ: sourceType,
                 message: message,
                 subject: subject,
                 created_at: Date.now(),
                 AppId: appId
             }
         })
        );
        
        // Please do not remove this console
        console.log("notification created", notificationData)

        if (notificationData?.data?.createNotificationTable) {
            const createNotificationTable = notificationData?.data?.createNotificationTable;
            const notificationId = createNotificationTable.id;
            if(notificationId) {
                await API.graphql(
                 graphqlOperation(mutations.createNotificationReadTable, {
                     input: {
                         notification_id: notificationId,
                         user_id: userId,
                         read_at: null,
                     }
                 }));
            }

        }
    } catch (e) {
        console.log("Error while creating notifications ", e);
    }
}

export const read_notifications = async (notifications) => {
    const read = notifications.map((notification) => {
        read_notification(notification.id, notification._version)
    })
    return await Promise.all(read);
}

export const read_notification = async (notification_id, version) => {
    await API.graphql({
        query: mutations.updateNotificationTable,
        variables: {
            input: {
                id: notification_id,
                _version: version,
                read_at:  Date.now()
            }
        }
    });
}
