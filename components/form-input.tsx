"use client";

import * as React from 'react';
import { LucideIcon } from 'lucide-react';
import { Input, type InputProps } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface FormInputProps extends InputProps {
  label: string;
  icon?: LucideIcon;
  containerClassName?: string;
}

const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, icon: Icon, id, containerClassName, className, ...props }, ref) => {
    const inputId = id || `input-${props.name}`;
    return (
      <div className={cn('space-y-2', containerClassName)}>
        <label htmlFor={inputId} className="text-sm font-medium text-gray-700">
          {label}
        </label>
        <div className="relative group">
          {Icon && (
            <Icon
              className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 transition-colors group-focus-within:text-[#3EA76F]"
              aria-hidden="true"
            />
          )}
          <Input
            id={inputId}
            className={cn(
              'h-12 pl-10 pr-4',
              {
                'pl-4': !Icon,
              },
              className
            )}
            ref={ref}
            {...props}
          />
        </div>
      </div>
    );
  }
);

FormInput.displayName = 'FormInput';

export { FormInput };
