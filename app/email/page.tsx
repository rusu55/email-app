"use client";
import { useState } from "react";
import { EmailForm } from "./components/email-form";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";

const EmailPage = () => {
  const [loading, isLoading] = useState(false);

  const { toast } = useToast();
  const onSubmit = (values: any) => {
    isLoading(true);

    axios
      .post("/api/send", values)
      .then(() => {
        toast({
          title: "Video Questionnaire",
          description: "The Web Form was sent succesfull!",
        });
      })
      .catch(() => {
        toast({
          title: "Video Questionnaire",
          description: "The Web Form was sent succesfull!",
        });
      })
      .finally(() => {});
  };
  return (
    <div className="w-full flex items-center justify-center">
      <EmailForm onSubmit={onSubmit} disabled={loading} />
    </div>
  );
};

export default EmailPage;
