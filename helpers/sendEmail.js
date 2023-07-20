// =====NODEMAILER ISSUE===============

const nodemailer = require("nodemailer");

require("dotenv").config();

const { UKR_NET_EMAIL, UKR_NET_PASSWORD } = process.env;
const nodemailerConfig = {
  host: "smtp.ukr.net",
  port: 465,
  secure: true,
  auth: {
    user: UKR_NET_EMAIL,
    pass: UKR_NET_PASSWORD,
  },
};
const transport = nodemailer.createTransport(nodemailerConfig);
const sendEmail = async (data) => {
  const email = { ...data, from: UKR_NET_EMAIL };
  await transport.sendMail(email);
  return true;
};

module.exports = sendEmail;

// =====ELASTIC EMAIL ISSUE============

// const ElasticEmail = require("@elasticemail/elasticemail-client");
// require("dotenv").config();

// const { ELASTICEMAIL_API_KEY } = process.env;
// const defaultClient = ElasticEmail.ApiClient.instance;

// const { apikey } = defaultClient.authentications;
// apikey.apiKey = ELASTICEMAIL_API_KEY;

// const api = new ElasticEmail.EmailsApi();

// const email = ElasticEmail.EmailMessageData.constructFromObject({
//   Recipients: [new ElasticEmail.EmailRecipient("bolotoff@ukr.net")],
//   Content: {
//     Body: [
//       ElasticEmail.BodyPart.constructFromObject({
//         ContentType: "HTML",
//         Content: "<a target='_blank' href='#'>Click to verify your email</a>",
//       }),
//     ],
//     Subject: "Verify email",
//     From: "oleksii.bolotov@gmail.com",
//   },
// });

// const callback = function (error, data, response) {
//   if (error) {
//     // return;
//     console.error(error);
//   } else {
//     console.log("API called successfully.");
//   }
// };
// api.emailsPost(email, callback);
