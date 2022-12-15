import { Spinner, Table, TableCaption, TableContainer, Tbody, Th, Thead, Tr } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { Button } from '../../../components/Button';
import { Input } from '../../../components/Input';
import { Modal } from '../../../components/Modal';
import { Select } from '../../../components/Select';
import Sidebar from '../../../components/Sidebar';
import { Stack } from '../../../components/Stack';
import CityValues from '../../../contents/city';
import { IUserInvestor } from '../../../models/IUser';
import api from '../../../services/api';
import { useAllUsers } from '../../../services/queryClient/useAllUsers';
import { useMyData } from '../../../services/queryClient/useMyData';
import { useProjects } from '../../../services/queryClient/useProject';
import { validCNPJ, validEmail, validPhoneNumber } from '../../../utils/formsValidation';
import { maskCNPJ, maskTelefone } from '../../../utils/maks';
import { divGeneral, divInput, textStyle2, textStyle3, textTitle } from '../styles';

class IUpdateInvestor {
    name: string = '';
    phone: string = '';
    email: string = '';
    companyName: string = '';
    cnpj: string = '';
    qtdMembers: number = 0;
    profession: string= '';
    state: string = '';
    city: string = '';
}

export default function Investidor() {
    const myData = useMyData();
    const { isLoading, isFetching, data, refetch } = useAllUsers();
    const [isOpen, setIsOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [updateInvestor, setUpdateInvestor] = useState<IUpdateInvestor>(new IUpdateInvestor());
    const [id, setId] = useState('');

    function handleOpenEditModal(user: any) {
        setUpdateInvestor({
            name: user.name,
            phone: user.phone,
            email: user.email,
            companyName: user.investor.companyName,
            profession: user.investor.profession,
            cnpj: user.investor.cnpj,
            qtdMembers: user.investor.qtdMembers,
            state: user.address.state,
            city: user.address.city,
        });
        setId(user.id);
        setIsEditOpen(true);
    }

    const handleChange = (e: any) => {
        if(e.target.name === 'cnpj') {
            setUpdateInvestor({
              ...updateInvestor,
              [e.target.name]: maskCNPJ(e.target.value) //edit
            });
        } else if(e.target.name === 'phone') {
            setUpdateInvestor({
              ...updateInvestor,
              [e.target.name]: maskTelefone(e.target.value) //edit
            });
        } else {
            setUpdateInvestor({
              ...updateInvestor,
              [e.target.name]: e.target.value //edit
            });
        }
    };

    async function editSubmit() {
        if (!validPhoneNumber(updateInvestor.phone))
            return alert('Número de telefone inserido não é válido.');
        if (!validEmail(updateInvestor.email))
            return alert('Endereço de e-mail inserido não é válido.');
        if (!validCNPJ(updateInvestor.cnpj))
            return alert('Número de CNPJ inserido não é válido.');
        if(!window.confirm('Tem certeza que deseja editar este investidor?'))
            return;
        
        try {
            const output = await api.put<IUserInvestor>(`investor/${id}`, updateInvestor);
            console.log(output.data)
            if(output.data && output.data.id) {
                alert('Dados atualizados com sucesso!');
                refetch();
                setIsEditOpen(false);
            } else {
                alert('Erro ao atualizar dados!');
            }
        } catch (error) {
            alert('Erro retornado!');
        }
    }

    return ( 
        <Stack bg='bg-white'>
            <Sidebar data={myData.data}/>

            <div className={divGeneral}>
                <div className="grid grid-cols-1 divide-y divide-greenLine">
                    <div>
                        <div className='flex'>    
                            <div className='flex items-center justify-center'>                 
                                <h1 className={textTitle}>Investidores</h1>   
                                { isLoading || isFetching && (<Spinner size='sm' color='#1A662A' className='ml-5'/>) }
                            </div> 
                        </div>

                        <TableContainer mt="10">
                            <Table variant='simple'>
                                <TableCaption>Investidores AgroI9</TableCaption>

                                <Thead>
                                    <Tr>
                                        <Th>Grupo de investimento</Th>
                                        <Th>Representante</Th>
                                        <Th isNumeric>Número de membros</Th>
                                        <Th>Plano</Th>
                                        <Th>Ações</Th>
                                    </Tr>
                                </Thead>

                                { isLoading || isFetching ? (null) : (
                                    <Tbody>
                                        {data?.filter(el => el.investor).map((user) => (
                                            <Tr key={user.id}>
                                                <Th>{parseInt(user.investor.qtdMembers) === 1 ? 'Pessoa física' : user.investor.companyName}</Th>
                                                <Th>{user.name}</Th>
                                                <Th isNumeric>{user.investor.qtdMembers}</Th>
                                                <Th>{user.planName === 'default' ? 'Nenhum' : user.planName}</Th>
                                                <Th>
                                                <div className='flex'>
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
            <Modal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} title='Editar startup' size='5xl' footer={
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
                            value={updateInvestor.name}
                        />
                        <Input 
                            haslabel 
                            label='Telefone celular' 
                            placeholder='(00) 0 0000-0000' 
                            top='mt-2'
                            name='phone'
                            onChange={(e) => handleChange(e)}
                            value={updateInvestor.phone}
                        />
                    </div>

                    <Input 
                        haslabel 
                        label='E-mail' 
                        placeholder='e-mail' 
                        top='mt-5'
                        name='email'
                        onChange={(e) => handleChange(e)}
                        value={updateInvestor.email}
                    />
 
                    <h1 className={textStyle3}>Dados do investidor</h1>

                    <div className={divInput}>                        
                        <Input 
                            haslabel 
                            label='Nome da startup ou equipe' 
                            placeholder='nome' 
                            top='mt-5'
                            name='companyName'
                            onChange={(e) => handleChange(e)}
                            value={updateInvestor.companyName}
                        />
                        <Input 
                            haslabel 
                            label='CNPJ' 
                            placeholder='00.000.000/0000-00' 
                            top='mt-5'
                            name='cnpj'
                            onChange={(e) => handleChange(e)}
                            value={updateInvestor.cnpj}
                        />
                    </div>

                    <div className={divInput}>                        
                        <Input 
                            haslabel 
                            label='Quantidade de membros/sócios' 
                            placeholder='0'
                            type='number' 
                            min='0' 
                            top='mt-5'
                            name='qtdMembers'
                            onChange={(e) => handleChange(e)}
                            value={updateInvestor.qtdMembers}
                        />
                        <Input 
                            haslabel 
                            label='Formação em quais áreas (membros/sócios)' 
                            placeholder='formações' 
                            top='mt-5'
                            name='profession'
                            onChange={(e) => handleChange(e)}
                            value={updateInvestor.profession}
                        />
                    </div>

                    <h1 className={textStyle3}>Endereço</h1>
                    <div className='flex space-x-10 pb-5'>
                        <Select name="state" onChange={(e) => handleChange(e)} value = {updateInvestor.state} 
                            haslabel label='Estado' top='mt-5'
                            >
                            <option key = 'init'>Selecione o Estado</option>
                            {CityValues.estados.map((uf, index) => (
                                <option key ={index.toString()} value = {uf.sigla}>{uf.nome}</option>
                            ))}
                        </Select>
                        <Select name="city" onChange={(e) => handleChange(e)} value = {updateInvestor.city} 
                            haslabel label='Cidade' top='mt-5'
                            >
                            <option key = 'init'>Selecione a cidade</option>
                            {CityValues.estados.find((city) => city.sigla == updateInvestor.state)?.cidades.map((cities, index) => (
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