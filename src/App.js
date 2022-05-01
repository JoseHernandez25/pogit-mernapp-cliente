import './App.css';
import { useState, useEffect} from "react";
import Axios from 'axios';

function App() {
 const [name, setName]= useState("");
 const [age, setAge]= useState(0);
 const [description, setDescription]= useState("");
 const [ListOfFriends, setListOfFriends]= useState([]);

 //Funcion para guardar los datos del formulario desde el frontend al backend
 const addFriend = () => {
   Axios.post("darling-starburst-c6ea10.netlify.app/addFriend", {
     name: name,
     age: age,
     description : description
   }).then((response) => {
     alert('Datos registrados! Succes! =D');
    setListOfFriends([...ListOfFriends, { _id: response.data, name : name, age: age, description : description}]);
   }).catch(() => {
    alert('No se registraron los datos! Fail! =(')
   });
 };

 //Funcion para actualizar datos del formulario desde el frontend al backend
 const updateFriend = (id) => {

  const newAge = prompt("ingresar nueva edad: ");
  const newDescription = prompt("Ingresar nueva description: ");

  Axios.put("http://localhost:49000/update", { newAge: newAge, newDescription: newDescription, id: id}).then(() =>{
    alert('Datos actualizados! Succes! =D');
    setListOfFriends(ListOfFriends.map((val) => {
      return val._id === id
      ? { _id: id, name: val.name, age:newAge, description: newDescription}
      : val;
    }));
  }).catch(() => {
    alert('No se actualizaron los datos! Fail! =(');
  });
 };

 //Funcion para borrar datos desde el frontend al backend
 const deleteFriend = (id) => {
   Axios.delete(`darling-starburst-c6ea10.netlify.app/delete/${id}`).then(() => {
     alert('Datos eliminados! Success! =D');
     setListOfFriends(ListOfFriends.filter((val) =>{
       return val._id !== id;
     }));
   }).catch(() => {
     alert('No se eliminaron los datos! Fail! =(');
   });
 };

 //Funcion para cargar los datos desde el backend al frontend
 //useEffect es una funcion que se ejecuta al cargar la App
 useEffect(() => {
   Axios.get("darling-starburst-c6ea10.netlify.app/read")
   .then((response) => {
     setListOfFriends(response.data);
   }).catch(() => {
     console.log("No response");
   });
 }, []);

 return (
   <div className="App">
   <div className="inputs">
   REGISTRO DE AMIGOS
    <input
    type = "text"
    placeholder = "Nombre..."
    onChange = {(event) => { setName(event.target.value) }}
    />

    <input
    type = "number"
    placeholder = "Edad..."
    onChange = {(event) => { setAge(event.target.value) }}
    />

    <input
    type = "text"
    placeholder = "Description..."
    onChange = {(event) => { setDescription(event.target.value) }}
    />

    <button onClick = {addFriend}>Agregar</button>
  </div>
  <p align="center">LISTADO DE AMIGOS</p>
  <div className="ListOfFriens">
    { ListOfFriends.map((val) => {
      return (
        <div className="FriendContainer">
          <div className="Friend">
            <h3>Nombre: {val.name}</h3>
            <h3>Edad: {val.age}</h3>
            <h3>Description: {val.description}</h3>
          </div>
          <button
          id="updateBtn"
          onClick = {() => { updateFriend(val._id) }}
          ><b>M</b></button>
          <button
          id="removeBtn"
          onClick = {() => { deleteFriend(val._id) }}
          ><b>E</b></button>
          </div>
      );
    })}
    </div>

  </div>
 );
}

export default App;
