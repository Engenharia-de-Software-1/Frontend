import 'remixicon/fonts/remixicon.css';
import React, { useEffect } from 'react';
import { Stack } from '../Stack';
import { divGeneral } from './styles';
import { NavSection } from './NavSection';
import { NavButton } from './NavButton';
import { InfoNavSection } from './InfoNavSection';
import { useRouter } from 'next/router';
import { useAuth } from '../../contexts/authContext';
import { IResponse } from '../../services/queryClient/useMyData';

interface SidebarProps {
    data: IResponse | undefined;
}

export default function Sidebar({ data }: SidebarProps) { 
    const { user, signOut } = useAuth();
    const router = useRouter();

    const goToByLogo = () => {
        switch(data?.type) {
            case 'admin':
                return '/gerenciamento/startup';
            default:
                return '/dashboard';
        }
    };

    const goToMyAccount = () => {
        return `/minhaConta${data?.type && data?.type.substring(0, 1).toUpperCase() + data?.type.substring(1)}`;
    };

    const logout = () => {
        signOut();
        router.push('/');
    }

    return ( 
        <Stack bg='bg-white'>
            <div className={divGeneral}> 
                <a href={goToByLogo()}>
                    <div className="w-36 h-8 bg-no-repeat bg-agroLogo m-9"/>
                </a>

                {(data?.type === 'startup' || data?.type === 'investidor' || data?.type === 'cliente') && (
                    <NavSection title="Geral">
                        <NavButton icon="ri-dashboard-line" title="Dashboard" href="/dashboard"/>
                    </NavSection>
                )}

                {data?.type === 'admin' && (
                    <NavSection title="Gerenciamento">
                        <NavButton icon="ri-building-line" title="Startup" href="/gerenciamento/startup"/>
                        <NavButton icon="ri-plant-line" title="Produtor rural" href="/gerenciamento/cliente"/>
                        <NavButton icon="ri-user-2-line" title="Investidor" href="/gerenciamento/investidor"/>
                    </NavSection>
                )}

                {data?.type === 'startup' && (
                    <NavSection title="Projetos">
                        <NavButton icon="ri-pencil-ruler-line" title="Meus projetos" href={`/meusProjetos/${user}`}/>
                        <NavButton icon="ri-money-dollar-circle-line" title="Investimentos" href="/investimentos"/>
                        <NavButton icon="ri-chat-smile-2-line" title="Consultoria" href="/consultoria"/>
                    </NavSection>
                )}

                {data?.type === 'investidor' && (
                    <NavSection title="Projetos">
                        <NavButton icon="ri-search-line" title="Encontrar projetos" href="/encontrar/projetos"/>
                        <NavButton icon="ri-money-dollar-box-line" title="Projetos investidos" href="/projetosInvestidos"/>
                    </NavSection>
                )}
                
                {data?.type === 'admin' && (
                    <NavSection title='Aprovações'>
                        <NavButton icon='ri-booklet-line' title='Projetos pendentes' href='/pendentes/projetos'/>
                        <NavButton icon='ri-lightbulb-line' title='Ideias pendentes' href='/pendentes/ideias'/>
                    </NavSection>
                )}

                {data?.type === 'startup' && (
                    <NavSection title="Ideias">
                        <NavButton icon="ri-search-line" title="Encontrar ideias" href="/encontrar/ideias"/>
                    </NavSection>
                )}

                {data?.type === 'cliente' && (
                    <NavSection title="Ideias">
                        <NavButton icon="ri-lightbulb-line" title="Minhas ideias" href="/ideias/me"/>
                    </NavSection>
                )}

                <NavSection title='Outros'>
                    {data?.type === 'admin' && (
                        <>
                            <NavButton icon='ri-user-follow-line' title='Administradores' href='/administradores'/>
                            <NavButton icon='ri-store-2-line' title='Planos' href='/planos'/>
                        </>
                    )}
                    <NavButton icon='ri-user-smile-line' title='Minha conta' href={goToMyAccount()}/>
                    <NavButton icon='ri-tools-fill' title='Configurações' href='/configuracao'/>
                </NavSection>
            </div>

            <InfoNavSection email={data?.user.email as string} name={data?.user.name as string} logout={logout}/>
        </Stack>
    );
}