import { NextRequest, NextResponse } from "next/server";
import { EmailTemplate } from "@/components/emailTemplate";
import { Resend } from "resend";
import {z} from 'zod';

const schema = z.object({
    brideName: z.string(),
    groomName: z.string(),         
})

const resend = new Resend(process.env.RESEND_API_KEY);

export const POST = async (request: NextRequest) =>{
    const rawBody = await request.json();

    const response = schema.safeParse(rawBody);

    if (!response.success) {
        const { errors } = response.error;

        return NextResponse.json(errors, {status: 401})
    }


    try {
        const { data, error } = await resend.emails.send({
          from: 'Acme <office@redbarnweddingstudio.xyz>',
          to: ['rusu55@yahoo.com'],
          subject: "Hello world",
          react: EmailTemplate({ brideName: response.data.brideName, groomName: response.data.groomName }) as React.ReactElement,
        });
    
        if (error) {
          return NextResponse.json({ error }, { status: 500 });
        }
    
        return NextResponse.json({ data });
      } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
      }
}

