import { Typography } from "@mui/material";

export const ErrorMessage = ({
  message,
}: {
  message?: string | undefined | null;
}) => {
  if (!message) return null;
  return <Typography color={"error"}>{message}</Typography>;
};
