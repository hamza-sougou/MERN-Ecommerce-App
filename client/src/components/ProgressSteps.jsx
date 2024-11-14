import { FaCircleCheck } from "react-icons/fa6";

const ProgressSteps = ({ step1, step2, step3 }) => {
  return (
    <div className="flex justify-center items-center space-x-4">
      <div
        className={`${
          step1 ? "text-green-500" : "text-gray-300"
        } flex flex-col items-center`}
      >
        <span className="ml-2">Connexion</span>
        <div className="mt-2 text-lg text-center ">
          <FaCircleCheck />
        </div>
      </div>

      {step2 && (
        <>
          {step1 && <div className="h-0.5 w-[10rem] bg-green-500"></div>}
          <div
            className={`${
              step1 ? "text-green-500" : "text-gray-300"
            } flex flex-col items-center`}
          >
            <span>Livraison</span>
            <div className="mt-2 text-lg text-center">
              <FaCircleCheck />
            </div>
          </div>
        </>
      )}

      <>
        {step1 && step2 && step3 ? (
          <div className="h-0.5 w-[10rem] bg-green-500"></div>
        ) : (
          ""
        )}

        <div className={`${step3 ? "text-green-500" : "text-gray-300"}`}>
          <span className={`${!step3 ? "ml-[10rem]" : ""}`}>Validation</span>
          {step1 && step2 && step3 ? (
            <div className="mt-2 text-lg text-center flex flex-col items-center">
              <FaCircleCheck />
            </div>
          ) : (
            <>
              <div className="h-0.5 w-[10rem] bg-gray-300"></div>
              <div className="mt-2 text-lg text-center ml-[10rem] flex flex-col items-center">
                <FaCircleCheck />
              </div>
            </>
          )}
        </div>
      </>
    </div>
  );
};

export default ProgressSteps;
