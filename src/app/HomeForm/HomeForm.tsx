import { CustomInput } from '@/components/CustomInput/CustomInput';
import { InputMask } from '@/models/InputMask';
import React from 'react';

export const HomeForm = () => {
    return (
        <div className='flex justify-between'>
            {/*<h2 className='bg-button-on-background'>Home</h2>*/}

            <form action="">

                <CustomInput
                    label='Nome completo (sem abreviações)'
                    name='nome'
                />

                <CustomInput
                    label='E-mail'
                    name='email'
                />

                <CustomInput
                    label='CPF'
                    name='cpf'
                    mask={InputMask.CPF}
                />

                <CustomInput
                    label='Telefone'
                    name='telefone'
                />

            </form>

        </div>
    );
};