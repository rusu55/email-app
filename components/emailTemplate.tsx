import * as React from "react";
import {
  Body,
  Column,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
  Row,
} from "@react-email/components";

interface EmailTemplateProps {
  brideName: string;
  groomName: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  brideName,
  groomName,
}) => {
  return (
   <Html>
      <Head />
      <Preview>Stack overflow tips for searching</Preview>
      <Body>
        <Container>
          
        </Container>
      </Body>
   </Html>
  );
};
