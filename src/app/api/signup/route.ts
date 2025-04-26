import { sendVerificationEmail } from "@/helper/sendVerificationEmail";
import Usermodel from "@/model/user";
import dbConnect from '../../../lib/dbConnect'
import bcrypt from 'bcrypt';


export async function POST(request: Request){
    await dbConnect();
    try {
        const {username, email, password} = await request.json();
        const existingUserVerifiedByUsername = await Usermodel.findOne({
            username: username,
        isVerified: true})

        if(existingUserVerifiedByUsername){
            return Response.json({
                success: false,
                message: "User Is Already Registered and Verified",
            }, {status: 400})
        }

        const existingUserByEmail = await Usermodel.findOne({  email: email})
        const myverifyCode = Math.floor(100000 + Math.random()*800000).toString();

        if(existingUserByEmail){
            if (existingUserByEmail.isVerified) {
                return Response.json(
                  {
                    success: false,
                    message: 'User already exists with this email',
                  },
                  { status: 400 }
                );
              } else {
                const hashedPassword = await bcrypt.hash(password, 10);
                existingUserByEmail.password = hashedPassword;
                existingUserByEmail.verifyCode  = myverifyCode;
                existingUserByEmail.verifyCodeExpiryDate = new Date(Date.now() + 3600000);
                await existingUserByEmail.save();
              }

        }else{

            const hashedPassword = await bcrypt.hash(password, 10);
            const expiryDate = new Date();
            expiryDate.setHours(expiryDate.getHours()+2);

            const newuser = Usermodel.create({
                username: username,
                    password: hashedPassword,
                    email: email,
                    verifyCode: myverifyCode,
                    verifyCodeExpiryDate: expiryDate,
                    isAcceptingMessage: true,
                    isVerified: false,
                    messages: [],
                    createdDate: Date.now()
            })
        }

         // Send verification email
    const emailResponse = await sendVerificationEmail(
        email,
        username,
        myverifyCode
      );
      //failed to send verify email
      if(!emailResponse.success){
        return Response.json({
          succcess: false,
          message: emailResponse.message
        });
      }
      // email successful

      return Response.json(
        {
          success: true,
          message: 'User registered successfully. Please verify your account.',
        },
        { status: 201 }
      )

    } catch (error) {

      console.log("error registering user", error)
      return Response.json({
        success:false,
        message: "failed to register user"
      },{status: 500})
        
    }
}