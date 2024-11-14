import { FaCheck } from "react-icons/fa";
import { GrFormClose } from "react-icons/gr";

const PasswordCriteria = ({ password }) => {
  const criteria = [
    { label: "Au moins 6 caractères", met: password.length >= 7 },
    { label: "Doit contenir une majuscule", met: /[A-Z]/.test(password) },
    { label: "Doit contenir une minuscule", met: /[a-z]/.test(password) },
    { label: "Doit contenir un nombre", met: /\d/.test(password) },
    {
      label: "Doit contenir un caractère spécial",
      met: /[^A-Za-z0-9]/.test(password),
    },
  ];

  return (
    <div className="mt-2 space-y-1 ">
      {criteria.map((c) => (
        <div key={c.label} className="flex items-center text-xs">
          {c.met ? (
            <div className="flex w-[2rem] h-[1rem] justify-center items-center">
              <FaCheck className="flex size-3 text-green-500 mr-2" />
            </div>
          ) : (
            <div className="flex w-[2rem] justify-center items-center">
              <GrFormClose className="flex size-4 text-gray-500 mr-2" />
            </div>
          )}
          <span
            className={
              c.met ? "text-md text-green-500" : "text-md text-gray-500"
            }
          >
            {c.label}
          </span>
        </div>
      ))}
    </div>
  );
};

const PasswordStrengthMeter = ({ password }) => {
  const getStrength = (pass) => {
    let strength = 0;
    if (pass.length >= 6) strength++;
    if (pass.match(/[a-z]/) && pass.match(/[A-Z]/)) strength++;
    if (pass.match(/\d/)) strength++;
    if (pass.match(/[^a-zA-Z\d]/)) strength++;
    return strength;
  };
  const strength = getStrength(password);

  const getColor = (strength) => {
    if (strength === 0) return "bg-red-500";
    if (strength === 1) return "bg-red-400";
    if (strength === 2) return "bg-yellow-500";
    if (strength === 3) return "bg-yellow-400";
    return "bg-green-500";
  };

  const getStrengthText = (strength) => {
    if (strength === 0) return "Très Faible";
    if (strength === 1) return "Failble";
    if (strength === 2) return "Moyen ";
    if (strength === 3) return "Bon";
    return "Excellent";
  };

  return (
    <div className="mt-2">
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs text-gray-400">Sécurité du mot de passe</span>
        <span className="text-xs text-gray-400">
          {getStrengthText(strength)}
        </span>
      </div>

      <div className="flex space-x-1">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className={`h-1 w-1/4 rounded-full transition-colors duration-300
                ${index < strength ? getColor(strength) : "bg-gray-600"}
                `}
          />
        ))}
      </div>
      <PasswordCriteria password={password} />
    </div>
  );
};

export default PasswordStrengthMeter;
