
import React from 'react';
import { cn } from '@/lib/utils';

interface StepProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  isComplete?: boolean;
  isCurrent?: boolean;
}

export const Step: React.FC<StepProps> = ({
  icon,
  title,
  description,
  isComplete,
  isCurrent,
}) => {
  return (
    <div className="flex-1">
      <div
        className={cn(
          "flex items-center justify-center rounded-full w-10 h-10 mx-auto",
          isComplete ? "bg-primary text-primary-foreground" : 
          isCurrent ? "border-2 border-primary text-primary" : 
          "border-2 border-gray-300 text-gray-300"
        )}
      >
        {icon}
      </div>
      <div className="text-center mt-2">
        <div className={cn(
          "font-medium",
          isCurrent ? "text-primary" : isComplete ? "text-foreground" : "text-muted-foreground"
        )}>
          {title}
        </div>
        {description && (
          <div className={cn(
            "text-xs",
            isCurrent ? "text-primary" : "text-muted-foreground"
          )}>
            {description}
          </div>
        )}
      </div>
    </div>
  );
};

interface StepsProps {
  currentStep: number;
  children: React.ReactNode;
}

export const Steps: React.FC<StepsProps> = ({ currentStep, children }) => {
  const steps = React.Children.toArray(children) as React.ReactElement<StepProps>[];

  return (
    <div className="w-full">
      <div className="flex justify-between relative">
        {/* Connector line */}
        <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200" />
        
        {steps.map((step, index) => {
          const isComplete = index < currentStep;
          const isCurrent = index === currentStep;
          
          return React.cloneElement(step, {
            key: index,
            isComplete,
            isCurrent,
          });
        })}
      </div>
    </div>
  );
};
