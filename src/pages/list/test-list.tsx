import { CustomCard } from "@/components/Index";
import clsx from "clsx";

export default function EditForm () {
    return (<CustomCard className={clsx(`
    -p-[30px]
    bg-white w-auto h-auto text-black
    `, {})}>
        <h1>aaaa</h1>
        olá
    </CustomCard>);
};