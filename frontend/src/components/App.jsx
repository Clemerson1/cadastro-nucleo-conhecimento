import React from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import CreateKnowledgeNucleusForm from './components/CreateKnowledgeNucleusForm';
import './styles/main.css'; // Estilos gerais

function App() {
  return (
    <div className="app-container">
      <Header />
      <div className="main-content">
        <Sidebar />
        <div className="page-content">
          <CreateKnowledgeNucleusForm />
        </div>
      </div>
    </div>
  );
}

export default App;