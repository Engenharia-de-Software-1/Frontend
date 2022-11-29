/* eslint-disable react-hooks/exhaustive-deps */
import 'remixicon/fonts/remixicon.css';
import React, { useCallback, useEffect, useState } from 'react';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Stack } from '../../components/Stack';
import Sidebar from '../../components/Sidebar';
import { divGeneral, divInput, textStyle3, textTitle } from '../../styles/minhaContaStartup.styles';
import { Select } from '../../components/Select';
import CityValues from '../../contents/city';
import api from '../../services/api';
import { IUserStartup } from '../../models/IUser';
import { useMyData } from '../../services/queryClient/useMyData';

export default function ProfileStartup() {    
    const { data, refetch } = useMyData();

    const [name, setName] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    
    const [startupName, setStartupName] = useState<string>('');
    const [cnpj, setCnpj] = useState<string>('');
    const [employees, setEmployees] = useState<number>(0);
    
    const [state, setState] = useState<string>('');
    const [city, setCity] = useState<string>('');  

    const handleUF = useCallback((state:string) => {
        setState(state)
    }, [])

    const handleCity = useCallback((city:string) => {
        setCity(city)
    }, [])
    
    const getUserInfo = useCallback(async () => {
        const response = await api.get<IUserStartup>(`/startup`);
        setName(response.data.name);
        setEmail(response.data.email);
        setPhone(response.data.phone);
        setStartupName(response.data.startup.startupName);
        setCnpj(response.data.startup.cnpj);
        setEmployees(response.data.startup.employees);
        setState(response.data.address.state);
        setCity(response.data.address.city);
        refetch();
    }, []);

    async function handleEdit() {
        try {
            const output = await api.put<IUserStartup>(`startup`, {
                name,
                email,
                phone,
                startupName,
                state,
                city,
                cnpj,
                employees
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
                            top='mt-2'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <Input 
                            haslabel 
                            label='Telefone celular' 
                            placeholder='(00) 0 0000-0000' 
                            top='mt-2'
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
  
                    <h1 className={textStyle3}>Dados da startup</h1>

                    <div className={divInput}>                        
                        <Input 
                            haslabel 
                            label='Nome da startup' 
                            placeholder='nome completo' 
                            top='mt-5'
                            value={startupName}
                            onChange={(e) => setStartupName(e.target.value)}
                        />
                    </div>

                    <div className={divInput}>                        
                        <Input 
                            haslabel 
                            label='CNPJ' 
                            placeholder='00000000000000' 
                            top='mt-10'
                            value={cnpj}
                            onChange={(e) => setCnpj(e.target.value)}
                        />
                        <Input 
                            haslabel 
                            label='Quantidade de pessoas na startup' 
                            placeholder='0' 
                            type='number' 
                            min='0' 
                            top='mt-10'
                            value={employees}
                            onChange={(e) => setEmployees(parseInt(e.target.value))}
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
                            EDITAR ENDEREÇO
                        </Button>
                    </div> 
                </div>
            </div>  
        </Stack>
    );
}