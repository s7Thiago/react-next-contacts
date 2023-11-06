import clsx from "clsx";
import React from "react";

export type IcoButtonProps = {
    icon: any;
    onClick: () => void;
    className?: string;
};

export const IcoButton = ({ icon, onClick, className }: IcoButtonProps) => {
    return (
        <button className={clsx(`
            rounded-xl
            focus:
            focus:outline-none
            focus:ring-0
            hover:opacity-70
            hover:
            transition-all
            duration-700
            p-2
            w-10
            h-10
            text-button-on-text-no-focus
            bg-button-on-background
        ${className}
`)} onClick={() => {onClick()}}>
            {icon}
</button>
    );
};