/* eslint-disable react-hooks/exhaustive-deps */
import 'remixicon/fonts/remixicon.css';
import React, { useCallback, useEffect, useState } from 'react';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Stack } from '../../components/Stack';
import Sidebar from '../../components/Sidebar';
import { divGeneral, divInput, textStyle3, textTitle } from './styles';
import { Select } from '../../components/Select';
import CityValues from '../../contents/city';
import api from '../../services/api';
import { IUserInvestor } from '../../models/IUser';
import { useRouter } from 'next/router';
import { useMyData } from '../../services/queryClient/useMyData';
import { validCNPJ, validEmail, validPhoneNumber } from '../../utils/formsValidation';

export default function ProfileInvestor() {  
    const { data, refetch } = useMyData();

    const [name, setName] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    
    const [companyName, setCompanyName] = useState<string>('');
    const [cnpj, setCnpj] = useState<string>('');
    const [profession, setProfession] = useState<string>('');
    const [qtdMembers, setQtdMembers] = useState<number>(0);
    
    const [state, setState] = useState<string>('');
    const [city, setCity] = useState<string>('');    
    

    const handleUF = useCallback((state:string) => {
        setState(state)
    }, [])

    const handleCity = useCallback((city:string) => {
        setCity(city)
    }, [])

    const getUserInfo = useCallback(async () => {
        const response = await api.get<IUserInvestor>(`/investor`);
        setName(response.data.name);
        setEmail(response.data.email);
        setPhone(response.data.phone);
        setCompanyName(response.data.investor.companyName);
        setProfession(response.data.investor.profession);
        setCnpj(response.data.investor.cnpj);
        setQtdMembers(response.data.investor.qtdMembers);
        setState(response.data.address.state);
        setCity(response.data.address.city);
        refetch();
    }, []);

    async function handleEdit() {
        if (!validPhoneNumber(phone))
            return alert('Número de telefone inserido não é válido.');
        if (!validEmail(email))
            return alert('Endereço de e-mail inserido não é válido.');
        if (!validCNPJ(cnpj))
            return alert('Número de CNPJ inserido não é válido.');

        try {
            const output = await api.put<IUserInvestor>(`investor`, {
                name,
                email,
                phone,
                companyName,
                profession,
                state,
                city,
                cnpj,
                qtdMembers
            });
            if(output.data && output.data.id) {
                alert('Dados atualizados com sucesso!');
                refetch();
            } else {
                alert('Erro ao atualizar dados!');
            }
        } catch (error) {
            alert('Erro retornado!');
        }
    }

    useEffect(() => {
        getUserInfo();
    }, [getUserInfo]);

    return ( 
        <Stack bg='bg-white'>
            <Sidebar data={data}/>

            <div className={divGeneral}>
               
                <div className="w-full">   
                    <h1 className={textTitle}>Minha conta</h1> 

                    <div className={divInput}>                        
                        <Input 
                            haslabel 
                            label='Nome' 
                            placeholder='nome completo' 
                            top='mt-5'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <Input 
                            haslabel 
                            label='Telefone celular' 
                            placeholder='(00) 0 0000-0000)' 
                            top='mt-5'
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>
                        <Input 
                            haslabel 
                            label='E-mail' 
                            placeholder='e-mail' 
                            top='mt-10'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                    <div className='pt-12'>
                        <Button 
                            bg='bg-greenDark' 
                            rounded='rounded' 
                            w='w-full' 
                            h='h-12' 
                            textColor='text-white' 
                            textWeight='font-bold'
                            onClick={handleEdit}
                        >
                            EDITAR
                        </Button>
                    </div> 

                    <h1 className={textStyle3}>Dados do investidor</h1>
                    
                    <div className={divInput}>
                        <Input 
                            haslabel 
                            label='Nome da startup ou equipe' 
                            placeholder='nome' 
                            top='mt-5'
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                        />
                        <Input 
                            haslabel 
                            label='CNPJ' 
                            placeholder='00000000000000' 
                            top='mt-5'
                            value={cnpj}
                            onChange={(e) => setCnpj(e.target.value)}
                        />                            
                    </div>

                    <div className={divInput}>
                        <Input 
                            haslabel 
                            label='Quantidade de membros/sócios' 
                            placeholder='0' 
                            type="number" 
                            min='0' 
                            top='mt-10'
                            value={qtdMembers}
                            onChange={(e) => setQtdMembers(parseInt(e.target.value))}
                       />
                        <Input 
                            haslabel 
                            label='Formação em quais áreas (membros/sócios)' 
                            placeholder='formações' 
                            top='mt-10'
                            value={profession}
                            onChange={(e) => setProfession(e.target.value)}
                        />                            
                    </div>
                    
                    <div className='pt-12'>
                        <Button 
                            bg='bg-greenDark' 
                            rounded='rounded' 
                            w='w-full' 
                            h='h-12' 
                            textColor='text-white' 
                            textWeight='font-bold'
                            onClick={handleEdit}
                            >
                            EDITAR
                        </Button>
                    </div> 

                    <h1 className={textStyle3}>Endereço</h1>

                    <div className='flex space-x-10'>
                        <Select onChange = {(e) => handleUF(e.target.value)} value = {state} 
                            haslabel label='Estado' top='mt-5'
                            >
                            <option key = 'init'>Selecione o Estado</option>
                            {CityValues.estados.map((uf, index) => (
                                <option key ={index.toString()} value = {uf.sigla}>{uf.nome}</option>
                            ))}
                        </Select>
                        <Select onChange = {(e) => handleCity(e.target.value)} value = {city} 
                            haslabel label='Cidade' top='mt-5'
                            >
                            <option key = 'init'>Selecione a cidade</option>
                            {CityValues.estados.find((city) => city.sigla == state)?.cidades.map((cities, index) => (
                                <option key ={index.toString()}  value = {cities}>{cities} </option>
                            ))}
                        </Select>
                    </div>
                    
                    <div className='pt-12'>
                        <Button 
                            bg='bg-greenDark' 
                            rounded='rounded' 
                            w='w-full' 
                            h='h-12' 
                            textColor='text-white' 
                            textWeight='font-bold'
                            onClick={handleEdit}
                        >
                            EDITAR 
                        </Button>
                    </div> 
                </div>
            </div>  
        </Stack>
    );
}