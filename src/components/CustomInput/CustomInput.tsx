"use client"
import { InputMask } from "@/models/InputMask";
import { MaskFeedback, cpfMask, getMask, phoneMask } from "@/utils/mask";
import clsx from "clsx";
import { useState } from "react";

type CustomInputProps = {
    name: string;
    label: string;
    value?: string | "";
    mask?: InputMask | InputMask.CPF;
    onEdit?: (maskFeedbackEvent: MaskFeedback) => void;
    className?: string;
};

export const CustomInput = (props: CustomInputProps) => {
    const [inputValue, setInputValue] = useState("");
    const [isFocused, setIsFocused] = useState(false);
    const [hasError, updateHasError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    let lastValue = inputValue; // Registra o último valor do campo a cada edição

    const handleInputFocus = () => {
        setIsFocused(true);
    };

    const handleInputBlur = () => {
        setIsFocused(false);
    };

    const doMasked = (value: string, mask: InputMask): MaskFeedback => {
        // Se o usuário está apagando o conteúdo do campo, desfaz a máscara e
        // retorna o valor atual conforme a digitação
        // remove os espaços e todos os caracteres .()- do valor atual
        if (value.length < (lastValue??'').length) {
            return {
                processedValue: value = value.replace(/\s/g, '').replace(/\.|\(|\)|-/g, ''),
                isValid: getMask(mask)(value, lastValue).isValid ?? false,
                errorMessage: getMask(mask)!(value, lastValue).errorMessage ?? "Erro desconhecido"
            }
        }

        // Se o usuário está digitando, aplica a máscara adequada
        switch (mask) {
            case InputMask.CPF:
            case InputMask.PHONE:
            case InputMask.NAME:
            case InputMask.EMAIL:
                return getMask(mask)(value, lastValue);
            default:
                return { processedValue: value, isValid: true };
        }
    }

    const getInputMaxLength = (): number => {
        switch (props.mask) {
            case InputMask.CPF:
                return 14;
            case InputMask.PHONE:
                return 16;
            case InputMask.EMAIL:
                return 50;
            default:
                return 140;
        }
    }

    return (
        <div className={clsx(`relative flex flex-col mt-16`, props.className)}>
            <input
                id={props.name}
                type="text"
                className={clsx(
                    `transition-all
                    w-[350px]
                    font-semibold
                    border-b-2
                    ring-0
                    focus:outline-none
                    border-input-border-no-focus
                    focus:border-input-border
                    focus:text-input-text-with-focus
                    text-gray-400
                    bg-transparent`,
                    {
                        "translate-y-3": isFocused || inputValue || props.value, // Define um preenchimento inferior quando o campo está em foco ou contém texto
                        "pb-[1.5px] pt-3": isFocused || inputValue || props.value,
                        "border-input-invalid-border": hasError || ((isFocused || inputValue) && hasError),
                    }
                )}
                name={props.name}
                placeholder=""
                value={inputValue}
                maxLength={getInputMaxLength()}
                autoComplete="one-time-code"
                onChange={(e) => {
                    // Apply the input mask on input content
                    const feedback = doMasked(e.target.value, props.mask ?? InputMask.NONE);

                    lastValue = e.target.value; // Registra o último valor do campo a cada edição
                    setInputValue(feedback.processedValue)
                    e.target.value = feedback.processedValue;

                    if (!feedback.isValid) {
                        updateHasError(true);
                        setErrorMessage(feedback.errorMessage!)
                    }
                    else updateHasError(false);

                    if (props.onEdit) {
                        props.onEdit(feedback);
                    }
                }}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
            />
            <label
                className={clsx("absolute focus:top-4 transition-all pointer-events-none", {
                    "text-xs text-gray-400": isFocused || inputValue || props.value, // Mova o rótulo para cima quando o campo está em foco ou contém texto
                    "text-base text-gray-600": !isFocused && !inputValue,
                    "pt-0": isFocused || inputValue, // Define um preenchimento inferior quando o campo está em foco ou contém texto
                })}
            >
                {props.label}
            </label>

            <p className={clsx(
                `transition-all duration-500 text-input-invalid-font float-left font-semibold text-xs`,
                {
                "translate-x-1/2": !hasError,
                "translate-y-3": !hasError,
                "opacity-0": !hasError,
                "opacity-100": hasError,
                "pt-4": isFocused || inputValue, // Define um preenchimento inferior quando o campo está em foco ou contém texto
                //"hidden": !hasError,

            })}>{errorMessage}</p>

        </div>
    );
};