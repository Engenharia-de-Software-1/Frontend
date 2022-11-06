import 'remixicon/fonts/remixicon.css';
import React, { useCallback, useEffect, useState } from 'react';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Stack } from '../../components/Stack';
import Sidebar from '../../components/Sidebar';
import { divGeneral, textTitle } from './styles';
import api from '../../services/api';
import { IUser } from '../../models/IUser';
import { useRouter } from 'next/router';
import { useMyData } from '../../services/queryClient/useMyData';

export default function ProfileAdmin() {     
    const router = useRouter();
    const { data, refetch } = useMyData();

    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');

    const getUserInfo = useCallback(async () => {
        const response = await api.get<IUser>(`/admin/${router.asPath.split('=')[1]}`);
        setName(response.data.name);
        setEmail(response.data.email);
    }, [router]);

    async function handleEdit() {
        try {
            const output = await api.put<IUser>(`admin/${router.asPath.split('=')[1]}`, {
                name,
                email
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
                <h1 className={textTitle}>Minha conta</h1>

                <div className=" w-462">                        
                    <Input 
                        haslabel 
                        label='Nome'
                        placeholder='Nome completo' 
                        top='mt-5'
                        value={name}
                        onChange={(e) => setName(e.target.value)}                        
                    />
                    <Input 
                        haslabel 
                        label='E-mail' 
                        placeholder='e-mail' 
                        top='mt-10'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} 
                    />
                </div>

                <div className='pt-12 w-462'>
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
        </Stack>
    );
}