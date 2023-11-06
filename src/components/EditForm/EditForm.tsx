import { type } from "os";
import { CustomButton, CustomCard, CustomInput } from "../Index";
import { Contact } from "@/models/Contact";
import clsx from "clsx";
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ContactLocalStorageRepository } from "@/repository/ContactLocalStorageRepository";
import { IcoButton } from "../List/components/ListItem/components/IconButton";
import { useState } from "react";
import { MaskFeedback } from "@/utils/mask";
import { InputMask } from "@/models/InputMask";

export type EditFormProps = {
    className?: string;
    contactsState: {
        contacts: Contact[];
        updateContacts: (contacts: Contact[]) => void;
    };
    selectedContactState: {
        selectedContact: Contact;
        updateSelectedContact: (selectedContact: Contact) => void;
    };
}

export const EditForm = ({ className, selectedContactState, contactsState }: EditFormProps) => {

    let contact = selectedContactState.selectedContact;
    const repository = ContactLocalStorageRepository.INSTANCE;
    const [hasError, notifyError] = useState(false);

    const updateHasError = (feedback: MaskFeedback) => {
        if (feedback.isValid) notifyError(false);
        else notifyError(true);
    }

    // Permite recuperar o valor do campo Nome no escopo da tela HomeForm
    const handleNome = (maskFeedbackEvent: MaskFeedback) => {
        updateHasError(maskFeedbackEvent);

        selectedContactState.updateSelectedContact({
            ...contact,
            name: maskFeedbackEvent.processedValue
        });

        console.table(selectedContactState.selectedContact);

        return maskFeedbackEvent.processedValue;
    };

    const handleEmail = (maskFeedbackEvent: MaskFeedback) => {
        updateHasError(maskFeedbackEvent);

        selectedContactState.updateSelectedContact({
            ...contact,
            email: maskFeedbackEvent.processedValue
        });

        console.table(selectedContactState.selectedContact);

        return maskFeedbackEvent.processedValue;
    };

    const handleCpf = (maskFeedbackEvent: MaskFeedback) => {
        updateHasError(maskFeedbackEvent);

        selectedContactState.updateSelectedContact({
            ...contact,
            cpf: maskFeedbackEvent.processedValue
        });

        console.table(selectedContactState.selectedContact);

        return maskFeedbackEvent.processedValue;
    };

    const handleTelefone = (maskFeedbackEvent: MaskFeedback) => {
        updateHasError(maskFeedbackEvent);

        selectedContactState.updateSelectedContact({
            ...contact,
            phone: maskFeedbackEvent.processedValue
        });

        console.table(selectedContactState.selectedContact);

        return maskFeedbackEvent.processedValue;
    };

    const handleSubmit = async (event: any) => {

        // Aguarda 1.5s e atualiza o estado isLoading para false
        setTimeout(() => { }, 1500);

        event.preventDefault();

        repository.updateContact(contact);

        setTimeout(() => {
            repository.getContacts().then((contacts) => {
                contactsState.updateContacts(contacts);
            });
        }, 50);

        selectedContactState.updateSelectedContact({} as Contact);
    }

    setTimeout(() => { }, 90);

    return (<CustomCard className={clsx(`
    transition-all duration-500
    bg-transparent font-semibold
    opacity-0 text-black
    translate-y-48
    translate-x-[500px]
    h-[700px]
    z-40
    ${className}
    `, {
        "pointer-events-none": !contact.id,
        "opacity-100": contact.id,
        "p-10": contact.id,
        "w-[450px]": contact.id,
        "h-auto": contact.id,
        "bg-white": contact.id,
        "w-auto": contact.id,
        "translate-y-[50px]": contact.id,
        "translate-x-[50px]": contact.id,
        "z-0": contact.id,
        //"blur-2xl": contact.id,
    })}>

        <div className="relative">

            <CustomCard className={clsx(`
            transition-all duration-500
            fixed -left-[100px] bg-white
            shadow-2xl select-none
            opacity-100
            z-50
            `, {
                "opacity-0": !contact.id,
                "translate-x-[-150px]": !contact.id,
                "translate-y-[-550px]": !contact.id,
            })} >
                <h1><strong>Dados Atuais</strong></h1>
                <h3><strong>E-mail: </strong>{contact.email}</h3>
                <h3><strong>Nome: </strong> {contact.name}</h3>
                <h3><strong>CPF: </strong> {contact.cpf}</h3>
                <h3><strong>Telefone: </strong>{contact.phone}</h3>
            </CustomCard>
        </div>

        <div className="relative">
            <IcoButton
                className={clsx(`
                absolute top-0 right-0
                bg-input-invalid-border
                opacity-0 float-right
                `, {
                    "opacity-100": contact.id,
                    "pointer-events-none": !contact.id
                })}
                icon={<FontAwesomeIcon icon={faClose} />}
                onClick={() => {
                    setTimeout(() => {
                        selectedContactState.updateSelectedContact({} as Contact);
                    }, 90);

                    setTimeout(() => {
                        contact = selectedContactState.selectedContact;
                    }, 90);
                }} />
        </div>

        <div className="flex flex-col justify-center gap-1">
            <form
                action=""
                onSubmit={handleSubmit}
                className='flex items-center justify-center flex-col w-full h-full'
            >
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <CustomInput
                    label='E-mail'
                    name='email'
                    mask={InputMask.EMAIL}
                    value={contact.email}
                    onEdit={handleEmail}
                />

                <CustomInput
                    label='Nome completo (sem abreviações)'
                    name='nome'
                    mask={InputMask.NAME}
                    value={contact.name}
                    onEdit={handleNome}
                />

                <CustomInput
                    label='CPF'
                    name='cpf'
                    mask={InputMask.CPF}
                    value={contact.cpf}
                    onEdit={handleCpf}
                />

                <CustomInput
                    label='telefone'
                    name='telefone'
                    mask={InputMask.PHONE}
                    value={contact.phone}
                    onEdit={handleTelefone}
                />

                <CustomButton
                    className='mt-16 px-32 items-center justify-center flex'
                    content={"Autalizar"}
                    isLoading={false}
                    hasError={hasError} />
            </form>
        </div>


    </CustomCard>);
};