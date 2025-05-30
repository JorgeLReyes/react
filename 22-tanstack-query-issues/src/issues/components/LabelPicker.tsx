import LoadingSpiner from "../../shared/components/LoadingSpiner";
import { useLabels } from "../hooks/useLabels";

interface Props {
  selectedLabels: string[];
  onSelectedLabel: (label: string) => void;
}

export const LabelPicker = ({ selectedLabels, onSelectedLabel }: Props) => {
  const { labelsQuery } = useLabels();

  if (labelsQuery.isLoading) return <LoadingSpiner />;

  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {labelsQuery.data?.map((label) => (
        <span
          key={label.id}
          onClick={() => onSelectedLabel(label.name)}
          className={`animate-fadeIn px-2 py-1 rounded-full text-xs font-semibold hover:bg-slate-800 cursor-pointer text-white ${
            selectedLabels.includes(label.name) && "selected-label"
          }`}
          style={{ border: `1px solid #${label.color}` }}
        >
          {label.name}
        </span>
      ))}
    </div>
  );
};
