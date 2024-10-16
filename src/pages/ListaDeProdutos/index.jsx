import React from "react";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

import Table from "react-bootstrap/Table";

import MainNavBar from "../../components/MainNavBar/index.jsx"

import { useState, useEffect } from "react";


const url = "http://localhost:3000/usuarios";

const ListaDeProdutos = () => {
  const [usuarios, setUsuarios] = useState([]);


  //Resgate de dados da API
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(url);
        const users = await res.json();
        setUsuarios(users);
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchData();
    console.log(usuarios);
  }, []);

  return (
    <div>
      <MainNavBar/>

      <Container>
        
        <h1>Lista de Produtos</h1>
 

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Nome </th>
              <th>Email</th>
              <th>Tipo</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.nome}</td>
                <td>{user.email}</td>
                <td>{user.tipo}</td>
                <td>
                  <ButtonGroup size="sm">
                    <Button variant="info">Editar</Button>
                    <Button
                      variant="danger"
                      onClick={async () => {
                        const res = await fetch(`http://localhost:3000/usuarios/${user.id}`, {
                          method: "DELETE",
                          headers: { "Content-Type": "application/json" },
                        });
                        const funcionarioRemovido = await res.json()
                        alert(`Usuário ${funcionarioRemovido.nome} foi excluido`)
                      }}
                    >
                      Excluir
                    </Button>
                  </ButtonGroup>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>


      </Container>
    </div>
  );
};

export default ListaDeProdutos;
