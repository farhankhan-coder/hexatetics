import { specialRoutes } from "./routeConstants";

//SET AWS Configuration
const SESConfig = {
  accessKeyId: process.env.REACT_APP_AWS_AccessKeyId,
  secretAccessKey: process.env.REACT_APP_AWS_SecretAccessKey,
  region: process.env.REACT_APP_AWS_Region
};

const fromEmail = process.env.REACT_APP_From_Email;

function SendLoginUsernameAndPassword(name,email, password) {
  // var defaultLoginURL = "https://gusd-k12forms.hexalytics.ai";
  var defaultLoginURL = "https://forms.gusd.net";


  var subjectText = "GUSD forms- Your New User Account Information";

  var emailBody =
    "Dear " +
    name +
    ",<br>Thank you for your interest in using the new GUSD Forms system. Since there are still issues with the Google Single Sign On (SSO) authentication process, we have created a temporary password for you to use until Google SSO is operational."+
    "<p>To log in, you will still navigate to the "+defaultLoginURL+" website. "+
    "<br>In the Email field, enter your GUSD email address."+
    "<br>In the Password field, enter the following, which is your unique password. Do not share this password with others: </p>"+"Password: "+password+
    "<b><br><br>Sincerely,<br>"+
    "</br>GUSD forms"+
    "</b><br><br><br>";

    /* var emailBody =
    "Dear " +
    name +
    ",<br>We are pleased to welcome you as a new user of our GUSD forms. To access your account, please follow these steps: "
    +"<ul><li>Login to: "+defaultLoginURL +"</li><li>Email: "+email +"</li><li>Temporary Password: "+password +"</li></ul>"+
    "For security reasons, we recommend changing your password immediately upon your first login. Here are the steps to do so: "
    +"<ul><li>Go to our login page: "+defaultLoginURL +"</li><li>Enter your email and the temporary password provided in this email. </li><li>Click on the small arrow next to your profile on the top right corner and click on “Change Password”. </li><li>Follow the on-screen instructions to complete the process. </li></ul>"+
    "<p>If you encounter any issues during this process or have any questions about your account, please do not hesitate to contact our customer support team at <a href="+
    "mailto:jboronyak@inniveinc.com"+
    ">jboronyak@inniveinc.com</a>."+
    " Please remember to keep your login credentials confidential, and never share them with anyone. Our team will never ask you for your password via email or phone.</p>"+

    "<b><br><br>Sincerely,<br>"+
    "</br>GUSD forms"+
    "</b><br><br><br>"; */


  var params = {
    Source: fromEmail, //noreply-gusdk12forms@hexalytics.com
    Destination: {
      ToAddresses: [
        email
      ]
    },
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: emailBody
        }
      },
      Subject: {
        Charset: "UTF-8",
        Data: subjectText
      }
    }
  };

  new AWS.SES(SESConfig)
    .sendEmail(params)
    .promise()
    .then(res => {
      console.log(res);
    });
}

function SendWelcomeEmailToUser(role, newUserFirstName, newUserEmail, newUserPassword) {
  var defaultLoginURL = "https://gusd-k12forms.hexalytics.ai/";
  
  var subjectText = "Login details";
  var emailBody =
    "Hello " +
    newUserFirstName +
    ",<br>Below are your login details.<br><br>Login URL: " +
    defaultLoginURL +
    " <br>Email: " +
    newUserEmail +
    "<br>Password: " +
    newUserPassword +
    "<br><br><br>Note: After login please use verification code to confirm your registration. We will send you new email for verification code.";

  var params = {
    Source: fromEmail,
    Destination: {
      ToAddresses: [
        newUserEmail
      ]
    },
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: emailBody
        }
      },
      Subject: {
        Charset: "UTF-8",
        Data: subjectText
      }
    }
  };

  new AWS.SES(SESConfig)
    .sendEmail(params)
    .promise()
    .then(res => {
      console.log(res);
    });
}

function SendNotificationEmail(email, subject, content) {
  // var subjectText = subject;
  // var emailBody = "Hello " + interpreterName + ",<br>Below are the appointment details.<br><br>Date: " + appointmentDate + "<br>Time: " + appointmentTime + "<br>Note:"+comments;
  // //var emailBody = "Hello " + newUserFirstName + ",<br>Below are your login details.<br><br>Login URL: " + defaultLoginURL + " <br>Email: " + newUserEmail + "<br>Password: " + newUserPassword + "<br><br><br>Note: After login please use verification code to confirm your registration. We will send you new email for verification code.";
  var params = {
    Source: fromEmail,
    Destination: {
      ToAddresses: [
        email
      ]
    },
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: content
        }
      },
      Subject: {
        Charset: "UTF-8",
        Data: subject
      }
    }
  };

  new AWS.SES(SESConfig)
    .sendEmail(params)
    .promise()
    .then(res => {
      console.log(res);
    });
}

function SendHandbookNotification({ to = [], from, username, subject }) {
  let defaultLoginURL = window.location.origin;
  var subjectText = subject;
  var emailBody =
    "Hello, <br>Your Handbook is available <br><br>Login to check: " +
    defaultLoginURL +
    `?${specialRoutes.handbook}=true`;

  var params = {
    Source: from,
    Destination: {
      ToAddresses: [...to]
    },
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: emailBody
        }
      },
      Subject: {
        Charset: "UTF-8",
        Data: subjectText
      }
    }
  };

  new AWS.SES(SESConfig)
    .sendEmail(params)
    .promise()
    .then(res => {
      console.log(res);
    });
}

function SendEscalateNotification({ to = [], from, username, subject, body = null }) {
  var subjectText = subject;

  var params = {
    Source: from,
    Destination: {
      ToAddresses: [...to]
    },
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: body || ""
        }
      },
      Subject: {
        Charset: "UTF-8",
        Data: subjectText
      }
    }
  };

  new AWS.SES(SESConfig).sendEmail(params).promise();
}

function SendNotification({ to = [], from, username, subject, body = null }) {
  var subjectText = subject;

  var params = {
    Source: from,
    Destination: {
      ToAddresses: [...to]
    },
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: body || ""
        }
      },
      Subject: {
        Charset: "UTF-8",
        Data: subjectText
      }
    }
  };

  new AWS.SES(SESConfig).sendEmail(params).promise();
}

export {
  SendWelcomeEmailToUser,
  SendNotificationEmail,
  SendHandbookNotification,
  SendEscalateNotification,
  SendNotification,
  SendLoginUsernameAndPassword
};
