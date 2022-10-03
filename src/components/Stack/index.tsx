import React, { ReactNode } from 'react';
import { mainStyle, textStyle } from './styles';

// Demonstração de como usar o componente e estilização
interface IStackProps {
    bg?: string; // Estou supondo que o background seja um props mudável
    w?: string;
    h?: string;
    direction?: "row" | "column";
    children: ReactNode;
}

// Coloquei o bg com o valor padrão definido como 'bg-greenDark'
function Stack({ bg = 'bg-greenDark', w, h, direction='row', children }: IStackProps) {

    // O mainStyle é um objeto que contém as propriedades de estilo principais
    // e isso provém de um arquivo separado, que é o styles.ts

    // Perceba que no mainStyle não temos a propriedade background, afinal ela
    // é uma propriedade que pode ser mudada, então ela não é fixa, e sim dinâmica.
    // Assim, concatenei o valor da propriedade bg com o mainStyle, e passei para
    // o componente <div> como uma propriedade de estilo. Isso pode ser feito
    // com qualquer propriedade de estilo que pode ser mudada.

    // Sobre a separação de arquivos. O arquivo styles.ts contém apenas as propriedades de estilo
    // do componente, e o arquivo index.tsx contém apenas o componente. Isso é feito para que
    // o código fique mais organizado, limpo e legível. Todo o componente deve ser separado em
    // index.tsx (componente) e styles.ts (estilização).

    // Sobre o tailwind. O tailwind é uma biblioteca de estilização que permite que você
    // crie estilos de forma rápida e fácil. No entanto, deve-se ter cuidado ao criar novos
    // tamanhos de fonte, cores, espaçamentos, etc. A explicação é que a biblioteca em questão
    // utiliza padrões de tamanhos utilizados por designers de empresas como Google, Facebook,
    // etc. Claro que, criar um novo tamanho de fonte, por exemplo, pode fazer sentido se isso
    // for realmente necessário.
    if(direction=="row") {
        return (
            <div  className={`${mainStyle} ${bg} ${w} ${h} `}>
                {children}
            </div>
        )
    } else {
        return (        
            <div  className={`${mainStyle} ${bg} ${w} ${h} `}>
                {children}
            </div>
            
            )
        }
}

export { Stack };