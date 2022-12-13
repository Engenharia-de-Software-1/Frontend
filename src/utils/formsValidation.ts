/**
 * @desc Valida um CNPJ aplicando um algoritmo de validação.
 * @param cnpj CNPJ a ser validado.
 * @returns valor booleano, verdadeiro para CNPJ válido ou falso para inválido.
 */
export const validCNPJ = (cnpj: string | undefined) => {
    if (cnpj === undefined)
        return false;
    
    cnpj = cnpj.replace(/[^\d]+/g,'');
    if(cnpj == '') return false;
     
    if (cnpj.length != 14)
        return false;
 
    // Elimina CNPJs invalidos conhecidos
    if (cnpj == "00000000000000" || 
        cnpj == "11111111111111" || 
        cnpj == "22222222222222" || 
        cnpj == "33333333333333" || 
        cnpj == "44444444444444" || 
        cnpj == "55555555555555" || 
        cnpj == "66666666666666" || 
        cnpj == "77777777777777" || 
        cnpj == "88888888888888" || 
        cnpj == "99999999999999")
        return false;
         
    // Valida DVs
    let tamanho, numeros, digitos, resultado, soma, pos, i;
    tamanho = cnpj.length - 2
    numeros = cnpj.substring(0, tamanho);
    digitos = cnpj.substring(tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
      soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
      if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != parseInt(digitos.charAt(0)))
        return false;
         
    tamanho = tamanho + 1;
    numeros = cnpj.substring(0,tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
      soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
      if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != parseInt(digitos.charAt(1)))
          return false;
           
    return true;
}

/**
 * @desc Valida um número de telefone verificando o número de caracteres.
 * @param phoneNumber número de telefone a ser validado.
 * @returns valor booleano, verdadeiro para telefone válido ou falso para inválido.
 */
export const validPhoneNumber = (phoneNumber: string | undefined) => {
    if (phoneNumber === undefined)
        return false;
    
    phoneNumber = phoneNumber.replace(/[^\d]+/g,'');
    return phoneNumber.length == 10 || phoneNumber.length == 11;
}

/**
 * @desc Valida um endereço de e-mail comparando-o com um valor regex.
 * @param email e-mail a ser validado.
 * @returns valor booleano, verdadeiro para email válido ou falso para inválido.
 */
export const validEmail = (email: string) => {
    if (email === undefined)
        return false;
        
    const emailRegex = new RegExp('[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+');
    return emailRegex.test(email);
}

/*
Fonte dos códigos regex utilizados: https://github.com/osintbrazuca/osint-brazuca-regex
Algoritmo de validação do CNPJ: https://www.geradorcnpj.com/algoritmo_do_cnpj.htm
*/