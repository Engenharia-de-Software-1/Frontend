import router from 'next/router';
import React, { useCallback, useState } from 'react';
import CityValues from '../../contents/city';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Select } from '../../components/Select';
import { Stack } from '../../components/Stack';
import { divGeneral, textTitle } from './styles';
import { useRouter } from 'next/router';
import api from '../../services/api';
import { maskCNPJ, maskTelefone } from '../../utils/maks';
import { validCNPJ, validPhoneNumber } from '../../utils/formsValidation';

class ICadastroInvestidor {
    phone: string = '';
    qtdMembers?: number= 1;
    companyName?: string= '';
    cnpj: string= '';
    profession?: string= '';
    city?: string= '';
    state?: string= '';
}

export default function Registration() {    
    const router = useRouter();

    const [cadastro, setCadastro] = useState<ICadastroInvestidor>(new ICadastroInvestidor());
    const handleChange = (e: any) => {
        if(e.target.name === 'cnpj') {
            setCadastro({
              ...cadastro,
              [e.target.name]: maskCNPJ(e.target.value) //edit
            });
        } else if(e.target.name === 'phone') {
            setCadastro({
              ...cadastro,
              [e.target.name]: maskTelefone(e.target.value) //edit
            });
        } else {
            setCadastro({
              ...cadastro,
              [e.target.name]: e.target.value //edit
            });
        }
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (!validPhoneNumber(cadastro.phone.replace(/\D/g, '')))
            return alert('Número de telefone inserido não é válido.');
        if (!validCNPJ(cadastro.cnpj.replace(/\D/g, '')))
            return alert('Número de CNPJ inserido não é válido.');

        try {
            await api.put(`/investor`, {
                ...cadastro,
                cnpj: cadastro.cnpj.replace(/\D/g, ''),
                phone: cadastro.phone.replace(/\D/g, ''),
            });
            router.push('/minhaContaInvestidor');
        } catch (error) {
            console.error(error);
        }
    }

    const goBack = () => {
        router.push('/cadastro')
    }
    
    return ( 
        <Stack bg='bg-white'>
            <div className="h-screen w-3/5 bg-agro bg-cover bg-center"/>

            <div className={divGeneral}>
                <div>
                    <div className="w-36 h-8 bg-no-repeat bg-agroLogo "/>

                    <h1 className={textTitle}>Cadastro investidor</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="w-462 mt-5">
                            <Input haslabel value={cadastro.companyName} onChange={(e) => handleChange(e)} name='companyName' label='Nome da startup ou equipe' placeholder='Ex: José da Silva'/>
                            <Input haslabel value={cadastro.phone} maxLength={16} onChange={(e) => handleChange(e)} name='phone' label='Telefone celular' placeholder='(00) 0 0000-0000' top='mt-10'/>
                            <Input haslabel value={cadastro.cnpj} maxLength={18} onChange={(e) => handleChange(e)} name='cnpj' label='CNPJ' placeholder='00000000000000' top='mt-10'/>
                            <Input haslabel value={cadastro.qtdMembers} onChange={(e) => handleChange(e)} name='qtdMembers' label='Quantidade de membros/sócios' placeholder='1' type='number' min='1' top='mt-10'/>                
                            <Input haslabel value={cadastro.profession} onChange={(e) => handleChange(e)} name='profession' label='Formação em  quais áreas (membros/sócios)' placeholder='formações' top='mt-10'/>

                            <div className='flex space-x-10'>
                                <Select name='state' onChange={(e) => handleChange(e)} value={cadastro.state} 
                                    haslabel label='Estado' top='mt-10'
                                    >
                                    <option key = 'init'>Selecione o Estado</option>
                                    {CityValues.estados.map((uf, index) => (
                                        <option key ={index.toString()} value = {uf.sigla}>{uf.nome}</option>
                                    ))}
                                </Select>
                                <Select name='city' onChange={(e) => handleChange(e)} value={cadastro.city} 
                                    haslabel label='Cidade' top='mt-10'
                                    >
                                    <option key = 'init'>Selecione a cidade</option>
                                    {CityValues.estados.find((city) => city.sigla == cadastro.state)?.cidades.map((cities, index) => (
                                        <option key ={index.toString()}  value = {cities}>{cities} </option>
                                    ))}
                                </Select>
                            </div>
                        </div>

                        <div className='pt-12 flex space-x-10'>
                            {/* <Button 
                                bg='bg-green65' 
                                rounded='rounded' 
                                w='w-full' 
                                h='h-12' 
                                textColor='text-white' 
                                textWeight='font-bold'
                                onClick={goBack}
                                >
                                VOLTAR
                            </Button> */} 
                            <Button 
                                bg='bg-greenDark' 
                                rounded='rounded' 
                                w='w-full' 
                                h='h-12' 
                                textColor='text-white' 
                                textWeight='font-bold'
                                formAction='submit'
                                >
                                FINALIZAR
                            </Button>         
                        </div>
                    </form>
                </div>
            </div>  
        </Stack>
    );
}