"use client"

import { CustomButton, CustomCard, CustomInput } from '@/components/Index';
import { Contact } from '@/models/Contact';
import { InputMask } from '@/models/InputMask';
import { ContactLocalStorageRepository } from '@/repository/ContactLocalStorageRepository';
import { MaskFeedback } from '@/utils/mask';
import clsx from 'clsx';
import { useState } from 'react';

export type HomeFormProps = {
    contactsState: {
        contacts: Contact[];
        updateContacts: (contacts: Contact[]) => void;
    };
    className?: string;
};

export const HomeForm = ({ contactsState, className, }: HomeFormProps) => {

    const repository = ContactLocalStorageRepository.INSTANCE;

    const [newContact, updateNewContact] = useState({} as Contact);
    const [hasError, notifyError] = useState(false);
    const [isLoading, notifyLoading] = useState(false);

    const updateHasError = (feedback: MaskFeedback) => {
        if (feedback.isValid) notifyError(false);
        else notifyError(true);
    }

    // Permite recuperar o valor do campo Nome no escopo da tela HomeForm
    const handleNome = (maskFeedbackEvent: MaskFeedback) => {

        updateNewContact({
            ...newContact,
            name: maskFeedbackEvent.processedValue
        });

        updateHasError(maskFeedbackEvent);

        return maskFeedbackEvent.processedValue;
    };

    // Permite recuperar o valor do campo E-mail no escopo da tela HomeForm
    const handleEmail = (maskFeedbackEvent: MaskFeedback) => {
        updateNewContact({
            ...newContact,
            email: maskFeedbackEvent.processedValue
        });

        updateHasError(maskFeedbackEvent);

        return maskFeedbackEvent.processedValue;
    };

    // Permite recuperar o valor do campo CPF no escopo da tela HomeForm
    const handleCpf = (maskFeedbackEvent: MaskFeedback) => {

        updateNewContact({
            ...newContact,
            cpf: maskFeedbackEvent.processedValue
        });

        updateHasError(maskFeedbackEvent);

        return maskFeedbackEvent.processedValue;
    };

    // Permite recuperar o valor do campo Telefone no escopo da tela HomeForm
    const handleTelefone = (maskFeedbackEvent: MaskFeedback) => {

        updateNewContact({
            ...newContact,
            phone: maskFeedbackEvent.processedValue
        });

        updateHasError(maskFeedbackEvent);

        return maskFeedbackEvent.processedValue;
    };

    //
    const handleSubmit = async (event: any) => {
        notifyLoading(true);

        // Aguarda 1.5s e atualiza o estado isLoading para false
        setTimeout(() => {
            notifyLoading(false);
        }, 1500);

        event.preventDefault();

        repository.createContact(newContact);

        repository.getContacts().then((contacts) => {
            contactsState.updateContacts(contacts);
        });
    }

    // aguarda 1 segundo, e prossegue
    setTimeout(() => {
        // Se o modo for UPDATE, atualiza o estado do contato selecionado
    }, 1000);

    return (
        <CustomCard className={clsx(
            `flex justify-between bg-white ${className}`,
            {
                "transition-all": true,
            }
        )}>


            <form
                action=""
                onSubmit={handleSubmit}
                className='flex items-center justify-center flex-col w-full h-full'
            >

            <h1
            className='text-sm font-bold text-gray-500'
            >Preencha o formulário para cadastrar</h1>
                <CustomInput
                    label='Nome completo (sem abreviações)'
                    name='nome'
                    mask={InputMask.NAME}
                    onEdit={handleNome}
                />

                <CustomInput
                    label='E-mail'
                    name='email'
                    mask={InputMask.EMAIL}
                    onEdit={handleEmail}
                />

                <CustomInput
                    label='CPF'
                    name='cpf'
                    mask={InputMask.CPF}
                    onEdit={handleCpf}
                />

                <CustomInput
                    label='Telefone'
                    name='telefone'
                    mask={InputMask.PHONE}
                    onEdit={handleTelefone}
                />

                <CustomButton
                    className='mt-16 px-32 items-center justify-center flex'
                    content={"Cadastrar"}
                    isLoading={isLoading}
                    hasError={hasError}
                />
            </form>
        </CustomCard>
    );
};