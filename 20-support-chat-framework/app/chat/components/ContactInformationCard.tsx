import { useLoaderData, useNavigation, useParams } from "react-router";
import { ContactInfoSkeleton } from "./ContactInfomationSkeleton";
import { ContactInformation } from "./ContactInformation";
import { NoContactSelected } from "./NoContactSelected";
import type { Client } from "../interfaces/chat.interface";

export const ContactInformationCard = () => {
  const { id } = useParams();
  const { client } = useLoaderData<{ clients: Client[]; client: Client }>();
  const { state } = useNavigation();

  const isPending = state === "loading";
  // const client = clients.find((client) => client.id === id);

  if (client) return <ContactInformation client={client} />;

  if (!id || !client) return <NoContactSelected />;

  return isPending ? (
    <ContactInfoSkeleton />
  ) : (
    <ContactInformation client={client} />
  );
};
