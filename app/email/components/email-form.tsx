'use client';

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod";
import { format } from "date-fns";
import { CalendarIcon, CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";

import states from 'states-us';

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";

  import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form";

  import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"

  import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils"

  const formSchema = z.object({
    brideName: z.string().min(2).max(50),
    groomName: z.string().min(2).max(50),
    email: z.string().email("Email address not valid!"),
    weddingDate: z.date(),
    songsOptions: z.string(),
    highlightSong: z.string().optional(),
    videoSongs: z.string().optional(),
    details: z.string(),
    address: z.string(),
    city: z.string(),
    state: z.string(),
    zipCode: z.string(),
  })
  type FormValues = z.infer<typeof formSchema>
  type Props = {
    onSubmit: (values: z.infer<typeof formSchema>) => void;
    disabled?: boolean;
  }

export const EmailForm = ({onSubmit, disabled}: Props) => {
    const defaultValues: Partial<FormValues> = {}

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues
    })

 const handleSubmit = (values: z.infer<typeof formSchema>) => {
    onSubmit(values)
 }

  return (
    <Card className="w-[98%] md:w-[800px]">
        <CardHeader>
            <CardTitle>Video Questionnaire</CardTitle>
            <CardDescription>Send Info for Video Edit</CardDescription>
        </CardHeader>
        <CardContent className="w-full">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8 pt-4">
                    <div className="flex gap-2 justify-center w-full">
                        <FormField 
                            control={form.control}
                            name="brideName"                            
                            render={({field})=>(
                                <FormItem className="w-full">
                                    <FormLabel>Bride Name:</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={disabled}
                                            placeholder="e.g. Monica Hunt"
                                            {...field}
                                            
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField 
                            control={form.control}
                            name="groomName"
                            render={({field})=>(
                                <FormItem className="w-full">
                                    <FormLabel>Groom Name:</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={disabled}
                                            placeholder="e.g. Robert Hunt"
                                            {...field}
                                            
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="flex gap-2 justify-center w-full items-center">
                        <FormField 
                            control={form.control}
                            name="email"
                            render={({field})=>(
                                <FormItem className="w-full">
                                    <FormLabel>Email Address:</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={disabled}
                                            placeholder="e.g. mon@yahoo.com"
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="weddingDate"
                            render={({ field }) => (
                                <FormItem className="flex flex-col w-full">
                                <FormLabel className="pb-2.5">Wedding Date</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                        variant={"outline"}
                                        className={cn(
                                            "w-full pl-3 text-left font-normal",
                                            !field.value && "text-muted-foreground"
                                        )}
                                        >
                                        {field.value ? (
                                            format(field.value, "PPP")
                                        ) : (
                                            <span>Pick a date</span>
                                        )}
                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                        </Button>
                                    </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-full p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={field.value}
                                        onSelect={field.onChange}
                                        disabled={(date) =>
                                        date > new Date() || date < new Date("1900-01-01")
                                        }
                                        initialFocus
                                        
                                    />
                                    </PopoverContent>
                                </Popover>
                                
                                </FormItem>
                            )}
                            />  
                    </div>
                   
                    <p>Songs Selection </p>
                    <span className=" text-xs">
                        Our studio has a database of songs that usually work well with certain styles of couples and weddings. At the discretion of the studio, would you be willing to allow us to use creative judgments for certain songs on your video? If you have particular songs you would like used in the video please list them below.
                    </span>
                    <FormField
                        control={form.control}
                        name="songsOptions"
                        render={({ field }) => (
                            <FormItem className="space-y-1">             
                            <FormControl>
                                <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="flex flex-col space-y-1"
                                >
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl>
                                    <RadioGroupItem value="Bride Songs Selection" />
                                    </FormControl>
                                    <FormLabel className="font-normal">                      
                                            Yes, I would like you to choose the songs for my video
                                    </FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl>
                                    <RadioGroupItem value="Red Barn Song Selection" />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                            No, please see the songs we have chose bellow
                                    </FormLabel>
                                </FormItem>
                                
                                </RadioGroup>
                            </FormControl>
                            </FormItem>
                        )}
                        />
                         <FormField 
                                control={form.control}
                                name="highlightSong"
                                render={({field})=>(
                                    <FormItem>
                                        <FormLabel>Highlight Video - Song:</FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={disabled}
                                                placeholder="provide song name and artist or youtube link..."
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />                            
                        <FormField
                            control={form.control}
                            name="videoSongs"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Full Length Video, select three songs: one slow song for the getting ready part of the day, one more dynamic for the romantic session and bridal party pictures and one dancing one for the dancing segment.</FormLabel>
                                <FormControl>
                                    <Textarea
                                    placeholder="Write the songs name and artist or youtube links..."
                                    className="resize-none"
                                    {...field}
                                    />
                                </FormControl>                               
                                </FormItem>
                            )}
                            />
                             <FormField
                                    control={form.control}
                                    name="details"
                                    render={({ field }) => (
                                        <FormItem>
                                        <FormLabel>What are important elements that you will like to make sure are included in the full length film?</FormLabel>
                                        <FormControl>
                                            <Textarea
                                            placeholder="Write few details..."                                            
                                            {...field}
                                            />
                                        </FormControl>                               
                                        </FormItem>
                                    )}
                            />
                            <FormField 
                                control={form.control}
                                name="address"
                                render={({field})=>(
                                    <FormItem className="w-full">
                                        <FormLabel>Address:</FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={disabled}
                                                placeholder=""
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <div className="flex gap-2">
                                <FormField 
                                    control={form.control}
                                    name="city"
                                    render={({field})=>(
                                        <FormItem className="w-[60%]">
                                            <FormLabel>City:</FormLabel>
                                            <FormControl>
                                                <Input
                                                    disabled={disabled}
                                                    placeholder=""
                                                    {...field}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                 <FormField
                                    control={form.control}
                                    name="state"
                                    render={({ field }) => (
                                        <FormItem  className="w-[20%]">
                                        <FormLabel>Email</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="State..." />
                                            </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {states.map((state, index) =>(
                                                        <SelectItem key={index} value={state.abbreviation}>
                                                               {state.name + ", "+ state.abbreviation}
                                                        </SelectItem>
                                                ))}                                           
                                           
                                            </SelectContent>
                                        </Select>                                        
                                        </FormItem>
                                    )}
                                    />
                                 <FormField 
                                    control={form.control}
                                    name="zipCode"
                                    render={({field})=>(
                                        <FormItem className="w-[20%]">
                                            <FormLabel>Zip Code:</FormLabel>
                                            <FormControl>
                                                <Input
                                                    disabled={disabled}
                                                    placeholder=""
                                                    {...field}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>
                    <Button disabled={disabled}>{disabled && <Loader2 className="size-8 animate-spin text-slate-400 p-1"/>}Send Video Questionnaire</Button>
                </form>
            </Form>
        </CardContent>
        <CardFooter>
            <p>Red Barn Studio</p>
        </CardFooter>
    </Card>
  )
}
