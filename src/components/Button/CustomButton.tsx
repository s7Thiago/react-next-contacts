import clsx from "clsx";
import { LoadingSpinner } from "./components/LoadingSpinner";

type CustomButtonProps = {
    content: any;
    isLoading?: boolean;
    hasError?: boolean;
    onClick?: () => void;
    className?: string;
};

export const CustomButton = ({ hasError = false, isLoading = false, content, onClick, className }: CustomButtonProps) => {
    return (
        <button className={clsx(
            `
               mt-16
               font-semibold
               transition-all
               duration-700
               hover:opacity-70
               rounded-full
               focus:ring-0
               text-lg
               py-2.5
               ring-0
             text-button-on-text-no-focus
             bg-button-on-background
             focus:bg-button-on-background
               focus:outline-none
               ${className}
               `,
               {
                "bg-button-off-background": hasError,
                "text-button-off-text-no-focus": hasError,
                "pointer-events-none": hasError,
               }
               )} onClick={onClick}>

            {isLoading ? <LoadingSpinner /> : content}

        </button>
    );
}