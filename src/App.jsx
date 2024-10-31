import { useState } from 'react'
import { Button } from "@/components/ui/button" 

import ProjectList from '@/components/ui/Project';
import Navbar from '@/components/ui/navbar';

function App() {

  return (
    <> 

    <Navbar />
    <ProjectList />
    </>
  );
}

export default App;
