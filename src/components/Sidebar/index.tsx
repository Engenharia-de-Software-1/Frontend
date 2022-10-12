import 'remixicon/fonts/remixicon.css';
import React, { useState } from 'react';
import { Stack } from '../Stack';
import { belowStyle, buttonStyle, divGeneral, textStyle, textStyle2, textTitle } from './styles';
import { Button } from './button';
import router from 'next/router';

export default function Sidebar() { 
    const [buttonStartup, setButtonStartup] = useState(false);
    const [buttonRuralProducer, setButtonRuralProducer] = useState(false);
    const [buttonInvestor, setButtonInvestor] = useState(false);
    const [buttonPendingProjects, setButtonPendingProjects] = useState(false);
    const [buttonPendingIdeas, setButtonPendingIdeas] = useState(false);
    const [buttonAdmin, setButtonAdmin] = useState(false);
    const [buttonProfile, setbuttonProfile] = useState(false);
    const [buttonConfiguration, setButtonConfiguration] = useState(false);
   
    function goStartupButton() {
        setButtonStartup(true);
        setButtonRuralProducer(false);
        setButtonInvestor(false);
        setButtonPendingProjects(false);
        setButtonPendingIdeas(false);
        setButtonAdmin(false);
        setbuttonProfile(false); 
        setButtonConfiguration(false);
        router.push('/startup');       
    }
    function goRuralProducerButton() {
        setButtonStartup(false);
        setButtonRuralProducer(true);
        setButtonInvestor(false);
        setButtonPendingProjects(false);
        setButtonPendingIdeas(false);
        setButtonAdmin(false);
        setbuttonProfile(false); 
        setButtonConfiguration(false);   
        router.push('/produtorRural');     
    }

    function goInvestorButton() {
        setButtonStartup(false);
        setButtonRuralProducer(false);
        setButtonInvestor(true);
        setButtonPendingProjects(false);
        setButtonPendingIdeas(false);
        setButtonAdmin(false);
        setbuttonProfile(false);  
        setButtonConfiguration(false);
        router.push('/investidor');        
    }
    function goPendingProjectsButton() {
        setButtonStartup(false);
        setButtonRuralProducer(false);
        setButtonInvestor(false);
        setButtonPendingProjects(true);
        setButtonPendingIdeas(false);
        setButtonAdmin(false);
        setbuttonProfile(false);  
        setButtonConfiguration(false);
        router.push('/projetosPendentes');        
    }
    function goPendingIdeasButton() {
        setButtonStartup(false);
        setButtonRuralProducer(false);
        setButtonInvestor(false);
        setButtonPendingProjects(false);
        setButtonPendingIdeas(true);
        setButtonAdmin(false);
        setbuttonProfile(false);
        setButtonConfiguration(false);
        router.push('/ideiasPendentes');    
    }
    function goAdminButton() {
        setButtonStartup(false);
        setButtonRuralProducer(false);
        setButtonInvestor(false);
        setButtonPendingProjects(false);
        setButtonPendingIdeas(false);
        setButtonAdmin(true);
        setbuttonProfile(false);
        setButtonConfiguration(false);
        router.push('/administradores');       
    }
    function goProfileButton() {
        setButtonStartup(false);
        setButtonRuralProducer(false);
        setButtonInvestor(false);
        setButtonPendingProjects(false);
        setButtonPendingIdeas(false);
        setButtonAdmin(false);
        setbuttonProfile(true);  
        setButtonConfiguration(false);
        router.push('/minhaContaAdmin')      
    }
    function goConfigurationButton() {
        setButtonStartup(false);
        setButtonRuralProducer(false);
        setButtonInvestor(false);
        setButtonPendingProjects(false);
        setButtonPendingIdeas(false);
        setButtonAdmin(false);
        setbuttonProfile(false);  
        setButtonConfiguration(true);
        router.push('/configuracao')      
    }
    function goOut() {
        router.push('./login')
    }

    return ( 
        <Stack bg=' bg-white'>
            <div className={divGeneral}> 
                <div>
                    <div className="w-36 h-8 bg-no-repeat bg-agroLogo m-9"/>
                    
                    <h1 className={textTitle} >
                        Gerenciamento
                    </h1>
                    
                    <div className="pt-2">  
                        <Button 
                            bg={buttonStartup ? 'bg-greenText' : undefined} 
                            textColor={buttonStartup ? 'text-white' : undefined} 
                            textWeight={buttonStartup ? 'font-semibold' : undefined}   
                            onClick={goStartupButton}
                            > 
                            <i className="ri-building-line px-3"/>                  
                            Startup
                        </Button>
                    
                        <Button 
                            bg={buttonRuralProducer ? 'bg-greenText' : undefined} 
                            textColor={buttonRuralProducer ? 'text-white' : undefined} 
                            textWeight={buttonRuralProducer ? 'font-semibold' : undefined}
                            onClick={goRuralProducerButton}
                            > 
                            <i className="ri-plant-line px-3"></i>
                            Produtor rural
                        </Button>
                    
                        <Button 
                            bg={buttonInvestor ? 'bg-greenText' : undefined} 
                            textColor={buttonInvestor ? 'text-white' : undefined} 
                            textWeight={buttonInvestor ? 'font-semibold' : undefined}
                            onClick={goInvestorButton}
                            > 
                            <i className="ri-user-2-line px-3"></i>
                            Investidor
                        </Button>
                    </div>
                </div>

                <div className="pt-9">                                      
                    <h1 className={textTitle} >
                        Aprovações
                    </h1>
                    
                    <div className="pt-2">                    
                        <Button 
                            bg={buttonPendingProjects ? 'bg-greenText' : undefined} 
                            textColor={buttonPendingProjects ? 'text-white' : undefined} 
                            textWeight={buttonPendingProjects ? 'font-semibold' : undefined}
                            onClick={goPendingProjectsButton}
                            > 
                            <i className="ri-booklet-line px-3"></i> 
                            Projetos pendentes
                        </Button>
                    
                        <Button 
                            bg={buttonPendingIdeas ? 'bg-greenText' : undefined} 
                            textColor={buttonPendingIdeas ? 'text-white' : undefined} 
                            textWeight={buttonPendingIdeas ? 'font-semibold' : undefined}
                            onClick={goPendingIdeasButton}
                            > 
                            <i className="ri-lightbulb-line px-3"></i>
                            Ideias pendentes
                        </Button>
                    </div>
                </div>

                <div className="pt-9">  
                    <h1 className={textTitle} >
                        Outros
                    </h1>
                    
                    <div className="pt-2">                    
                        <Button 
                            bg={buttonAdmin ? 'bg-greenText' : undefined} 
                            textColor={buttonAdmin ? 'text-white' : undefined} 
                            textWeight={buttonAdmin ? 'font-semibold' : undefined}
                            onClick={goAdminButton} 
                            > 
                            <i className="ri-user-follow-line px-3"></i>
                            Administradores
                        </Button>
                    
                        <Button 
                            bg={buttonProfile ? 'bg-greenText' : undefined} 
                            textColor={buttonProfile ? 'text-white' : undefined} 
                            textWeight={buttonProfile ? 'font-semibold' : undefined}
                            onClick={goProfileButton}
                            > 
                            <i className="ri-user-smile-line px-3"></i>
                            Minha conta
                        </Button>

                        <Button 
                            bg={buttonConfiguration ? 'bg-greenText' : undefined} 
                            textColor={buttonConfiguration ? 'text-white' : undefined} 
                            textWeight={buttonConfiguration ? 'font-semibold' : undefined}
                            onClick={goConfigurationButton}
                            > 
                            <i className="ri-tools-fill px-3"></i>
                            Configuração
                        </Button>
                    </div>
                </div>

                <div className={belowStyle}>
                    <div className="flex flex-col ">
                        <text className={textStyle}>
                            John Doe
                        </text>
                        <text className={textStyle2}>
                            johndoe@agroi9.com
                        </text>
                    </div>

                    <button className={buttonStyle} onClick={goOut}>
                        <i className="ri-logout-box-r-line px-3"></i>
                    </button>
                </div>
            </div>
        </Stack>
    );
}