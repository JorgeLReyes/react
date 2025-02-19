import { Typography, Grid2 } from "@mui/material";
import { ReactNode } from "react";
const AuthLayout = ({
  children,
  title = "",
}: {
  children: ReactNode;
  title?: string;
}) => {
  return (
    <Grid2
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: "100vh", backgroundColor: "primary.main", padding: 4 }}
    >
      <Grid2
        className="box-shadow"
        sx={{
          width: { md: 450 },
          backgroundColor: "white",
          padding: 3,
          borderRadius: 2,
        }}
      >
        <Typography variant="h5" sx={{ mb: 1 }}>
          {title}
        </Typography>
        {children}
      </Grid2>
    </Grid2>
  );
};

export default AuthLayout;
