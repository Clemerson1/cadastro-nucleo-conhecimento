import React from 'react';
import './Header.css'; // Estilos específicos para o Header
import profileImage from '../assets/profile.jpeg'; // Assumindo uma imagem de perfil

function Header() {
    return (
        <header className="header">
            <div className="header-left">
                <span className="header-logo">SOCC</span> {/* Ou um logo real */}
            </div>
            <div className="header-right">
                <span className="user-name">Afonso Usslei da Fonseca</span>
                <span className="user-role">Coordenador</span>
                <img src={profileImage} alt="User Profile" className="profile-image" />
            </div>
        </header>
    );
}

export default Header;