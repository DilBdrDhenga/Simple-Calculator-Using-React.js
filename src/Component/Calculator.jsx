import { useState } from "react";
import buttons from "./Data/data";
import { evaluate } from "mathjs";

const Calculator = () => {
  const [input, setInput] = useState("");

  const handleClick = (value) => {
    if (value === "DEL") {
      handleBackspace();
    } else if (value === "AC") {
      handleClear();
    } else if (value === "=") {
      handleCalculate();
    } else {
      setInput(input + value);
    }
  };

  const handleBackspace = () => {
    setInput(input.slice(0, -1));
  };

  const handleClear = () => {
    setInput("");
  };

  const handleCalculate = () => {
    try {
      const result = evaluate(input);
      setInput(result.toString());
    } catch (err) {
      setInput("Error");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-200 to-purple-500">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <div className="mb-4 p-5 bg-blue-100 rounded text-right text-2xl shadow-inner">
          {input || "0"}
        </div>
        <div className="grid grid-cols-4 gap-4">
          {buttons.map((button, i) => {
            let buttonClass = "calculator-button";

            if (button.type === "action") {
              if (button.label === "AC" || button.label === "DEL") {
                buttonClass += " bg-red-400 hover:bg-red-500";
              }
            } else if (button.type === "operator") {
              buttonClass += " bg-green-300 hover:bg-green-500";
            } else if (button.label === "=") {
              buttonClass += " bg-yellow-400 hover:bg-yellow-500";
            }
            return (
              <button
                key={button.label}
                className={buttonClass}
                onClick={() => {
                  handleClick(button.label);
                }}
              >
                {button.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Calculator;
