import { InputMask } from "@/models/InputMask";

export type MaskFeedback = {
    processedValue: string;
    isValid: boolean;
    errorMessage?: string | "";
}

export const getMask = (mask: InputMask) => {
    switch (mask) {
        case InputMask.CPF:
            return cpfMask;
        case InputMask.PHONE:
            return phoneMask;
        case InputMask.NAME:
            return nameMask;
        case InputMask.EMAIL:
            return emailMask;
        default:
            return defaultMask;
    }
}

export const clearMask = (value: string = '') => {
    // remove os espaços e todos os caracteres .()- do valor atual
    return value = value.replace(/\s/g, '').replace(/\.|\(|\)|-/g, '');
}

export const defaultMask = (value: string = '', lastValue: string = ''): MaskFeedback => {
    return {
        processedValue: value,
        isValid: true,
    };
}

export const cpfMask = (value: string = '', lastValue: string = ''): MaskFeedback => {

    let result = value;

    // formata o que for possível, caso o usuário volte a digitar, após apagar
    if (value.length === 11 && (!value.includes('-') && !value.includes('.'))) {
        clearMask(value);
        // retorna o valor completamente formatado
        result = value.substring(0, 3) + '.' + value.substring(3, 6) + '.' + value.substring(6, 9) + '-' + value.substring(9, 11);
    }

    if (result.length === 3) result = value += '.';
    if (result.length === 7) result = value += '.';
    if (result.length === 11) result = value += '-';

    return {
        processedValue: result,
        isValid: result == '' || result.replace(/\D/g, '').length === 11,
        errorMessage: "O CPF informado é inválido!",
    };
}

export const phoneMask = (value: string = '', lastValue: string = ''): MaskFeedback => {

    // clearMask(value);

    let result = value;
    let espacos = value.split(' ').length - 1;

    // formata o que for possível, caso o usuário volte a digitar, após apagar
    if (value.length >= 7 && (espacos > 2 || !value.startsWith('('))) {
        clearMask(value);
        // retorna o valor completamente formatado no formato (xx) x xxxx-xxxx
        result = '(' + value.substring(0, 2) + ') ' + value.substring(2, 3) + ' ' + value.substring(3, 7) + '-' + value.substring(7, 11);

    }

    if (value.length === 1) result = '(' + value;
    if (value.length === 3) result = value + ') ';
    if (value.length === 6) result = value + ' ';
    if (value.length === 11) result = value + '-';

    return {
        processedValue: result,
        isValid: result == '' || result.replace(/\D/g, '').length === 11,
        errorMessage: "O telefone não é válido",
    };
}

export const nameMask = (value: string = '', lastValue: string = ''): MaskFeedback => {
        let result = value;

        return {
            processedValue: result,
            isValid: result ==='' || result.length >= 3,
            errorMessage: "Campo deve conter 3 caracteres ou mais",
        };
}

export const emailMask = (value: string = '', lastValue: string = ''): MaskFeedback => {
    let result = value;

    return {
        processedValue: result,
        isValid: result ==='' || (result.length >= 5 || result.includes('@')),
        errorMessage: "O e-mail fornecido não é valido",
    };
}
