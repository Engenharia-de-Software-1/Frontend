import 'remixicon/fonts/remixicon.css';
import React, { useState } from 'react';
import { Stack } from '../Stack';
import { divGeneral } from './styles';
import { NavSection } from './NavSection';
import { NavButton } from './NavButton';
import { InfoNavSection } from './InfoNavSection';
import { useRouter } from 'next/router';

export default function Sidebar() { 
    // O tipo deve ser adquirido de alguma forma. Podemos criar um contexto sobre isso.
    const [userType, setUserType] = useState('cliente');
    const router = useRouter();

    const goToByLogo = () => {
        switch(userType) {
            case 'admin':
                return '/gerenciamento/startup';
            default:
                return '/dashboard';
        }
    };

    const goToMyAccount = () => {
        return `/minhaConta${userType.substring(0, 1).toUpperCase() + userType.substring(1)}`;
    };

    const logout = () => {
        // Fazer logout
        router.push('/');
    }

    return ( 
        <Stack bg=' bg-white'>
            <div className={divGeneral}> 
                <a href={goToByLogo()}>
                    <div className="w-36 h-8 bg-no-repeat bg-agroLogo m-9"/>
                </a>

                {(userType === 'startup' || userType === 'investidor' || 'cliente') && (
                    <NavSection title="Geral">
                        <NavButton icon="ri-dashboard-line" title="Dashboard" href="/dashboard"/>
                    </NavSection>
                )}

                {userType === 'admin' && (
                    <NavSection title="Gerenciamento">
                        <NavButton icon="ri-building-line" title="Startup" href="/gerenciamento/startup"/>
                        <NavButton icon="ri-plant-line" title="Produtor rural" href="/gerenciamento/cliente"/>
                        <NavButton icon="ri-user-2-line" title="Investidor" href="/gerenciamento/investidor"/>
                    </NavSection>
                )}

                {userType === 'startup' && (
                    <NavSection title="Projetos">
                        <NavButton icon="ri-pencil-ruler-line" title="Meus projetos" href="/meusProjetosStartup"/>
                        <NavButton icon="ri-money-dollar-circle-line" title="Investimentos" href="/investimentos"/>
                        <NavButton icon="ri-chat-smile-2-line" title="Consultoria" href="/consultoria"/>
                    </NavSection>
                )}

                {userType === 'investidor' && (
                    <NavSection title="Projetos">
                        <NavButton icon="ri-search-line" title="Encontrar projetos" href="/encontrar/projetos"/>
                    </NavSection>
                )}
                
                {userType === 'admin' && (
                    <NavSection title='Aprovações'>
                        <NavButton icon='ri-booklet-line' title='Projetos pendentes' href='/pendentes/projetos'/>
                        <NavButton icon='ri-lightbulb-line' title='Ideias pendentes' href='/pendentes/ideias'/>
                    </NavSection>
                )}

                {userType === 'startup' && (
                    <NavSection title="Ideias">
                        <NavButton icon="ri-search-line" title="Encontrar ideias" href="/encontrar/ideias"/>
                    </NavSection>
                )}

                {userType === 'cliente' && (
                    <NavSection title="Ideias">
                        <NavButton icon="ri-add-circle-line" title="Cadastrar ideias" href="/ideias/cadastro"/>
                        <NavButton icon="ri-lightbulb-line" title="Minhas ideias" href="/ideias/me"/>
                    </NavSection>
                )}

                <NavSection title='Outros'>
                    {userType === 'admin' && (
                        <NavButton icon='ri-user-follow-line' title='Administradores' href='/administradores'/>
                    )}
                    <NavButton icon='ri-user-smile-line' title='Minha conta' href={goToMyAccount()}/>
                    <NavButton icon='ri-tools-fill' title='Configurações' href='/configuracao'/>
                </NavSection>
            </div>

            <InfoNavSection logout={logout}/>
        </Stack>
    );
}