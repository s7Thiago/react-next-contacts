import clsx from "clsx";

export type CustomCardProps = {
    children?: any;
    className?: string;
}

export const CustomCard = ({ children, className }: CustomCardProps) => {
    return (
        <div className={clsx(
            `
            p-5
            m-5
            hover:shadow-2xl
            rounded-2xl
            transition-all
            duration-500
            hover:scale-105
            bg-black
            ${className}
            `,{}
            )} >
            {children}
        </div>);
}