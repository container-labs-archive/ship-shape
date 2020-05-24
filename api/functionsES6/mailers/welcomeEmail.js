// @flow

import sgMail from './sgMail';
import Config from '../config';

const styles = {
  backgroundColor: '#009874',
};

// https://docs.google.com/document/d/1Ii3wne5SDRuyXeS7tDdPsrzoKbKKYerX7j8nppt5kgk/edit
// <!-- THIS EMAIL WAS BUILT AND TESTED WITH LITMUS http://litmus.com -->
// <!-- IT WAS RELEASED UNDER THE MIT LICENSE https://opensource.org/licenses/MIT -->
// <!-- QUESTIONS? TWEET US @LITMUSAPP -->

export const template = (email, inviteCode) => `
  <!DOCTYPE html>
  <html>
    <head>
      <title></title>
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <link href="https://fonts.googleapis.com/css?family=Exo:900i|Roboto" rel="stylesheet">
      <style type="text/css">
        /* CLIENT-SPECIFIC STYLES */
        body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
        table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
        img { -ms-interpolation-mode: bicubic; }

        /* RESET STYLES */
        img { border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
        table { border-collapse: collapse !important; }
        body { height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important; }

        /* iOS BLUE LINKS */
        a[x-apple-data-detectors] {
          color: inherit !important;
          text-decoration: none !important;
          font-size: inherit !important;
          font-family: inherit !important;
          font-weight: inherit !important;
          line-height: inherit !important;
        }

        /* MOBILE STYLES */
        @media screen and (max-width:600px){
          h1 {
            font-size: 32px !important;
            line-height: 32px !important;
          }
        }

        /* ANDROID CENTER FIX */
        div[style*="margin: 16px 0;"] { margin: 0 !important; }
      </style>
    </head>
    <body style="background-color: #f4f4f4; margin: 0 !important; padding: 0 !important;">

      <!-- HIDDEN PREHEADER TEXT -->
      <div style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: 'Roboto', Helvetica, Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;">
          We're thrilled to have you here! Get ready to dive into your new account.
      </div>

      <style>
        @import url('https://fonts.googleapis.com/css?family=Exo:400,900i|Roboto');
      </style>

      <table border="0" cellpadding="0" cellspacing="0" width="100%">
        <!-- LOGO -->
          <tr>
            <td bgcolor="${styles.backgroundColor}" align="center">
              <!--[if (gte mso 9)|(IE)]>
              <table align="center" border="0" cellspacing="0" cellpadding="0" width="600">
              <tr>
              <td align="center" valign="top" width="600">
              <![endif]-->
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;" >
                <tr>
                  <td align="center" valign="top" style="padding: 40px 10px 40px 10px;">
                    <a href="http://libra.containerlabs.io" target="_blank" style="font-family: 'Exo', sans-serif; text-decoration: none; color: white; font-size: 40px; font-weight: bold; font-style: italic;">
                      Selenity Job Evaluator
                    </a>
                  </td>
                </tr>
              </table>
              <!--[if (gte mso 9)|(IE)]>
              </td>
              </tr>
              </table>
              <![endif]-->
            </td>
          </tr>
          <!-- HERO -->
          <tr>
            <td bgcolor="${styles.backgroundColor}" align="center" style="padding: 0px 10px 0px 10px;">
              <!--[if (gte mso 9)|(IE)]>
              <table align="center" border="0" cellspacing="0" cellpadding="0" width="600">
              <tr>
              <td align="center" valign="top" width="600">
              <![endif]-->
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;" >
                <tr>
                  <td bgcolor="#ffffff" align="center" valign="top" style="padding: 40px 20px 20px 20px; border-radius: 4px 4px 0px 0px; color: #111111; font-family: 'Roboto', Helvetica, Arial, sans-serif; font-size: 48px; font-weight: 400; letter-spacing: 4px; line-height: 48px;">
                    <h1 style="font-size: 48px; font-weight: 400; margin: 0;">Welcome!</h1>
                  </td>
                </tr>
              </table>
              <!--[if (gte mso 9)|(IE)]>
              </td>
              </tr>
              </table>
              <![endif]-->
            </td>
          </tr>
          <!-- COPY BLOCK -->
          <tr>
            <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;">
              <!--[if (gte mso 9)|(IE)]>
              <table align="center" border="0" cellspacing="0" cellpadding="0" width="600">
              <tr>
              <td align="center" valign="top" width="600">
              <![endif]-->
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;" >
                <!-- COPY -->
                <tr>
                  <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 40px 30px; color: #666666; font-family: 'Roboto', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;" >
                    <p style="margin: 0;">Your system administrator has created a Selenity Job Evaluator account for you. Selenity Job Evaluator is an Agenda for Change job matching platform.</p>
                  </td>
                </tr>
                <tr>
                  <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 40px 30px; color: #666666; font-family: 'Roboto', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;" >
                    <p style="margin: 0;">We're excited to have you get started. First, you need to confirm your account, just press the button below.</p>
                  </td>
                </tr>
                <!-- BULLETPROOF BUTTON -->
                <tr>
                  <td bgcolor="#ffffff" align="left">
                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                      <tr>
                        <td bgcolor="#ffffff" align="center" style="padding: 20px 30px 60px 30px;">
                          <table border="0" cellspacing="0" cellpadding="0">
                            <tr>
                              <td align="center" style="border-radius: 3px;" bgcolor="${styles.backgroundColor}"><a href="${`${Config.confirmEmailUrl}?email=${email}&inviteCode=${inviteCode}`}" target="_blank" style="font-size: 20px; font-family: Helvetica, Arial, sans-serif; color: #ffffff; text-decoration: none; color: #ffffff; text-decoration: none; padding: 15px 25px; border-radius: 2px; border: 1px solid ${styles.backgroundColor}; display: inline-block;">Confirm Account</a></td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <!-- COPY -->
                <tr>
                  <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 0px 30px; color: #666666; font-family: 'Roboto', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;" >
                    <p style="margin: 0;">If that doesn't work, copy and paste the following link in your browser:</p>
                  </td>
                </tr>
                <!-- COPY -->
                <tr>
                  <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 20px 30px; color: #666666; font-family: 'Roboto', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;" >
                    <p style="margin: 0;"><a href="${`${Config.confirmEmailUrl}?email=${email}&inviteCode=${inviteCode}`}" target="_blank" style="color: ${styles.backgroundColor};">${`${Config.confirmEmailUrl}?email=${email}&inviteCode=${inviteCode}`}</a></p>
                  </td>
                </tr>
                <!-- COPY -->
                <tr>
                  <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 20px 30px; color: #666666; font-family: 'Roboto', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;" >
                    <p style="margin: 0;">If you require any further assistance, please contact your Agenda for Change lead.</p>
                  </td>
                </tr>
                <!-- COPY -->
                <tr>
                  <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 40px 30px; border-radius: 0px 0px 4px 4px; color: #666666; font-family: 'Roboto', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;" >
                    <p style="margin: 0;">Cheers,<br>Container Labs</p>
                  </td>
                </tr>
              </table>
              <!--[if (gte mso 9)|(IE)]>
              </td>
              </tr>
              </table>
              <![endif]-->
            </td>
          </tr>
          <!-- SUPPORT CALLOUT -->
          <tr>
            <td bgcolor="#f4f4f4" align="center" style="padding: 30px 10px 0px 10px;">
              <!--[if (gte mso 9)|(IE)]>
              <table align="center" border="0" cellspacing="0" cellpadding="0" width="600">
              <tr>
              <td align="center" valign="top" width="600">
              <![endif]-->
              <!--[if (gte mso 9)|(IE)]>
              </td>
              </tr>
              </table>
              <![endif]-->
            </td>
          </tr>
          <!-- FOOTER -->
          <tr>
              <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;">
                  <!--[if (gte mso 9)|(IE)]>
                  <table align="center" border="0" cellspacing="0" cellpadding="0" width="600">
                  <tr>
                  <td align="center" valign="top" width="600">
                  <![endif]-->
                  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;" >
                    <!-- ADDRESS -->
                    <tr>
                      <td bgcolor="#f4f4f4" align="left" style="padding: 0px 30px 30px 30px; color: #666666; font-family: 'Roboto', Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 18px;" >
                        <p style="margin: 0;">St Helier, Jersey</p>
                      </td>
                    </tr>
                  </table>
                  <!--[if (gte mso 9)|(IE)]>
                  </td>
                  </tr>
                  </table>
                  <![endif]-->
              </td>
          </tr>
      </table>
    </body>
  </html>
`;

// email
// inviteCode

export const sendWelcomeEmail = (user) => {
  const {
    email,
    inviteCode,
  } = user;

  const message = {
    to: email,
    from: 'noreply@containerlabs.io',
    subject: 'Welcome to Libra! Ready to do some matching?',
    text: 'Welcome',
    html: template(email, inviteCode),
  };

  return sgMail.send(message);
};
