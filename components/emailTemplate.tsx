import * as React from "react";
interface EmailTemplateProps {
  brideName: string;
  groomName: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  brideName,
  groomName,
}) => {
  return (
    <div>
      <h1>Video Questionnaire</h1>
      <div>
        <p className=" font-bold text-lg">
          Bride Name:{" "}
          <span className=" text-base font-semibold">{` ${brideName}`}</span>
        </p>
        <p className=" font-bold text-lg">
          Groom Name:{" "}
          <span className=" text-base font-semibold">{` ${groomName}`}</span>
        </p>
      </div>
    </div>
  );
};
