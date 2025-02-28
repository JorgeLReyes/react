import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

export const ImageGallery = ({ photos }: { photos: string[] }) => {
  return (
    <ImageList cols={4} sx={{ overflowY: "auto", width: "100%" }}>
      {Array.from(photos || []).map((item) => (
        <ImageListItem key={item}>
          <img
            srcSet={`${item}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            src={`${item}?w=164&h=164&fit=crop&auto=format`}
            alt={item}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
};
