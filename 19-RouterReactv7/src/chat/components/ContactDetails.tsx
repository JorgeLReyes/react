import { useParams } from "react-router";
import { getClient } from "@/assets/fake-data";
import { useQuery } from "@tanstack/react-query";
import { ContactInfo } from "./ContactInfo";
import { SkeletonContactInfo } from "./ContactInfoSkeleton";
import { NoContactSelected } from "./NoContactSelected";

export const ContactDetails = () => {
  const { chatId } = useParams();

  const { data: client, isLoading } = useQuery({
    queryKey: ["client", chatId],
    queryFn: () => getClient(chatId!),
    enabled: !!chatId,
  });

  if (!chatId) return <NoContactSelected />;

  if (!client && isLoading) return <SkeletonContactInfo />;

  if (client) return <ContactInfo client={client} />;

  return <div>Error</div>;
};
