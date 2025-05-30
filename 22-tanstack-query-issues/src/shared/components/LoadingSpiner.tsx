import { FiRefreshCcw } from "react-icons/fi";

const LoadingSpiner = () => {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <FiRefreshCcw size={40} className="animate-spin" aria-label="Cargando" />
    </div>
  );
};

export default LoadingSpiner;
