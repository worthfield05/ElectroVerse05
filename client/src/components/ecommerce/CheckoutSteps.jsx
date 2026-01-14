import { Check } from "lucide-react";
import React from "react";

const CheckoutSteps = ({ currentStep }) => {
  const steps = [
    { number: 1, label: "Shipping" },
    { number: 2, label: "Payment" },
    { number: 3, label: "Review" },
  ];
  return (
    <div className="flex items-center justify-between">
      {steps.map((step, index) => (
        <div className="flex items-center flex-1" key={index}>
          <div className="flex flex-col items-center relative">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold *:**:
                    
                    ${
                      currentStep > step.number
                        ? "bg-green-600 text-white"
                        : currentStep === step.number
                        ? "bg-neutral-900 text-white ring-4 ring-neutral-200"
                        : "bg-neutral-100 text-neutral-400"
                    }`}
            >
              {currentStep > step.number ? (
                <Check className="w-5 h-5" />
              ) : (
                step.number
              )}
            </div>
            <span
              className={`text-xs mt-2 font-medium ${
                currentStep >= step.label
                  ? "text-neutral-900"
                  : "text-neutral-400"
              }`}
            >
              {step.label}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div
              className={`flex-1 h-0.5 mx-2 mb-6 ${
                currentStep > step.number ? "bg-green-600" : "bg-neutral-200"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default CheckoutSteps;
