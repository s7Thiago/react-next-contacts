"use client"

import { Button, CustomInput } from '@/components/Index';
import { Contact } from '@/models/Contact';
import { InputMask } from '@/models/InputMask';
import React, { useState } from 'react';

export const HomeForm = () => {

    const [newContact, updateNewContact] = useState({} as Contact);

    // Permite recuperar o valor do campo Nome no escopo da tela HomeForm
    const handleNome = (value: string) => {

        updateNewContact({
            ...newContact,
            name: value
        });

        return value;
    };

    // Permite recuperar o valor do campo E-mail no escopo da tela HomeForm
    const handleEmail = (value: string) => {
        updateNewContact({
            ...newContact,
            email: value
        });
        return value;
    };

    // Permite recuperar o valor do campo CPF no escopo da tela HomeForm
    const handleCpf = (value: string) => {

        updateNewContact({
            ...newContact,
            cpf: value
        });

        return value;
    };

    // Permite recuperar o valor do campo Telefone no escopo da tela HomeForm
    const handleTelefone = (value: string) => {

        updateNewContact({
            ...newContact,
            phone: value
        });

        return value;
    };

    //
    const handleSubmit = (event: any) => {
        alert('A name was submitted: ' + event.target.value);

    }

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
                />

            </form>
        </div>
    );
};