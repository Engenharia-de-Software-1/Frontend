import React, { useCallback, useEffect, useState } from 'react';
import router from 'next/router';
import { Stack } from '../../components/Stack';
import Sidebar from '../../components/Sidebar';
import { divGeneral, textStyle, textTitle } from './styles';
import api from '../../services/api';
import { IProject } from '../../models/IProject';
import { ButtonProject } from '../../components/ButtonProject';
import { Button } from '../../components/Button';
import { Modal } from '../../components/Modal';
import { Input } from '../../components/Input';
import { TextArea } from '../../components/TextArea';
import { useMyData } from '../../services/queryClient/useMyData';

export default function ProfileAdmin() {    
    const [project, setProject] = useState<IProject[]>([] as IProject[]); 
    const [buttonEditProject, setButtonEditProject] = useState(false);
    const [nameProject, setNameProject] = useState<string>('');
    const [solutionProject, setSolutionProject] = useState<string>('');
    const [problemProject, setProblemProject] = useState<string>('');
    const myData = useMyData();
    
    
    /* const [starButton, setStarButton] = useState(false);
    function useButtonStar() {
        setStarButton(!starButton);
    } */
    function useButtonEditProject(){
        setButtonEditProject(true);
    }
    function goBack(){
        router.push('/meusProjetos');
    }
    function getProjects() {
        setTimeout(() => {
            setProject([
        {
            id: '1',
            title: 'Projeto 1',
            solution: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed euismod diam. Praesent cursus erat nec erat ornare varius. Praesent mattis ultrices nulla. Cras eu tortor tempus, tincidunt lorem vel, dignissim dolor. Morbi mollis risus ut mollis placerat. Nam sollicitudin iaculis tristique. Pellentesque at risus non nisl venenatis efficitur id sed magna. Nam a nisl consequat, iaculis dolor ac, consequat libero. Mauris tristique dui eget dapibus hendrerit. Vivamus a volutpat risus, id tincidunt sapien. Fusce nisi tellus, suscipit interdum magna non, interdum tincidunt ex. Aliquam at interdum mauris. Nunc vel nisi sit amet erat pretium mollis sit amet et leo. Cras convallis augue in urna fringilla, ac luctus quam fermentum. Proin mollis erat pellentesque odio tempus, eget convallis sapien dignissim. ',
            problem: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed euismod diam. Praesent cursus erat nec erat ornare varius. Praesent mattis ultrices nulla. Cras eu tortor tempus, tincidunt lorem vel, dignissim dolor. Morbi mollis risus ut mollis placerat. Nam sollicitudin iaculis tristique. Pellentesque at risus non nisl venenatis efficitur id sed magna. Nam a nisl consequat, iaculis dolor ac, consequat libero. Mauris tristique dui eget dapibus hendrerit. Vivamus a volutpat risus, id tincidunt sapien. Fusce nisi tellus, suscipit interdum magna non, interdum tincidunt ex. Aliquam at interdum mauris. Nunc vel nisi sit amet erat pretium mollis sit amet et leo. Cras convallis augue in urna fringilla, ac luctus quam fermentum. Proin mollis erat pellentesque odio tempus, eget convallis sapien dignissim.',
            situation: ''
        }

        ])
        })
    }

    useEffect(() => {
        getProjects();
    }, []);
    
    return ( 
        <Stack bg='bg-white'>
            <Sidebar data={myData.data}/>

            <div className={divGeneral}>
                <div className="grid grid-cols-1 divide-y divide-greenLine">
                    {project.map((project) => (
                        <div>
                            <div className='flex justify-between'>    
                                <div className='flex items-center space-x-2'>
                                    <button onClick={goBack} className="ri-arrow-left-s-line ri-3x"/>                   
                                    <h1 className={textTitle}>{project.title}</h1>   
                                </div> 
                                {/* <button onClick={useButtonStar} className={`${starButton ? 'ri-star-fill text-orange-300' : 'ri-star-line text-stone-700'} ri-2x`}/>
                                 */} 
                            </div>
                           
                            <h1 className={textStyle}>Solução:</h1>                            
                            <h1>{project.solution}</h1>

                            <h1 className={textStyle}>Problema:</h1>
                            <h1>{project.problem}</h1>
                            
                            <div className='pt-4 text-right space-x-5'>
                                <Button
                                    bg='bg-greenDark' 
                                    rounded='rounded-lg' 
                                    w='w-36' 
                                    h='h-12' 
                                    textColor='text-white' 
                                    textWeight='font-bold'
                                    onClick={useButtonEditProject}
                                >
                                    EDITAR
                                </Button>

                                <Button
                                    bg='bg-warning' 
                                    rounded='rounded-lg' 
                                    w='w-36' 
                                    h='h-12' 
                                    textColor='text-white' 
                                    textWeight='font-bold'
                                >
                                    EXCLUIR
                                </Button>
                            </div>
                            
                        
                            <Modal 
                                isOpen={buttonEditProject} 
                                onClose={() => setButtonEditProject(false)} 
                                title='Editar projeto'
                                footer={
                                    <Button 
                                        bg='bg-greenDark' 
                                        rounded='rounded' 
                                        w='w-full' 
                                        h='h-12' 
                                        textColor='text-white' 
                                        textWeight='font-bold'
                                        onClick={() => setButtonEditProject(false)}
                                    >
                                        Salvar
                                    </Button>
                                }
                            >
                                <div className='flex flex-col'>
                                    <Input 
                                        haslabel 
                                        label='Nome do projeto' 
                                        placeholder='ex: Agro' 
                                        bg='bg-grayBg'     
                                        value={nameProject}
                                        onChange={(e) => setNameProject(e.target.value)}   
                                    />

                                    <TextArea 
                                        haslabel 
                                        label='Solução' 
                                        placeholder='ex: Sistema de purificação de água'
                                        value={solutionProject}
                                        onChange={(e) => setSolutionProject(e.target.value)}
                                        top='mt-2'                                        
                                    />

                                    <TextArea  
                                        haslabel 
                                        label='Problema' 
                                        placeholder='ex: Água não putificada'
                                        value={problemProject}
                                        onChange={(e) => setProblemProject(e.target.value)}
                                        top='mt-2'
                                    />
                                </div>

                            </Modal>


                        </div>
                        
                ))}         
                </div>
            </div> 
            
        </Stack>
    );
}