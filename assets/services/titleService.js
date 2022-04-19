import React from 'react'
import Modal from "../pages/Departments/Modal";

var changeMoi=false
function Nemechangepas(){
    changeMoi=false
}
function Mechange(){
    console.log("appelé")
    changeMoi=true
}

function getModal(params){
    if(params=="Departements"){
        return <Modal/>
    }
}

export {Mechange,getModal,Nemechangepas,changeMoi}