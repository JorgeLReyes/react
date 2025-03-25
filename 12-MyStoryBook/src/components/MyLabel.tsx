import "./MyLabel.css";

export interface Props {
  /**
   * Text to display
   **/
  label: string;
  /**
   * Label size
   **/
  size?: "h1" | "h2" | "h3" | "normal";
  /**
   * Label cappitalization
   **/
  allCaps?: boolean;
  /**
   * Label color
   **/
  color?: "text-primary" | "text-secondary" | "text-tertiary";
  /**
   * Label font color
   **/
  fontColor?: string;
}
export const MyLabel = ({
  label,
  size = "normal",
  allCaps = false,
  color,
  fontColor,
}: Props) => {
  return (
    <>
      <span
        className={`${size} ${color}`}
        style={{
          color: fontColor,
        }}
      >
        {allCaps ? label.toUpperCase() : label}
      </span>
    </>
  );
};
