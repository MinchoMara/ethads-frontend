import Image from "next/image";
import { useEffect, useState } from "react";
import { RequestMessage, RequestMessageProps } from "~/components/display/RequestMessage/RequestMessage";
import { useAdManager } from "~/hooks/useAdManager";
import Pepe from "~/public/pepe.jpeg";

export type MessagesType = RequestMessageProps[];

export const ManageAds = () => {
  const [messages, setMessages] = useState<MessagesType>([]);
  const { getClientInfo } = useAdManager();

  useEffect(() => {
    const fetchMessages = async () => {
      const data = await getClientInfo();
      if (data) {
        const messages: MessagesType = data.map((message) => ({
          adId: message.adId,
          approved: message.approved,
          address: message.address,
          unixTimestamp: message.unixTimestamp,
          companyName: message.companyName,
          adInfo: message.adInfo,
          handleApprove: () => {},
        }));
        setMessages(messages);
      }
    };
    fetchMessages();
  }, []);

  return (
    <div className="flex w-[800px] flex-col items-start gap-6">
      {/* Title */}
      <span className="text-24/heading/l">Requests</span>
      {/* Fields */}
      <div className="flex flex-col items-start gap-5 self-stretch">
        {messages.length === 0 && (
          <div className="flex h-[300px] w-full flex-col items-center justify-center gap-2 text-16/body/l text-gray-600">
            <div className="flex rounded-md border-2 border-blue-600 bg-gray-100 p-1">
              <Image src={Pepe} alt="NoMessage" width={160} height={160} />
            </div>
            <p>No messages yet.</p>
          </div>
        )}
        {messages.map((message, index) => (
          <RequestMessage key={index} {...message} />
        ))}
      </div>
    </div>
  );
};
