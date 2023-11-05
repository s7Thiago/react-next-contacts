"use client"

import { Button, CustomInput } from '@/components/Index';
import { Contact } from '@/models/Contact';
import { InputMask } from '@/models/InputMask';
import { MaskFeedback } from '@/utils/mask';
import React, { useState } from 'react';

export const HomeForm = () => {

    const [newContact, updateNewContact] = useState({} as Contact);
    const [hasError, notifyError] = useState(false);

    const updateHasError = (feedback: MaskFeedback) => {
        if(feedback.isValid) notifyError(false);
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
    const handleSubmit = (event: any) => {
        alert('A name was submitted: ' + event.target.value);

    }

    console.table(newContact);

    return (
        <div className='flex justify-between'>
            <form action="" onSubmit={handleSubmit}>

                <CustomInput
                    label='Nome completo (sem abreviações)'
                    name='nome'
                    mask={InputMask.NAME}
                    value='Testando'
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

                <Button
                    className='mt-16 px-32'
                    content={"Cadastrar"}
                    isLoading={false}
                    hasError={hasError}
                />

            </form>
        </div>
    );
};