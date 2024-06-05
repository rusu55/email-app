import React from "react";
import {
  Html,
  Head,
  Body,
  Heading,
  Text,
  Tailwind,
  Container,
  Hr,
} from "@react-email/components";

type Props = {
  brideName: string;
  groomName: string;
  weddingDate: string;
  songsOptions: string;
  highlightSong: string | undefined;
  videoSongs: string | undefined;
  details: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
};
export const VideoQuestionnaire = ({
  brideName,
  groomName,
  weddingDate,
  songsOptions,
  highlightSong,
  videoSongs,
  details,
  address,
  city,
  state,
  zipCode,
}: any) => {
  return (
    <Html>
      <Head />
      <Tailwind>
        <Body className=" bg-white my-auto mx-auto font-sans px-2">
          <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] max-w-[465px] md: max-w-[800px] shadow-md">
            <Heading className="text-black text-[24px] font-normal text-center p-0 my-[10px] mx-0">
              Video Questionnaire
            </Heading>
            <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
            <Text className="text-[#666666] text-[16px] leading-[24px]">
              <strong>Bride Name: </strong> {brideName}
            </Text>
            <Text className="text-[#666666] text-[16px] leading-[24px]">
              <strong>Groom Name: </strong> {groomName}
            </Text>
            <Text className="text-[#666666] text-[16px] leading-[24px]">
              <strong>Wedding Date: </strong> {weddingDate}
            </Text>
            <Text className="text-[#666666] text-[16px] leading-[24px]">
              <strong>Songs Seelection: </strong> {songsOptions}
            </Text>
            <Text className="text-[#666666] text-[16px] leading-[24px]">
              <strong>Highlight Video Song: </strong> {highlightSong}
            </Text>
            <Text className="text-[#666666] text-[16px] leading-[24px]">
              <strong>Full Length Video Songs: </strong> {videoSongs}
            </Text>
            <Text className="text-[#666666] text-[16px] leading-[24px]">
              <strong>
                What are important elements that you will like to make sure are
                included in the full length film:{" "}
              </strong>{" "}
              {details}
            </Text>
            <Text className="text-[#666666] text-[16px] leading-[24px]">
              <strong>Address would you like your USB to be sent:</strong>{" "}
              {address}
              {", "}
              {city}
              {", "}
              {state}
              {", "}
              {zipCode}
            </Text>
            <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};
