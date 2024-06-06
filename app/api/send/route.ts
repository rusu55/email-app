import { NextRequest, NextResponse } from "next/server";
import { VideoQuestionnaire } from "@/components/video-questionnaire";
import { EmailTemplate } from "@/components/email-template";
import { Resend } from "resend";
import {z} from 'zod';
import { format } from "date-fns";
import prisma from "@/prisma/prisma";
import { Prisma } from "@prisma/client";

const formSchema = z.object({
  brideName: z.string().min(2).max(50),
  groomName: z.string().min(2).max(50),
  email: z.string().email("Email address not valid!"),
  weddingDate: z.string(),
  songsOptions: z.string(),
  highlightSong: z.string().optional(),
  videoSongs: z.string().optional(),
  details: z.string(),
  address: z.string(),
  city: z.string(),
  state: z.string(),
  zipCode: z.string(),
})

const resend = new Resend(process.env.RESEND_API_KEY);

export const POST = async (request: NextRequest) =>{
    const rawBody = await request.json();

    const response = formSchema.safeParse(rawBody);

    if (!response.success) {
        const { errors } = response.error;

        return NextResponse.json(errors, {status: 401})
    }

    try{
      const newQuestionnare = await prisma.video.create({
        data: {
          brideName: response.data.brideName,
          groomName: response.data.groomName,
          email: response.data.email,
          weddingDate: response.data.weddingDate,
          songsOptions: response.data.songsOptions,
          highlightSong: response?.data.highlightSong,
          videoSongs: response?.data.videoSongs,
          details: response.data.details,
          address: response.data.address,
          city: response.data.city,
          state: response.data.state,
          zipCode: response.data.zipCode,
        }
      })

          try {
          
            const { data, error } = await resend.emails.send({
              from: 'Video Questionnaire <office@redbarnweddingstudio.xyz>',
              to: ['rusu55@yahoo.com'],
              subject: `Video Questionnaire - ${response.data.brideName} , ${response.data.groomName} - ${response.data.weddingDate}`,
              react: VideoQuestionnaire({
                brideName: response.data.brideName,
                groomName: response.data.groomName,
                weddingDate: response.data.weddingDate,
                songsOptions: response.data.songsOptions,
                highlightSong: response.data.highlightSong,
                videoSongs: response.data.videoSongs,
                details: response.data.details,
                address: response.data.address,
                city: response.data.city,
                zipCode: response.data.zipCode,
                  }),
                });
        
            if (error) {
              return NextResponse.json({ error }, { status: 500 });
            }        
            return NextResponse.json({ data }, {status: 201});
            } catch (error) {
              return NextResponse.json({ error }, { status: 500 });
            }     
    }
    catch(e){
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        throw e
    }
  }   
   
}
