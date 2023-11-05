import { Contact } from "@/models/Contact";
import { Avatar, AvatarIcon } from "@nextui-org/react";
import clsx from "clsx";

export type ListItemProps = {
    contact: Contact;
    index: number;
    totalItems: number;

}

export const ListItem = ({ contact, index, totalItems }: ListItemProps) => {

    return (
        <div className={clsx(
            `
            flex
            flex-row
            gap-4
            `, {})}>

            <div className="w-10 h-10 rounded-full bg-gray-400"></div>

            <div>
                <h2 className="font-semibold">{contact.name}</h2>
                <h2 className="text-gray-400">{contact.email}</h2>

                {totalItems - 1 !== index ?
                    <div>
                        <p />
                        <div className="h-[0.5px] bg-gray-200 w-[400px] mt-5 mb-5"></div>
                        <p />
                    </div> : null
                }

            </div>


        </div>
    );

}