import { ModelData } from "~/features/model-ranking/types";

interface ModelInfoDetailsProps {
  model: ModelData;
}
export function ModelInfoDetails({ model }: ModelInfoDetailsProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Model Details</h3>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </p>
    </div>
  );
}
