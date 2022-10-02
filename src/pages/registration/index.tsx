import React from 'react';
import { Div } from '../../components/Div';

export default function Registration() {
    // Observe o uso do Fragment (<></>) para agrupar os componentes e
    // o uso do componente Div, que foi importado de outro arquivo.
    // Também observe que o componente Div recebeu uma propriedade
    // chamada bg, que é uma propriedade que pode ser mudada.
    return (         
        <>
            <Div/>
            <Div bg="bg-red-300"/>
        </>
    );
}