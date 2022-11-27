import React, { useEffect, useState } from 'react';
import { Stack } from '../../../components/Stack';
import Sidebar from '../../../components/Sidebar';
import { divGeneral, textTitle } from './styles';
import { Button } from '../../../components/Button';
import { useMyData } from '../../../services/queryClient/useMyData';
import { useFavIdeas } from '../../../services/queryClient/useFavIdeas';
import { Modal } from '../../../components/Modal';
import api from '../../../services/api';
import { useMyIdeas } from '../../../services/queryClient/useMyIdeas';
import { Input } from '../../../components/Input';
import { TextArea } from '../../../components/TextArea';
import router from 'next/router';

type IdeasType = {
    title: string;
    description: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
    openAddModal: boolean;
}

export default function ProfileAdmin() {    
    const myData = useMyData();
    const [ideasStates, setIdeasStates] = useState<IdeasType>({ } as IdeasType);
    const { isLoading, isFetching, data, refetch } = useMyIdeas(myData.data?.user.id as string);
    const favs = useFavIdeas();

    function handleButtonEditIdea(){
        setIdeasStates({...ideasStates, openAddModal: !ideasStates.openAddModal});
    }
    useEffect(() => {
        refetch()
        favs.refetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [myData.data, data])

    async function handleEditIdea() {
        if(ideasStates.title && ideasStates.description){
            const response = await api.post(`/idea`, {
                ...ideasStates,
                userId: myData.data?.user.id,
                situation: 'pending'
            });
            if(response.status.toString().startsWith('2')){
                setIdeasStates({} as IdeasType);
                refetch();
                alert('Ideia adicionada com sucesso! Agora ele está aguardando a aprovação de um administrador.');
            } else {
                alert('Erro ao cadastrar ideia. Tente novamente mais tarde.');
            }
        } else {
            alert('Por favor, preencha todos os campos.');
        }
        handleButtonEditIdea();
    }

    async function handleDeleteIdea() {
        if(window.confirm('Tem certeza que deseja excluir esta ideia?')){
            if(myData.data?.user.id === data?.user.id){
                const response = await api.delete(`/project/${myData.data?.user.id}/${router.query.id}`);
                if(response.status.toString().startsWith('2')){
                    setIdeasStates({} as IdeasType);
                    refetch();
                    alert('Ideia excluído com sucesso!');
                    router.back();
                } else {
                    alert('Erro ao excluir ideia. Tente novamente mais tarde.');
                }
            } else {
                alert('Você não pode deletar esta ideia.');
            }
        }
    }
    
    return ( 
        <Stack bg='bg-white'>
            <Sidebar data={myData.data}/>

            <div className={divGeneral}>
               
                
                { myData.data?.type === 'cliente' && myData.data.user.id && (
                    <div>
                        <h1 className={textTitle}>Titulo da ideia</h1>
                        <h1 className="text-justify pt-5">
                        Conta-se que por volta do ano 250 A.C, na China antiga, um príncipe da região norte do país, estava às vésperas de ser coroado imperador, mas, de acordo com a lei, ele deveria se casar. Sabendo disso, ele resolveu fazer uma “disputa” entre as moças da corte ou quem quer que se achasse digna de sua proposta. No dia seguinte, o príncipe anunciou que receberia, numa celebração especial, todas as pretendentes e lançaria um desafio. Uma velha senhora, serva do palácio há muitos anos, ouvindo os comentários sobre os preparativos, sentiu uma leve tristeza, pois sabia que sua jovem filha nutria um sentimento de profundo amor pelo príncipe. Ao chegar em casa e relatar o fato a jovem, espantou-se ao saber que ela pretendia ir à celebração, e indagou incrédula: – Minha filha, o que você fará lá? Estarão presentes todas as mais belas e ricas moças da corte. Tire esta ideia insensata da cabeça; eu sei que você deve estar sofrendo, mas não torne o sofrimento uma loucura. E a filha respondeu: Não, querida mãe, não estou sofrendo e muito menos louca, eu sei que jamais poderei ser a escolhida, mas é minha oportunidade de ficar pelo menos alguns momentos perto do príncipe, isto já me torna feliz. À noite, a jovem chegou ao palácio. Lá estavam, de fato, todas as mais belas moças, com as mais belas roupas, com as mais belas joias e com as mais determinadas intenções. Então, inicialmente, o príncipe anunciou o desafio: Darei a cada uma de vocês, uma semente. Aquela que, dentro de seis meses, me trouxer a mais bela flor, será escolhida minha esposa e futura imperatriz da China. A proposta do príncipe não fugiu as profundas tradições daquele povo, que valorizava muito a especialidade de “cultivar” algo, sejam costumes, amizades, relacionamentos, etc… O tempo passou e a doce jovem, como não tinha muita habilidade nas artes da jardinagem, cuidava com muita paciência e ternura a sua semente, pois sabia que se a beleza da flor surgisse na mesma extensão de seu amor, ela não precisava se preocupar com o resultado. Passaram-se três meses e nada surgiu. A jovem tudo tentara, usara de todos os métodos que conhecia, mas nada havia nascido. Dia após dia ela percebia cada vez mais longe o seu sonho, mas cada vez mais profundo o seu amor. Por fim, os seis meses haviam passado e nada havia brotado. Consciente do seu esforço e dedicação a moça comunicou a sua mãe que, independente das circunstâncias retornaria ao palácio, na data e hora combinadas, pois não pretendia nada além de mais alguns momentos na companhia do príncipe. Na hora marcada estava lá, com seu vaso vazio, bem como todas as outras pretendentes, cada uma com uma flor mais bela do que a outra, das mais variadas formas e cores. Ela estava admirada, nunca havia presenciado tão bela cena.
                        </h1>

                        <h2 className='text-black62 text-sm text-right pt-5'> 
                            Criado em  "dd/MM/yyyy"
                        </h2>
                    </div>
                )}

                { myData.data?.type === 'startup' && myData.data.user.id && (
                    <div>
                        <h1 className={textTitle}>Titulo da ideia</h1>                                                              
                        <h1 className='line-clamp-3 pt-5'>  
                        Conta-se que por volta do ano 250 A.C, na China antiga, um príncipe da região norte do país, estava às vésperas de ser coroado imperador, mas, de acordo com a lei, ele deveria se casar. Sabendo disso, ele resolveu fazer uma “disputa” entre as moças da corte ou quem quer que se achasse digna de sua proposta. No dia seguinte, o príncipe anunciou que receberia, numa celebração especial, todas as pretendentes e lançaria um desafio. Uma velha senhora, serva do palácio há muitos anos, ouvindo os comentários sobre os preparativos, sentiu uma leve tristeza, pois sabia que sua jovem filha nutria um sentimento de profundo amor pelo príncipe. Ao chegar em casa e relatar o fato a jovem, espantou-se ao saber que ela pretendia ir à celebração, e indagou incrédula: – Minha filha, o que você fará lá? Estarão presentes todas as mais belas e ricas moças da corte. Tire esta ideia insensata da cabeça; eu sei que você deve estar sofrendo, mas não torne o sofrimento uma loucura. E a filha respondeu: Não, querida mãe, não estou sofrendo e muito menos louca, eu sei que jamais poderei ser a escolhida, mas é minha oportunidade de ficar pelo menos alguns momentos perto do príncipe, isto já me torna feliz. À noite, a jovem chegou ao palácio. Lá estavam, de fato, todas as mais belas moças, com as mais belas roupas, com as mais belas joias e com as mais determinadas intenções. Então, inicialmente, o príncipe anunciou o desafio: Darei a cada uma de vocês, uma semente. Aquela que, dentro de seis meses, me trouxer a mais bela flor, será escolhida minha esposa e futura imperatriz da China. A proposta do príncipe não fugiu as profundas tradições daquele povo, que valorizava muito a especialidade de “cultivar” algo, sejam costumes, amizades, relacionamentos, etc… O tempo passou e a doce jovem, como não tinha muita habilidade nas artes da jardinagem, cuidava com muita paciência e ternura a sua semente, pois sabia que se a beleza da flor surgisse na mesma extensão de seu amor, ela não precisava se preocupar com o resultado. Passaram-se três meses e nada surgiu. A jovem tudo tentara, usara de todos os métodos que conhecia, mas nada havia nascido. Dia após dia ela percebia cada vez mais longe o seu sonho, mas cada vez mais profundo o seu amor. Por fim, os seis meses haviam passado e nada havia brotado. Consciente do seu esforço e dedicação a moça comunicou a sua mãe que, independente das circunstâncias retornaria ao palácio, na data e hora combinadas, pois não pretendia nada além de mais alguns momentos na companhia do príncipe. Na hora marcada estava lá, com seu vaso vazio, bem como todas as outras pretendentes, cada uma com uma flor mais bela do que a outra, das mais variadas formas e cores. Ela estava admirada, nunca havia presenciado tão bela cena.
                        </h1>
                        <h2 className='text-black62 text-sm text-right pt-5'> 
                            Criado em  "dd/MM/yyyy"
                        </h2>
                    </div>
                )}

                {myData.data?.type === 'cliente' && myData.data.user.id && (
                    <div className='pt-4 text-right space-x-5'>
                        <Button
                            bg='bg-greenDark' 
                            rounded='rounded-lg' 
                            w='w-36' 
                            h='h-12' 
                            textColor='text-white' 
                            textWeight='font-bold'
                            onClick={handleButtonEditIdea}
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
                            onClick={handleDeleteIdea}
                        >
                            EXCLUIR
                        </Button>
                 
                </div>                       
            )}  

            {myData.data?.type === 'admin' && myData.data.user.id &&  (
                <div className='pt-4 text-right space-x-5'>
                    <Button
                        bg='bg-greenDark' 
                        rounded='rounded-lg' 
                        w='w-36' 
                        h='h-12' 
                        textColor='text-white' 
                        textWeight='font-bold'
                        
                    >
                        APROVAR
                    </Button>

                    <Button
                        bg='bg-warning' 
                        rounded='rounded-lg' 
                        w='w-36' 
                        h='h-12' 
                        textColor='text-white' 
                        textWeight='font-bold'
                       
                    >
                        RECUSAR
                    </Button>
                </div>     
            )}  

            { myData.data?.type === 'startup' && myData.data.user.id&& (
                <div className='pt-8 text-center space-x-5'>
                    <Button
                        bg='bg-greenText' 
                        rounded='rounded-lg' 
                        w='w-96' 
                        h='h-16' 
                        textColor='text-white' 
                        textWeight='font-bold'
                       
                    >
                        ASSINE PARA VER MAIS...
                    </Button>
                </div>
            )}

            <Modal 
                isOpen={ideasStates.openAddModal} 
                onClose={handleButtonEditIdea} 
                title='Editar ideia'
                footer={
                    <Button 
                        bg='bg-greenDark' 
                        rounded='rounded' 
                        w='w-full' 
                        h='h-12' 
                        textColor='text-white' 
                        textWeight='font-bold'
                        onClick={handleEditIdea}
                    >
                        Salvar
                    </Button>
                }
            >
                <div className='flex flex-col'>
                    <Input 
                        haslabel 
                        label='Nome da ideia' 
                        placeholder='ex: Agro' 
                        bg='bg-grayBg'     
                        value={ideasStates.title}
                        onChange={(e) => setIdeasStates({ ...ideasStates, title: e.target.value })}   
                    />

                    <TextArea 
                        haslabel 
                        label='Descrição' 
                        placeholder='ex: Sistema de purificação de água'
                        value={ideasStates.description}
                        onChange={(e) => setIdeasStates({ ...ideasStates, description: e.target.value })}   
                        top='mt-2'                                        
                    />                   
                </div>
            </Modal> 
            </div> 
        </Stack>
    );
}