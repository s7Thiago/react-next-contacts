import clsx from "clsx";

type CustomButtonProps = {
    content: any;
    onClick?: () => void;
    className?: string;
};

export const CustomButton = ({ content, onClick, className }: CustomButtonProps) => {
    // return (
    //     <div className={clsx("flex h-14 text-lg font-semibold pt-7 rounded-full transition-all duration-700 hover:opacity-70 text-button-on-text-no-focus bg-button-on-background", {

    //     })}>
    //         <div className="m-auto w-auto">
    //             <h2 className="pointer-events-none" >{props.content}</h2>
    //         </div>

    //     </div>
    // );

    return (
        <button className={clsx(
            `
               mt-16
               font-semibold
               transition-all duration-700
               hover:opacity-70
               focus:ring-4
               rounded-full
               text-lg
               py-2.5
               ring-0
             text-button-on-text-no-focus
             bg-button-on-background
             focus:bg-button-on-background
               focus:outline-none`, className)}>
            {content}
        </button>
    );
}