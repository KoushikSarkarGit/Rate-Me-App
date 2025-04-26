import {resend} from '@/lib/resend'
import VerificationEmailTemplate from '../../emailTemplates/verificationEmailTemplate'
import { ApiResponse } from '@/types/APIResponse';

export const sendVerificationEmail = async (
    email: string,
    username: string,
    verifyCode: string
) : Promise<ApiResponse> =>{

    try {
        const { data, error } = await resend.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: email,
            subject: 'Rate Me App Verification Code',
            react: VerificationEmailTemplate({username, otp: verifyCode})
          });

          return { 
            success: true,
            message: "Verification Email Sent Successfully"}
        
    } catch (error) {
        console.log("Failed to Send Email", error);
        return { 
            success: false,
            message: "Failed to Send Email"}
    }

}