import { Spinner, Table, TableCaption, TableContainer, Tbody, Th, Thead, Tr } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { Modal } from '../../../components/Modal';
import Sidebar from '../../../components/Sidebar';
import { Stack } from '../../../components/Stack';
import { useAllUsers } from '../../../services/queryClient/useAllUsers';
import { useIdeas } from '../../../services/queryClient/useIdea';
import { useMyData } from '../../../services/queryClient/useMyData';
import { divGeneral, divInput, textStyle2, textStyle3, textTitle } from '../styles';
import { Button } from '../../../components/Button';
import { Input } from '../../../components/Input';
import { Select } from '../../../components/Select';
import CityValues from '../../../contents/city';
import { validCNPJ, validEmail, validPhoneNumber } from '../../../utils/formsValidation';
import { IUserClient } from '../../../models/IUser';
import api from '../../../services/api';
import { maskCNPJ, maskTelefone } from '../../../utils/maks';

class IUpdateClient {
    name: string = '';
    phone: string = '';
    email: string = '';
    companyName: string = '';
    cnpj: string = '';
    profession: string = '';
    state: string = '';
    city: string = '';
}

export default function Cliente() { 
    const router = useRouter(); 
    const [id, setId] = useState('');
    const myData = useMyData();
    const { isLoading, isFetching, data, refetch: refetchUsers } = useAllUsers();
    const { data: ideas, isLoading: ideasLoading, isFetching: ideasFetching, refetch } = useIdeas();
    const [isOpen, setIsOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [updateClient, setUpdateClient] = useState<IUpdateClient>(new IUpdateClient());

    const handleChange = (e: any) => {
        if(e.target.name === 'cnpj') {
            setUpdateClient({
              ...updateClient,
              [e.target.name]: maskCNPJ(e.target.value) //edit
            });
        } else if(e.target.name === 'phone') {
            setUpdateClient({
              ...updateClient,
              [e.target.name]: maskTelefone(e.target.value) //edit
            });
        } else {
            setUpdateClient({
              ...updateClient,
              [e.target.name]: e.target.value //edit
            });
        }
    };

    function handleOpenModal(id: string) {
        setId(id);
        setIsOpen(true);
    }

    function handleOpenEditModal(user: any) {
        setUpdateClient({
            name: user.name,
            phone: user.phone,
            email: user.email,
            companyName: user.client.companyName,
            cnpj: user.client.cnpj,
            profession: user.client.profession,
            state: user.address.state,
            city: user.address.city,
        });
        console.log(user);
        setId(user.id);
        setIsEditOpen(true);
    }

    async function editSubmit() {
        if (!validPhoneNumber(updateClient.phone))
            return alert('Número de telefone inserido não é válido.');
        if (!validEmail(updateClient.email))
            return alert('Endereço de e-mail inserido não é válido.');
        if (!validCNPJ(updateClient.cnpj))
            return alert('Número de CNPJ inserido não é válido.');
        if(!window.confirm('Tem certeza que deseja editar este produtor rural?'))
            return;

        try {
            const output = await api.put<IUserClient>(`client/${id}`, updateClient);
            if(output.data && output.data.id) {
                alert('Dados atualizados com sucesso!');
                refetchUsers();
                setIsEditOpen(false);
            } else {
                alert('Erro ao atualizar dados!');
            }
        } catch (error) {
            alert('Erro retornado!');
        }
    }

    function goToIdea(id: string) {
        router.push(`/ideias/dados/${id}`);
    }

    return ( 
        <Stack bg='bg-white'>
            <Sidebar data={myData.data}/>

            <div className={divGeneral}>
                <div className="grid grid-cols-1 divide-y divide-greenLine">
                    <div>
                        <div className='flex'>    
                            <div className='flex items-center justify-center'>                 
                                <h1 className={textTitle}>Produtores Rurais</h1>   
                                { isLoading || isFetching && (<Spinner size='sm' color='#1A662A' className='ml-5'/>) }
                            </div> 
                        </div>

                        <TableContainer mt="10">
                            <Table variant='simple'>
                                <TableCaption>Produtores Rurais AgroI9</TableCaption>

                                <Thead>
                                    <Tr>
                                        <Th>Nome do produtor</Th>
                                        <Th isNumeric>Número de ideias</Th>
                                        <Th>Plano</Th>
                                        <Th>Ações</Th>
                                    </Tr>
                                </Thead>

                                { isLoading || isFetching ? (null) : (
                                    <Tbody>
                                        {data?.filter(el => el.client).map((user) => (
                                            <Tr key={user.id}>
                                                <Th>{user.name}</Th>
                                                <Th isNumeric>{
                                                    ideasFetching || ideasLoading ? 
                                                        (<Spinner size='sm' color='#1A662A' className='ml-5'/>)
                                                    : ideas?.filter(el => el.userId === user.id).length
                                                }</Th>
                                                <Th>{user.planName === 'default' ? 'Nenhum' : user.planName}</Th>
                                                <Th>
                                                    <div className='flex'>
                                                        <button 
                                                            onClick={() => handleOpenModal(user.id)}
                                                            className='flex mr-2 bg-greenText p-2 px-5 rounded text-white'
                                                        >
                                                            Ver ideias
                                                        </button>
                                                        <button 
                                                            onClick={() => handleOpenEditModal(user)}
                                                            className='flex mr-2 bg-greenText65 p-2 px-5 rounded text-white'
                                                        >
                                                            Editar
                                                        </button>
                                                    </div>
                                                </Th>
                                            </Tr>
                                        ))}
                                    </Tbody>
                                ) }
                            </Table>
                        </TableContainer>
                    </div>    
                </div> 
            </div> 
            <Modal isOpen={isOpen} footer={undefined} onClose={() => setIsOpen(false)} title='Ideias do produtor rural' size='5xl'>
                <button onClick={() => refetch()}>Atualizar</button>
                {ideasLoading || ideasFetching || !id ? (<Spinner/>) : ideas?.filter(el => el.userId === id && (el.situation === 'aproved' || el.situation === 'recused' || el.situation === 'pending')).map((idea) => (
                    <div key={idea.id} className='w-full mt-5'>
                        <div className='flex items-center'>
                            <h1 className='text-lg font-semibold'>{idea.title}</h1>
                            <div className={idea.situation === 'aproved' ? 'flex ml-2 bg-greenLight text-greenText p-1 px-5 rounded-full' : idea.situation === 'recused' ? 'flex ml-2 bg-warning text-white p-1 px-5 rounded-full' : 'flex ml-2 bg-buttonPlans text-white p-1 px-5 rounded-full'}>
                                <h1>{idea.situation === 'aproved' ? 'Aprovado' : idea.situation === 'recused' ? 'Recusado' : 'Pendente' }</h1>
                            </div>
                        </div>
                        <p className='text-md font-regular mb-5'>{idea.description.substring(0, 100)}</p>
                        <div>
                            <button className='flex bg-greenText p-2 px-5 rounded text-white text-sm mb-5' onClick={() => goToIdea(idea.id)}>
                                Ver ideia
                            </button>
                        </div>
                        <div className='w-full h-px bg-[#f2f2f2]'/>
                    </div>
                ))}
            </Modal>
            <Modal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} title='Editar produtor rural' size='5xl' footer={
                    <Button 
                        bg='bg-greenDark' 
                        rounded='rounded' 
                        w='w-full' 
                        h='h-12' 
                        textColor='text-white' 
                        textWeight='font-bold'
                        onClick={editSubmit}
                    >
                        EDITAR
                    </Button>
                }>
                {
                <div className="w-full">   
                    <h1 className={textStyle2}>Dados da conta</h1> 

                    <div className={divInput}>                        
                        <Input 
                            haslabel 
                            label='Nome' 
                            placeholder='nome completo' 
                            top='mt-2'
                            name='name'
                            onChange={(e) => handleChange(e)}
                            value={updateClient.name}
                        />
                        <Input 
                            haslabel 
                            label='Telefone celular' 
                            placeholder='(00) 0 0000-0000' 
                            top='mt-2'
                            name='phone'
                            onChange={(e) => handleChange(e)}
                            value={updateClient.phone}
                        />
                    </div>

                    <Input 
                        haslabel 
                        label='E-mail' 
                        placeholder='e-mail' 
                        top='mt-5'
                        name='email'
                        onChange={(e) => handleChange(e)}
                        value={updateClient.email}
                    />
 
                    <h1 className={textStyle3}>Dados da proprieda rural</h1>

                    <div className={divInput}>                        
                        <Input 
                            haslabel 
                            label='Nome da propriedade rural ou empresa rural' 
                            placeholder='nome' 
                            top='mt-5'
                            name='companyName'
                            onChange={(e) => handleChange(e)}
                            value={updateClient.companyName}
                        />
                    </div>

                    <div className={divInput}>                        
                        <Input 
                            haslabel 
                            label='CNPJ' 
                            placeholder='00.000.000/0000-00' 
                            top='mt-5'
                            name='cnpj'
                            onChange={(e) => handleChange(e)}
                            value={updateClient.cnpj}
                        />
                        <Input 
                            haslabel 
                            label='Formações em quais áreas (membros/sócios)' 
                            placeholder='formações'
                            min='0' 
                            top='mt-5'
                            name='profession'
                            onChange={(e) => handleChange(e)}
                            value={updateClient.profession}
                        />
                    </div>

                    <h1 className={textStyle3}>Endereço</h1>
                    <div className='flex space-x-10 pb-5'>
                        <Select name="state" onChange={(e) => handleChange(e)} value = {updateClient.state} 
                            haslabel label='Estado' top='mt-5'
                            >
                            <option key = 'init'>Selecione o Estado</option>
                            {CityValues.estados.map((uf, index) => (
                                <option key ={index.toString()} value = {uf.sigla}>{uf.nome}</option>
                            ))}
                        </Select>
                        <Select name="city" onChange={(e) => handleChange(e)} value = {updateClient.city} 
                            haslabel label='Cidade' top='mt-5'
                            >
                            <option key = 'init'>Selecione a cidade</option>
                            {CityValues.estados.find((city) => city.sigla == updateClient.state)?.cidades.map((cities, index) => (
                                <option key ={index.toString()}  value = {cities}>{cities} </option>
                            ))}
                        </Select>
                    </div>
                </div>
            }
            </Modal>
        </Stack>
    );
}