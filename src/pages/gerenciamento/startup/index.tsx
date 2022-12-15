import { Spinner, Table, TableCaption, TableContainer, Tbody, Th, Thead, Tr } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useCallback, useState } from 'react';
import { Button } from '../../../components/Button';
import { Input } from '../../../components/Input';
import { Modal } from '../../../components/Modal';
import { Select } from '../../../components/Select';
import Sidebar from '../../../components/Sidebar';
import { Stack } from '../../../components/Stack';
import CityValues from '../../../contents/city';
import { IUserStartup } from '../../../models/IUser';
import api from '../../../services/api';
import { useAllUsers } from '../../../services/queryClient/useAllUsers';
import { useMyData } from '../../../services/queryClient/useMyData';
import { useProjects } from '../../../services/queryClient/useProject';
import { validCNPJ, validEmail, validPhoneNumber } from '../../../utils/formsValidation';
import { maskCNPJ, maskTelefone } from '../../../utils/maks';
import { divGeneral, divInput, textStyle2, textStyle3, textTitle } from '../styles';

class IUpdateStartup {
    name: string = '';
    phone: string = '';
    email: string = '';
    startupName: string = '';
    cnpj: string = '';
    employees: number = 0;
    state: string = '';
    city: string = '';
}

export default function Startup() { 
    const router = useRouter(); 
    const [id, setId] = useState('');
    const myData = useMyData();
    const { isLoading, isFetching, data, refetch } = useAllUsers();
    const { data: project, isLoading: projectLoading, isFetching: projectFetching } = useProjects();
    const [isOpen, setIsOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [updateStartup, setUpdateStartup] = useState<IUpdateStartup>(new IUpdateStartup());


    const handleChange = (e: any) => {
        if(e.target.name === 'cnpj') {
            setUpdateStartup({
              ...updateStartup,
              [e.target.name]: maskCNPJ(e.target.value) //edit
            });
        } else if(e.target.name === 'phone') {
            setUpdateStartup({
              ...updateStartup,
              [e.target.name]: maskTelefone(e.target.value) //edit
            });
        } else {
            setUpdateStartup({
              ...updateStartup,
              [e.target.name]: e.target.value //edit
            });
        }
    };

    function handleOpenModal(id: string) {
        setId(id);
        setIsOpen(true);
    }

    function handleOpenEditModal(user: any) {
        setUpdateStartup({
            name: user.name,
            phone: user.phone,
            email: user.email,
            startupName: user.startup.startupName,
            cnpj: user.startup.cnpj,
            employees: user.startup.employees,
            state: user.address.state,
            city: user.address.city,
        });
        setId(user.id);
        setIsEditOpen(true);
    }

    async function editSubmit() {
        if (!validPhoneNumber(updateStartup.phone))
            return alert('Número de telefone inserido não é válido.');
        if (!validEmail(updateStartup.email))
            return alert('Endereço de e-mail inserido não é válido.');
        if (!validCNPJ(updateStartup.cnpj))
            return alert('Número de CNPJ inserido não é válido.');

        try {
            const output = await api.put<IUserStartup>(`startup/${id}`, updateStartup);
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

    function goToProject(id: string) {
        router.push(`/projeto/${id}`);
    }

    
    return ( 
        <Stack bg='bg-white'>
            <Sidebar data={myData.data}/>

            <div className={divGeneral}>
                <div className="grid grid-cols-1 divide-y divide-greenLine">
                    <div>
                        <div className='flex'>    
                            <div className='flex items-center justify-center'>                 
                                <h1 className={textTitle}>Startups</h1>   
                                { isLoading || isFetching && (<Spinner size='sm' color='#1A662A' className='ml-5'/>) }
                            </div> 
                        </div>

                        <TableContainer mt="10">
                            <Table variant='simple'>
                                <TableCaption>Startups AgroI9</TableCaption>

                                <Thead>
                                    <Tr>
                                        <Th>Nome da startup</Th>
                                        <Th>Representante</Th>
                                        <Th isNumeric>Número de projetos</Th>
                                        <Th>Plano</Th>
                                        <Th>Ações</Th>
                                    </Tr>
                                </Thead>

                                { isLoading || isFetching ? (null) : (
                                    <Tbody>
                                        {data?.filter(el => el.startup).map((user) => (
                                            <Tr key={user.id}>
                                                <Th>{user.startup.startupName}</Th>
                                                <Th>{user.name}</Th>
                                                <Th isNumeric>{
                                                    projectFetching || projectLoading ? 
                                                        (<Spinner size='sm' color='#1A662A' className='ml-5'/>)
                                                    : project?.filter(el => el.userId === user.id).length
                                                }</Th>
                                                <Th>{user.planName === 'default' ? 'Nenhum' : user.planName}</Th>
                                                <Th>
                                                    <div className='flex'>
                                                        <button 
                                                            onClick={() => handleOpenModal(user.id)}
                                                            className='flex mr-2 bg-greenText p-2 px-5 rounded text-white'
                                                        >
                                                            Ver projetos
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
            <Modal isOpen={isOpen} footer={undefined} onClose={() => setIsOpen(false)} title='Projetos da startup' size='5xl'>
                {projectLoading || projectFetching || !id ? (<Spinner/>) : project?.filter(el => el.userId === id && (el.situation === 'aproved' || el.situation === 'recused')).map((project) => (
                    <div key={project.id} className='w-full mt-5'>
                        <div className='flex items-center'>
                            <h1 className='text-lg font-semibold'>{project.title}</h1>
                            <div className={project.situation === 'aproved' ? 'flex ml-2 bg-greenLight text-greenText p-1 px-5 rounded-full' : ''}>
                                <h1>{project.situation === 'aproved' ? 'Aprovado' : 'Recusado' }</h1>
                            </div>
                        </div>
                        <p className='text-md font-regular mb-5'>{project.solution.substring(0, 100)}</p>
                        <div>
                            <button className='flex bg-greenText p-2 px-5 rounded text-white text-sm mb-5' onClick={() => goToProject(project.id)}>
                                Ver projeto
                            </button>
                        </div>
                        <div className='w-full h-px bg-[#f2f2f2]'/>
                    </div>
                ))}
            </Modal>
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
                            value={updateStartup.name}
                        />
                        <Input 
                            haslabel 
                            label='Telefone celular' 
                            placeholder='(00) 0 0000-0000' 
                            top='mt-2'
                            name='phone'
                            onChange={(e) => handleChange(e)}
                            value={updateStartup.phone}
                        />
                    </div>

                    <Input 
                        haslabel 
                        label='E-mail' 
                        placeholder='e-mail' 
                        top='mt-10'
                        name='email'
                        onChange={(e) => handleChange(e)}
                        value={updateStartup.email}
                    />
 
                    <h1 className={textStyle3}>Dados da startup</h1>

                    <div className={divInput}>                        
                        <Input 
                            haslabel 
                            label='Nome da startup' 
                            placeholder='nome completo' 
                            top='mt-5'
                            name='startupName'
                            onChange={(e) => handleChange(e)}
                            value={updateStartup.startupName}
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
                            value={updateStartup.cnpj}
                        />
                        <Input 
                            haslabel 
                            label='Quantidade de pessoas na startup' 
                            placeholder='0'
                            type='number' 
                            min='0' 
                            top='mt-5'
                            name='employees'
                            onChange={(e) => handleChange(e)}
                            value={updateStartup.employees}
                        />
                    </div>

                    <h1 className={textStyle3}>Endereço</h1>
                    <div className='flex space-x-10 pb-5'>
                        <Select name="state" onChange={(e) => handleChange(e)} value = {updateStartup.state} 
                            haslabel label='Estado' top='mt-5'
                            >
                            <option key = 'init'>Selecione o Estado</option>
                            {CityValues.estados.map((uf, index) => (
                                <option key ={index.toString()} value = {uf.sigla}>{uf.nome}</option>
                            ))}
                        </Select>
                        <Select name="city" onChange={(e) => handleChange(e)} value = {updateStartup.city} 
                            haslabel label='Cidade' top='mt-5'
                            >
                            <option key = 'init'>Selecione a cidade</option>
                            {CityValues.estados.find((city) => city.sigla == updateStartup.state)?.cidades.map((cities, index) => (
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