import { FaCheck } from "react-icons/fa6";

const ProgressSteps = ({ step1, step2, step3 }) => {
  const steps = [
    { label: "Connexion", completed: step1 },
    { label: "Livraison", completed: step2 },
    { label: "Validation", completed: step3 },
  ];

  return (
    <div className="flex justify-center items-center space-x-6">
      {steps.map((step, index) => (
        <div key={index} className="flex items-center">
          {/* Step badge */}
          <div className="flex flex-col items-center ">
            <div
              className={`flex items-center justify-center w-12 h-12 rounded-full text-lg font-bold border-2 transition-all duration-300 ${
                step.completed
                  ? "bg-orange-500 text-white border-orange-500"
                  : "bg-white text-gray-400 border-gray-300"
              }`}
            >
              {step.completed ? <FaCheck /> : index + 1}
            </div>

            {/* Label */}
            <div className="mt-2 text-center">
              <span
                className={`block text-sm font-medium ${
                  step.completed ? "text-orange-500" : "text-gray-400"
                }`}
              >
                {step.label}
              </span>
            </div>
          </div>

          {/* Line */}
          {index < steps.length - 1 && (
            <div
              className={`h-1 w-16 mx-4 transition-all duration-300 ${
                steps[index + 1]?.completed ? "bg-orange-500" : "bg-gray-300"
              }`}
            ></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProgressSteps;
