import User from "../../../models/User";
import { CURRENT_TIME } from "../../../../utils/commonUtils";
import crypto from "crypto";
import nodemailer from "nodemailer";
import smtpPool from "nodemailer-smtp-pool";

export default {
 Query: {
  getUser: async (_, args) => {
   const { id } = args;
   try {
    const result = await User.findOne({ _id: id });
    return result;
   } catch (e) {
    console.log(e);
    return {};
   }
  },
  getLoginUser: async (_, args) => {
   const { email, password } = args;
   try {
    let cilper = crypto.createHash("sha512");

    cilper.update(password);
    const encPassword = cilper.digest("hex");
    const result = await User.findOne({ email, password: encPassword });
    return { isLogin: true, userData: result };
   } catch (e) {
    console.log(e);
    return { isLogin: false, userData: { _id: "" } };
   }
  },
  getCheckEmail: async (_, args) => {
   const { email } = args;
   try {
    const randomCode = [`0`, `1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`];
    const code =
     randomCode[Math.floor(Math.random() * 10)] +
     randomCode[Math.floor(Math.random() * 10)] +
     randomCode[Math.floor(Math.random() * 10)] +
     randomCode[Math.floor(Math.random() * 10)] +
     randomCode[Math.floor(Math.random() * 10)];

    const result = await User.findOne({ email });
    console.log(result);

    let isResult = result ? true : false;
    console.log(isResult);
    if (!isResult) {
     console.log("성공");

     const smtpTransport = nodemailer.createTransport(
      smtpPool({
       service: "Gmail",
       host: "localhost",
       prot: "465",
       tls: {
        rejectUnauthorize: false,
       },
       auth: {
        user: process.env.ADMIN_EMAIL,
        pass: process.env.ADMIN_EMAIL_PASSWORD,
       },
       maxConnections: 5,
       maxMessages: 10,
      }),
     );

     const mailOpt = {
      from: process.env.ADMIN_EMAIL,
      to: email,
      subject: "🔐인증코드 전송 [www.webpacktube.com]",
      html: `인증코드는 ${code} 입니다.`,
     };

     await smtpTransport.sendMail(mailOpt, function (err, info) {
      if (err) {
       console.error("Send Mail error : ", err);
       smtpTransport.close();
      } else {
       console.log("Message sent : ", info);
       smtpTransport.close();
      }
     });
     return code;
    } else {
     console.log("실패");
     return "";
    }
   } catch (e) {
    console.log(e);
    return "";
   }
  },

  getCheckNickName: async (_, args) => {
   const { nickName } = args;

   try {
    const result = await User.findOne({ nickName });

    let isResult = result ? true : false;

    console.log(result);
    console.log(isResult);
    if (!isResult) {
     return true;
    } else {
     return false;
    }
   } catch (e) {
    console.log(e);
    return false;
   }
  },
 },
 Mutation: {
  createUser: async (_, args) => {
   const { name, avatar, email, nickName, brith, password, mobile } = args;
   const current = await CURRENT_TIME();
   try {
    let cilper = crypto.createHash("sha512");

    cilper.update(password);
    const encPassword = cilper.digest("hex");
    const result = await User.create({
     name,
     avatar,
     email,
     nickName,
     brith,
     password: encPassword,
     mobile,
     subscribe: [],
     follower: [],
     createdAt: current,
     isDelete: false,
    });

    return true;
   } catch (e) {
    console.log(e);
    return false;
   }
  },
 },
};
