import { DataStore } from "aws-amplify";
import { Notifications, NotificationDetails } from "../models";
import { SendNotificationEmail } from "../helper/mail";
import awsmobile from "../aws-exports";
import AWS from "aws-sdk";
import { toast } from 'react-toastify';
import { GetValueFromArray } from '../helper/commonfunctions';
import { USER_TYPES } from '../helper/enum';

const sendNotification = async (type, status, sender, receiver, requestId='',senderId = '', receiverId ='') => {

    // Author : Asharani Navale[Date:19-04-023]-------------------------------------

    //SET AWS Configuration
    AWS.config.update({
        accessKeyId: process.env.REACT_APP_AWS_AccessKeyId,
        secretAccessKey: process.env.REACT_APP_AWS_SecretAccessKey,
        region: process.env.REACT_APP_AWS_Region,
    });
    const cognito = new AWS.CognitoIdentityServiceProvider();

    await DataStore.query(
        Notifications,
        (c) => c.status("contains", status).from("contains", sender).to("contains", receiver).requestType("eq", type)).then(async (response) => {
        if (response.length > 0) {
            var params =
            {
                UserPoolId: awsmobile.aws_user_pools_id,
                Limit: 60
            };
            console.log('notificationId' + JSON.stringify(response[0].id))
            // SendNotificationEmail("ankit@edbrix.com", response[0].title, response[0].content)

            console.log('inApp'+response[0].inApp)

            //If Receiver is user and interpreter
            if (receiver === USER_TYPES.REQUESTER || receiver === USER_TYPES.INTERPRETER) {
                console.log('response[0].inApp===>REQUESTER'+response[0].inApp)

                //InApp is enable
                if (response[0].inApp) {
                    saveNotificationDetails(response[0].id, senderId, receiverId,requestId);
                }
                //Email is enable
                if (response[0].email) {
                    if (receiver === USER_TYPES.REQUESTER || receiver === USER_TYPES.INTERPRETER) {
                        params['Filter'] = "sub ^=\"" + receiverId + "\""
                        cognito.listUsers(params, (err, data) => {
                            if (err) {
                                toast.error(err.message);
                            } else {
                                console.log('email' + JSON.stringify(GetValueFromArray(data.Users[0].Attributes, "email")))
                                SendNotificationEmail(GetValueFromArray(data.Users[0].Attributes, "email"), response[0].title, response[0].content);
                            }
                        });
                    }
                }

            }

            //If Receiver is admin
            if (receiver === USER_TYPES.ADMIN) {
                cognito.listUsers(params, (err, data) => {
                    if (err) {
                        toast.error(err.message);
                    } else {
                        for (let i = 0; i < data.Users.length; i++) {
                            console.log('Role====>'+GetValueFromArray(data.Users[i].Attributes, "custom:role"))

                            if (GetValueFromArray(data.Users[i].Attributes, "custom:role") === USER_TYPES.ADMIN) {
                                //InApp is enable
                                console.log('response[0].inApp===>Admin'+response[0].inApp)
                                if (response[0].inApp) {
                                    saveNotificationDetails(response[0].id, senderId, GetValueFromArray(data.Users[i].Attributes, "sub"),requestId);
                                }
                                //Email is enable
                                if (response[0].email) {
                                    SendNotificationEmail(GetValueFromArray(data.Users[i].Attributes, "email"), response[0].title, response[0].content);
                                }
                            }
                        }
                    }
                });
            }

            //Save Notification Details
            async function saveNotificationDetails(notificationId, senderId, receiverId,requestId) {
                console.log(notificationId+'notificationId')
                console.log(senderId+'senderId')
                console.log(receiverId+'receiverId')
                console.log(requestId+'requestId')
                await DataStore.save(
                    new NotificationDetails({
                        "notificationId": notificationId,
                        "fromUserId": senderId,
                        "toUserId": receiverId,
                        "requestId": requestId,
                    })
                );
            }
        }
    })
}

export { sendNotification }
