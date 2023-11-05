"use client"
import { InputMask } from "@/models/InputMask";
import clsx from "clsx";
import { useState } from "react";

type CustomInputProps = {
    name: string;
    label: string;
    value: string;
    mask?: InputMask | InputMask.NONE;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const CustomInput = (props: CustomInputProps) => {
    const [inputValue, setInputValue] = useState("");
    const [isFocused, setIsFocused] = useState(false);

    let lastValue = inputValue; // Registra o último valor do campo a cada edição

    const handleInputFocus = () => {
        setIsFocused(true);
    };

    const handleInputBlur = () => {
        setIsFocused(false);
    };

    const doMasked = (value: string): string => {

        // Se o usuário está apagando o conteúdo do campo, desfaz a máscara e 
        // retorna o valor atual conforme a digitação
        if (value.length < lastValue.length) {
            // remove os pontos e - do valor atual
            value = value.replace(/\./g, '').replace(/-/g, '');
            return value;
        }

        switch (props.mask) {
            case InputMask.CPF:

                if (value.length === 3) return value + '.';
                if (value.length === 7) return value + '.';
                if (value.length === 11) return value + '-';

            default:
                return value;
        }


    }

    return (
        <div className="relative flex mt-16">
            <input
                id={props.name}
                type="text"
                className={clsx(
                    "transition-all w-[350px] font-semibold border-b-2 ring-0 focus:outline-none border-input-border-no-focus focus:border-input-border focus:text-input-text-with-focus text-input-text-no-focus bg-transparent",
                    {
                        "translate-y-3": isFocused || inputValue, // Define um preenchimento inferior quando o campo está em foco ou contém texto
                        "pb-3": isFocused || inputValue,
                    }
                )}
                name={props.name}
                placeholder=""
                value={inputValue}
                autoComplete="one-time-code"
                onChange={(e) => {
                    // Apply the input mask on input content
                    setInputValue(doMasked(e.target.value))

                    lastValue = e.target.value; // Registra o último valor do campo a cada edição
                }}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
            />
            <label
                className={clsx("absolute focus:top-4 transition-all pointer-events-none", {
                    "text-xs text-gray-400": isFocused || inputValue, // Mova o rótulo para cima quando o campo está em foco ou contém texto
                    "text-base text-gray-600": !isFocused && !inputValue,
                    "pt-0": isFocused || inputValue, // Define um preenchimento inferior quando o campo está em foco ou contém texto
                })}
            >
                {props.label}
            </label>
        </div>
    );
};