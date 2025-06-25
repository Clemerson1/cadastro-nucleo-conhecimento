import React from 'react';
import './Sidebar.css'; // Estilos específicos para o Sidebar

function Sidebar() {
    return (
        <aside className="sidebar">
            <ul>
                <li className="sidebar-item active">
                    <a href="#">Página Principal</a>
                </li>
                <li className="sidebar-item">
                    <a href="#">Núcleo de Conhecimento</a>
                </li>
                <li className="sidebar-item">
                    <a href="#">Intenção em Núcleo de Conhecimento</a>
                </li>
                <li className="sidebar-item">
                    <a href="#">Histórico de Manifestações</a>
                </li>
            </ul>
        </aside>
    );
}

export default Sidebar;