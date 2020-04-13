import React,{useState,useEffect} from "react";

import api from './services/api'

import "./styles.css";



function App() {
  const [repositories, setRepositories]=useState([]);

  useEffect(()=>{
    api.get('repositories').then(e=>{
      setRepositories(e.data);
    });
  },[])

  async function handleAddRepository() {


    const response=await  api.post('repositories',{url:`url teste`,title:`titulo teste ${repositories.length}`,techs:['tech 1','tech 2']});
    console.log(response);
    if(response.status>=200 && response.status<300)
      setRepositories([...repositories,response.data]);
    else
      alert("ocorreu um erro")

  }

  async function handleRemoveRepository(id,event) {
    event.preventDefault();
    const index =repositories.findIndex((e,b)=>e.id===id);

    const response=await  api.delete(`repositories/${id}`);
    if(response.status>=200 && response.status<300)
      setRepositories(repositories.filter(e=>e.id!==id));
    else
      alert("ocorreu um erro")
  }

  return (
    <div>
      <ul data-testid="repository-list">

        {repositories.map(repositorie=>(
            <li key={repositorie.id}>
              <h1>{repositorie.title}</h1>
              <div>
                <div>{repositorie.url}</div>
              
                <div>{repositorie.likes}</div>
                <div>{repositorie.techs}</div>
             </div>
            <button onClick={(e) => handleRemoveRepository(repositorie.id,e)}>
              Remover
            </button>
          </li>
        ))}
        
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
