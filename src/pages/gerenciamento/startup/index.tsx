import React from 'react';
import Sidebar from '../../../components/Sidebar';
import { Stack } from '../../../components/Stack';

export default function Startup() {  

    return ( 
        <Stack bg='bg-white'>
            <Sidebar data={undefined}/>
        </Stack>
    );
}