import 'remixicon/fonts/remixicon.css';
import React, { useState } from 'react';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Stack } from '../../components/Stack';
import Sidebar from '../../components/Sidebar';
import { divGeneral, textStyle3, textTitle } from './styles';
import router from 'next/router';
import api from '../../services/api';
import { IUser } from '../../models/IUser';

export default function Settings() {  
    //const userId = '1688aa32-6569-44aa-9ea3-e083a98350a1'; 
    const userId = '8ba30cae-67f9-46ab-96a3-216b2d05d3c1'; 
    const userType = 'client'; 
    const [password, setPassword] = useState<string>('');
    const [newPassword, setNewPassword] = useState<string>('');

    async function goChangePassword() {
        if(password !== '' && newPassword !== '') {
            try {
                const output = await api.put<IUser>(`${userType}/`, {
                    password,
                    confirmPassword: newPassword
                });
                if(output.data && output.data.id) {
                    alert('Senha alterada com sucesso!');
                } else {
                    console.log(output);
                    alert('Erro ao alterar senha!');
                }
            } catch (error) {
                alert('Error retornado!');
            }
        } else {
            alert('Preencha todos os campos!');
        }
    }
    
    function goDelete() {
        if (window.confirm("Tem certeza que deseja deletar sua conta?")) {
            try {
                api.delete(`${userType}/`);
                alert('Conta deletada com sucesso!');
                router.push("./cadastro");
            } catch (error) {
                alert('Erro retornado!');
            }
        }
    }

    return ( 
        <Stack bg=' bg-white'>
            <Sidebar/>

            <div className={divGeneral}>
               
                <div>   
                    <h1 className={textTitle}>Configurações</h1>
                    
                    <h1 className={textStyle3}>Mudar senha</h1>

                    <div className=" w-462">                        
                        <Input 
                            haslabel 
                            label='Nova senha' 
                            placeholder='******' 
                            type='password' 
                            top='mt-5'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Input 
                            haslabel 
                            label='Confirmação de senha' 
                            placeholder='******' 
                            type='password' 
                            top='mt-10'
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
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
                            onClick={goChangePassword}
                        >
                            MUDAR SENHA
                        </Button>
                    </div> 

                    <div >   
                        <h1 className={textStyle3}>Área de perigo</h1>
                        
                        <div className='pt-5 pb-10'>
                            <Button 
                                bg='bg-warning' 
                                rounded='rounded' 
                                w='w-full' 
                                h='h-12' 
                                textColor='text-white' 
                                textWeight='font-bold'
                                onClick={goDelete}
                            >
                                DELETAR CONTA
                            </Button>
                        </div> 
                    </div>
                </div>
            </div>  
        </Stack>
    );
}