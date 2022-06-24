import React from "react";
import Navbar from "../components/navbar/navbar"

export default function Menu(){
    return(
        <div className="container-fluid">
            <div className="row">
                <Navbar />
                <div className="col-md-10">
                    Menu
                </div>
            </div>
        </div>
    )
}