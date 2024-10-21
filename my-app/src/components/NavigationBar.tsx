"use client";
import { useState } from "react"; 
import './NavigationBar.css';

const NavigationBar: React.FC = () => {
    return(
        <div className="nav-container">
            <div className="icon">
                <button>
                    <span>⋮</span>
                </button>
            </div>
            <div className="account-bubble">
                <span>👤</span>
            </div>
        </div>
    );
}; 
export default NavigationBar;
