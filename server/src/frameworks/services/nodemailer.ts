import configKeys from "../../config";
import Mailgen from "mailgen"
import nodemailer from "nodemailer"
export const getMailService = (userEmail:string,verifyToken:string,userId:string) =>{                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
let config = {
     
    service:"gmail",
    auth : {
        user:configKeys.EMAIL,
        pass:configKeys.PASSWORD
    }
}

const generateOTP = () => {
    const digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < 6; i++) {
      OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
  };

let MailGenerator = new Mailgen({
    theme: "default",
    product : {
        name: "Meta-Social",
        link : 'https://mailgen.js/'
    }
})

let otp=generateOTP()
let response = {
    
    
    body: {
        name : "Friend",
        intro: "Your link To reset the password is" ,
        table : {
            data : [
                
                {
                    // link:`http://localhost:5173/reset-password/${userId}/${verifyToken}`
                // text:`This Link Valid For 2 MINUTES http://localhost:5000/reset-password/${userId}/${verifyToken}`
             link : "This Link Valid For 2 MINUTES http://localhost:5173/reset-password/" + userId + "/" + verifyToken


                }
            ]
        },
        outro: "Looking forward to do more business"
    }
}


let mail = MailGenerator.generate(response)



const transporter = nodemailer.createTransport(config);

let message = {
    from : configKeys.EMAIL,
    to : userEmail,
    subject: "Password Reset",
    html: mail
}

transporter.sendMail(message).then(() => {
    return message
    })
   
return otp

}



