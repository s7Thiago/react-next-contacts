import { CustomCard } from "../CustomCard/CustomCard";

export const List = () => {
    return (
        <CustomCard className={`
            transition-all
            w-[500px]
            h-auto
            bg-black
            bg-white
            text-black
        `}>
            <h2>List</h2>
        </CustomCard>
    );
}