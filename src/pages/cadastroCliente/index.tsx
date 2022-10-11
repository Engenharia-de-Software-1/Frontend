import router from 'next/router';
import React, { useCallback, useState } from 'react';
import CityValues from '../../contents/city';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Select } from '../../components/Select';
import { Stack } from '../../components/Stack';
import { divGeneral, textTitle } from './styles';

export default function Registration() {    
    const [state, setState] = useState();
    const [city, setCity] = useState();
   

    const handleUF = useCallback((estado: React.SetStateAction<undefined>) => {
        setState(estado)
    }, [state])

    const handleCity = useCallback((city: React.SetStateAction<undefined>) => {
        setCity(city)
    }, [city])
    
    function goBack() {
        router.push('/cadastro') 
    }   
    
    return ( 
        <Stack bg='bg-white'>
            <div className="h-screen w-3/5 bg-agro bg-cover bg-center"/>

            <div className={divGeneral}>
                <div>
                
                    <div className="w-36 h-8 bg-no-repeat bg-agroLogo "/>

                    <h1 className={textTitle}>Cadastro cliente</h1>

                    <div className="w-462 mt-5">
                        <Input haslabel label='Nome da propriedade rural ou empresa rural' placeholder='Ex: José da Silva'/>
                        <Input haslabel label='Némero de celular' placeholder='(00) 0 0000-0000' top='mt-10'/>
                        <Input haslabel label='CNPJ' placeholder='00000000000000' top='mt-10'/>

                        <div className='flex space-x-10'>
                            <Select onChange = {(e) => handleUF(e.target.value)} value = {state} 
                                haslabel label='Estado' top='mt-10'
                                >
                                <option key = 'init'>Selecione o Estado</option>
                                {CityValues.estados.map((uf, index) => (
                                    <option key ={index.toString()} value = {uf.sigla}>{uf.nome}</option>
                                ))}
                            </Select>
                            <Select onChange = {(e) => handleCity(e.target.value)} value = {city} 
                                haslabel label='Cidade' top='mt-10'
                                >
                                <option key = 'init'>Selecione a cidade</option>
                                {CityValues.estados.find((city) => city.sigla == state)?.cidades.map((cities, index) => (
                                    <option key ={index.toString()}  value = {cities}>{cities} </option>
                                ))}
                            </Select>
                        </div>
                    </div>

                    <div className='pt-12 flex space-x-10'>
                        <Button 
                            bg='bg-green65' 
                            rounded='rounded-lg' 
                            w='w-full' 
                            h='h-12' 
                            textColor='text-white' 
                            textWeight='font-bold'
                            onClick={goBack}
                            >
                            VOLTAR
                        </Button> 
                        <Button 
                            bg='bg-greenDark' 
                            rounded='rounded-lg' 
                            w='w-full' 
                            h='h-12' 
                            textColor='text-white' 
                            textWeight='font-bold'
                            >
                            FINALIZAR
                        </Button> 

                    </div> 
                </div>
            </div>  
        </Stack>
    );
}