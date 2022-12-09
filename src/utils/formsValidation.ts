/**
 * @desc Valida um CPF comparando-o com um valor regex e aplicando o algoritmo de validação.
 * @param cpf CPF a ser validado.
 * @returns valor booleano, verdadeiro para CPF válido ou falso para inválido.
 */
export const validCPF = (cpf: string) => {
    const cpfRegex = new RegExp('^\d{3}.?\d{3}.?\d{3}\-?\d{2}$');
    if (!cpfRegex.test(cpf))
        return false;
    
    cpf = cpf.replace(/[^a-zA-Z0-9 ]/g, '');
    var soma = 0, resto, i;

    // Valida o primeiro dígito
    for(i = 0; i < 9; i++)
        soma += parseInt(cpf.charAt(i)) * (10 - i);

    resto = 11 - (soma % 11);
    if (resto == 10 || resto == 11)
        resto = 0;
    if (resto != parseInt(cpf.charAt(9)))
        return false;

    // Valida o segundo dígito
    soma = 0;
    for(i = 0; i < 10; i++)
        soma += parseInt(cpf.charAt(i)) * (11 - i);
    
    resto = 11 - (soma % 11);
    if (resto == 10 || resto == 11)
        resto = 0;
    if (resto != parseInt(cpf.charAt(10)))
        return false;

    return true;
}

/**
 * @desc Valida um CNPJ comparando-o com um valor regex.
 * @param cnpj CNPJ a ser validado.
 * @returns valor booleano, verdadeiro para CNPJ válido ou falso para inválido.
 */
export const validCNPJ = (cnpj: string) => {
    const cnpjRegex = new RegExp('^(\d{2}.?\d{3}.?\d{3}\/?\d{4}\-?\d{2})$');
    return cnpjRegex.test(cnpj);
}

/**
 * @desc Valida um número de telefone comparando-o com um valor regex.
 * @param phoneNumber número de telefone a ser validado.
 * @returns valor booleano, verdadeiro para telefone válido ou falso para inválido.
 */
export const validPhoneNumber = (phoneNumber: string) => {
    const phoneNumberRegex = new RegExp('(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))');
    return phoneNumberRegex.test(phoneNumber);
}

/**
 * @desc Valida um endereço de e-mail comparando-o com um valor regex.
 * @param email e-mail a ser validado.
 * @returns valor booleano, verdadeiro para email válido ou falso para inválido.
 */
export const validEmail = (email: string) => {
    const emailRegex = new RegExp('[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+');
    return emailRegex.test(email);
}

/*
Fonte dos códigos regex utilizados: https://github.com/osintbrazuca/osint-brazuca-regex
Algoritmo de validação do CPF: https://www.geradorcpf.com/algoritmo_do_cpf.htm
*/