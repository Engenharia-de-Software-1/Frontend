/**
 * @desc Valida um CPF aplicando o algoritmo de validação.
 * @param cpf CPF a ser validado.
 * @returns valor booleano, verdadeiro para CPF válido ou falso para inválido.
 */
export const validCPF = (cpf: string) => {	
    cpf = cpf.replace(/[^\d]+/g,'');	
    if(cpf == '') return false;	
  
    if (cpf.length != 11 || 
        cpf == "00000000000" || 
        cpf == "11111111111" || 
        cpf == "22222222222" || 
        cpf == "33333333333" || 
        cpf == "44444444444" || 
        cpf == "55555555555" || 
        cpf == "66666666666" || 
        cpf == "77777777777" || 
        cpf == "88888888888" || 
        cpf == "99999999999")
            return false;
  
    // Validação do primeiro dígito
    let add = 0, rev, i;
    for (i=0; i < 9; i ++)		
        add += parseInt(cpf.charAt(i)) * (10 - i);	
        rev = 11 - (add % 11);	
        if (rev == 10 || rev == 11)		
            rev = 0;	
        if (rev != parseInt(cpf.charAt(9)))		
            return false;	
  
    // Validação do segundo dígito
    add = 0;	
    for (i = 0; i < 10; i ++)		
        add += parseInt(cpf.charAt(i)) * (11 - i);	
    rev = 11 - (add % 11);	
    if (rev == 10 || rev == 11)	
        rev = 0;	
    if (rev != parseInt(cpf.charAt(10)))
        return false;		
    return true;   
  }

/**
 * @desc Valida um CNPJ verificando o número de caracteres.
 * @param cnpj CNPJ a ser validado.
 * @returns valor booleano, verdadeiro para CNPJ válido ou falso para inválido.
 */
export const validCNPJ = (cnpj: string | undefined) => {
    if (cnpj == undefined)
        return false;

    cnpj = cnpj.replace(/[^\d]+/g,'');
    return cnpj.length == 14;
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
Algoritmo de validação do CPF: https://www.geradorcpf.com/algoritmo_do_cpf.htm
*/