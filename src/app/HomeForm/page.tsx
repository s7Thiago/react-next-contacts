"use client"

import { Button, CustomInput } from '@/components/Index';
import { InputMask } from '@/models/InputMask';
import React from 'react';

export const HomeForm = () => {

    // onEdit nome field
    const handleNome = (value: string) => {
        return value;
    };

    const handleEmail = (value: string) => {
        return value;
    };

    const handleCpf = (value: string) => {
        return value;
    };

    const handleTelefone = (value: string) => {
        return value;
    };

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
                    className='mt-16'
                    content={"Cadastrar"}
                />

                <input type="submit" value="Submit" />

            </form>
        </div>
    );
};