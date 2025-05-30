import { useQuery } from "@tanstack/react-query";
import { getLabels } from "../../helpers/getLabels";

export const useLabels = () => {
  const labelsQuery = useQuery({
    queryKey: ["labels"],
    queryFn: getLabels,
    staleTime: 1000 * 60 * 60,
    // placeholderData: [
    //   {
    //     id: 71502270,
    //     node_id: "MDU6TGFiZWw3MTUwMjI3MA==",
    //     url: "https://api.github.com/repos/facebook/react/labels/Component:%20Build%20Infrastructure",
    //     name: "Component: Build Infrastructure",
    //     color: "f9d0c4",
    //     default: false,
    //     description: "",
    //   },
    // ],
    // initialData: [
    //   {
    //     id: 71502270,
    //     node_id: "MDU6TGFiZWw3MTUwMjI3MA==",
    //     url: "https://api.github.com/repos/facebook/react/labels/Component:%20Build%20Infrastructure",
    //     name: "Component: Build Infrastructure",
    //     color: "f9d0c4",
    //     default: false,
    //     description: "",
    //   },
    // ],
  });

  return {
    labelsQuery,
  };
};
