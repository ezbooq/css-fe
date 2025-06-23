/* -------------------------------------------------------------------------- */
/*                                 type                                       */
/* -------------------------------------------------------------------------- */
type Props = {
  steps: Step[];
  selectedTabIndex: number;
};

type Step = {
  id: number;
  name: string;
  description: string;
  href: string;
};

/* -------------------------------------------------------------------------- */
/*                                 component                                  */
/* -------------------------------------------------------------------------- */
export default function ProgressBar({ steps, selectedTabIndex }: Props) {
  const progressPercentage = (selectedTabIndex / steps.length) * 100;

  return (
    <div>
      <div className="flex justify-between">
        <p className="text-sm   text-typography-secondary">
          {steps[selectedTabIndex - 1]?.description || "Progress"}
        </p>
        <div>
          <span className="text-sm text-typography-secondary-light font-medium">
            Step
          </span>
          <span className="text-sm text-typography-secondary-light">
            {` ${selectedTabIndex}`}
          </span>{" "}
          <span className="text-typography-secondary/30">{`of ${steps.length}`}</span>
        </div>
      </div>

      <div aria-hidden="true" className="mt-3">
        <div className="overflow-hidden rounded-full bg-gray-200">
          <div
            style={{ width: `${progressPercentage}%` }}
            className="h-2 rounded-full  bg-light-base-dark"
          />
        </div>
      </div>
    </div>
  );
}
