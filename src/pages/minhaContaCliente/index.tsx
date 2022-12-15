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
import { IUserClient } from '../../models/IUser';
import { useMyData } from '../../services/queryClient/useMyData';
import { maskTelefone } from '../../utils/maks';

export default function ProfileClient() {  
    const { data, refetch } = useMyData();

    const [name, setName] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    
    const [companyName, setCompanyName] = useState<string>('');
    const [profession, setProfession] = useState<string>('');
    
    const [state, setState] = useState<string>('');
    const [city, setCity] = useState<string>('');   
    
    const handleUF = useCallback((state:string) => {
        setState(state)
    }, [])

    const handleCity = useCallback((city:string) => {
        setCity(city)
    }, [])

    const getUserInfo = useCallback(async () => {
        try {
            const resp = await api.get<IUserClient>(`/client`);
            setName(resp.data.name);
            setEmail(resp.data.email);
            setPhone(maskTelefone(resp.data.phone));
            setCompanyName(resp.data.client.companyName);
            setProfession(resp.data.client.profession);
            setState(resp.data.address.state);
            setCity(resp.data.address.city);   
            refetch();
        } catch (error) {
            
        }
    }, []);

    async function handleEdit() {
        try {
            const output = await api.put<IUserClient>(`client`, {
                name,
                email,
                phone: phone.replace(/\D/g, ''),
                companyName,
                profession,
                state,
                city
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
    }, []);

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
                            maxLength={16}
                            value={phone}
                            onChange={(e) => setPhone(maskTelefone(e.target.value))}
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

                    <h1 className={textStyle3}>Dados do produtor rural</h1>
                    
                    <div className={divInput}>                        
                        <Input 
                            haslabel 
                            label='Nome da propriedade rural ou empresa rural' 
                            placeholder='nome' 
                            top='mt-5'
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                       
                        />
                        <Input 
                            haslabel 
                            label='Formações em quais áreas (membros/sócios)' 
                            placeholder='formações' 
                            top='mt-5'
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
                        <Select 
                            onChange={(e) => handleUF(e.target.value)} 
                            value={state} 
                            haslabel 
                            label='Estado' 
                            top='mt-5'
                        >
                            <option key = 'init'>Selecione o Estado</option>
                            {CityValues.estados.map((uf, index) => (
                                <option key={index.toString()} value={uf.sigla}>{uf.nome}</option>
                            ))}
                        </Select>
                        <Select 
                            onChange = {(e) => handleCity(e.target.value)} 
                            value={city} 
                            haslabel 
                            label='Cidade' 
                            top='mt-5'
                        >
                            <option key = 'init'>Selecione a cidade</option>
                            {CityValues.estados.find((city) => city.sigla == state)?.cidades.map((cities, index) => (
                                <option key ={index.toString()} value={cities}>{cities} </option>
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