import React, { useState, useEffect } from 'react';
import './CreateKnowledgeNucleusForm.css';
import DataTable from './DataTable';
import SelectField from './SelectField';

function CreateKnowledgeNucleusForm() {
    const [nucleusName, setNucleoName] = useState('');
    const [areaId, setAreaId] = useState('');
    const [facilitatorId, setFacilitatorId] = useState('');
    const [description, setDescription] = useState('');
    const [teacherNameInput, setTeacherNameInput] = useState(''); // Input para o nome do docente
    const [disciplineNameInput, setDisciplineNameInput] = useState(''); // Input para o nome da disciplina
    const [selectedTeachers, setSelectedTeachers] = useState([]); // Docentes que serão enviados (com IDs temporários)
    const [selectedDisciplines, setSelectedDisciplines] = useState([]); // Disciplinas que serão enviadas (com IDs temporários)
    const [message, setMessage] = useState('');
    const [queryNucleusId, setQueryNucleusId] = useState('');
    const [foundNucleus, setFoundNucleus] = useState(null);

    // Apenas para simulação, vamos manter opções mockadas para Área e Facilitador
    const areaOptions = [
        { value: '', label: 'Selecione a área' },
        { value: '1', label: 'Tecnologia da Informação' }, // IDs simulados
        { value: '2', label: 'Engenharia de Software' },
        { value: '3', label: 'Saúde Digital' },
    ];
    const facilitatorOptions = [
        { value: '', label: 'Selecione o facilitador' },
        { value: '101', label: 'Afonso Usslei da Fonseca' },
        { value: '102', label: 'Maria Silva' },
        { value: '103', label: 'Carlos Oliveira' },
    ];

    // Colunas para a tabela de docentes
    const teacherColumns = [
        { header: 'ID (Temp)', accessor: 'id' }, // Mostrar ID temporário
        { header: 'Docente', accessor: 'teacherName' }, // Mudado para teacherName
        { header: 'Ações', accessor: 'actions' },
    ];

    // Colunas para a tabela de disciplinas
    const disciplineColumns = [
        { header: 'ID (Temp)', accessor: 'id' }, // Mostrar ID temporário
        { header: 'Disciplina', accessor: 'disciplineName' }, // Mudado para disciplineName
        { header: 'Ações', accessor: 'actions' },
    ];

    // Função para adicionar um NOVO docente com ID temporário
    const handleAddTeacher = () => {
        const term = teacherNameInput.trim();

        if (!term) {
            setMessage('Por favor, digite um nome de docente.');
            return;
        }

        // Verifica se já adicionou um docente com este MESMO NOME
        const alreadySelected = selectedTeachers.some(t =>
            t.teacherName.toLowerCase() === term.toLowerCase()
        );

        if (alreadySelected) {
            setMessage('Docente com este nome já adicionado à lista.');
            return;
        }

        // Cria um NOVO objeto docente com um ID temporário
        const newTeacher = {
            id: Date.now(), // ID temporário único
            teacherName: term, // O nome digitado
            // Outras propriedades que você pode querer exibir na tabela
            email: `${term.toLowerCase().replace(/\s/g, '.')}@example.com`,
            entryDate: new Date().toLocaleDateString(),
            status: 'Ativo'
        };

        setSelectedTeachers([...selectedTeachers, newTeacher]);
        setTeacherNameInput(''); // Limpa o campo de input
        setMessage(''); // Limpa mensagens de erro
    };

    const handleRemoveTeacher = (id) => {
        setSelectedTeachers(selectedTeachers.filter(t => t.id !== id));
    };

    // Função para adicionar uma NOVA disciplina com ID temporário
    const handleAddDiscipline = () => {
        const term = disciplineNameInput.trim();

        if (!term) {
            setMessage('Por favor, digite um nome de disciplina.');
            return;
        }

        // Verifica se já adicionou uma disciplina com este MESMO NOME
        const alreadySelected = selectedDisciplines.some(d =>
            d.disciplineName.toLowerCase() === term.toLowerCase()
        );

        if (alreadySelected) {
            setMessage('Disciplina com este nome já adicionada à lista.');
            return;
        }

        // Cria um NOVO objeto disciplina com um ID temporário
        const newDiscipline = {
            id: Date.now(), // ID temporário único
            disciplineName: term, // O nome digitado
            // Outras propriedades para a tabela
            code: `CODE-${Math.floor(Math.random() * 1000)}`,
            course: 'Geral',
            matrix: '2025.1',
            theoreticalCH: 60,
            practicalCH: 20,
            totalCH: 80
        };

        setSelectedDisciplines([...selectedDisciplines, newDiscipline]);
        setDisciplineNameInput(''); // Limpa o campo de input
        setMessage(''); // Limpa mensagens de erro
    };

    const handleRemoveDiscipline = (id) => {
        setSelectedDisciplines(selectedDisciplines.filter(d => d.id !== id));
    };

    const handleCreateNucleus = async () => {
        setMessage('');

        if (!nucleusName || !areaId || !facilitatorId || !description) {
            setMessage('Por favor, preencha todos os campos obrigatórios.');
            return;
        }
        if (selectedTeachers.length === 0) {
            setMessage('Adicione pelo menos um docente.');
            return;
        }
        if (selectedDisciplines.length === 0) {
            setMessage('Adicione pelo menos uma disciplina.');
            return;
        }

        // Coleta apenas os IDs temporários dos docentes e disciplinas selecionados
        const docentesIds = selectedTeachers.map(t => t.id);
        const disciplinasIds = selectedDisciplines.map(d => d.id);

        try {
            const response = await fetch('/api/nucleos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nucleo: nucleusName,
                    descricao: description,
                    areaId: Number(areaId),
                    facilitadorId: Number(facilitatorId),
                    docentesNomes: selectedTeachers.map(t => t.teacherName), // Envia os NOMES
                    disciplinasNomes: selectedDisciplines.map(d => d.disciplineName), // Envia os NOMES
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `Erro HTTP: ${response.status} - ${JSON.stringify(errorData)}`);
            }

            const data = await response.json();
            console.log("Enviando Area ID:", areaId);
            console.log("Enviando Facilitador ID:", facilitatorId);
            setMessage(`Núcleo "${data.nucleo}" criado com sucesso! ID: ${data.id}`);
            handleCancel();
        } catch (error) {
            console.error('Erro ao criar núcleo:', error);
            setMessage(`Erro ao criar núcleo: ${error.message}`);
        }
    };

    const handleQueryNucleus = async () => {
        setFoundNucleus(null);
        setMessage('');
        if (!queryNucleusId) {
            setMessage('Por favor, insira um ID de núcleo para consultar.');
            return;
        }

        try {
            const response = await fetch(`/api/nucleos/${queryNucleusId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error('Núcleo não encontrado.');
                }
                const errorData = await response.json();
                throw new Error(errorData.message || `Erro HTTP: ${response.status}`);
            }

            const data = await response.json();
            setFoundNucleus(data);
            setMessage(`Núcleo encontrado: "${data.nucleo}"`);
        } catch (error) {
            console.error('Erro ao consultar núcleo:', error);
            setFoundNucleus(null);
            setMessage(`Erro ao consultar núcleo: ${error.message}`);
        }
    };

    const handleCancel = () => {
        setNucleoName('');
        setAreaId('');
        setFacilitatorId('');
        setDescription('');
        setTeacherNameInput(''); // Limpa o input de nome de docente
        setDisciplineNameInput(''); // Limpa o input de nome de disciplina
        setSelectedTeachers([]);
        setSelectedDisciplines([]);
        setMessage('');
        setQueryNucleusId('');
        setFoundNucleus(null);
    };

    return (
        <div className="create-knowledge-nucleus-form">
            <h2>Criar Núcleo de Conhecimento</h2>

            {message && (
                <div className={`form-message ${message.startsWith('Erro') ? 'error' : 'success'}`}>
                    {message}
                </div>
            )}

            <div className="form-section">
                <div className="form-row">
                    <div className="form-field">
                        <label htmlFor="nucleusName">Núcleo</label>
                        <input
                            type="text"
                            id="nucleusName"
                            placeholder="Defina um nome para o núcleo"
                            value={nucleusName}
                            onChange={(e) => setNucleoName(e.target.value)}
                        />
                    </div>
                    <div className="form-field">
                        <label htmlFor="area">Área</label>
                        <SelectField
                            id="area"
                            value={areaId}
                            onChange={(e) => setAreaId(e.target.value)}
                            options={areaOptions}
                        />
                    </div>
                    <div className="form-field">
                        <label htmlFor="facilitator">Facilitador</label>
                        <SelectField
                            id="facilitator"
                            value={facilitatorId}
                            onChange={(e) => setFacilitatorId(e.target.value)}
                            options={facilitatorOptions}
                        />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-field full-width">
                        <label htmlFor="description">Descrição</label>
                        <textarea
                            id="description"
                            placeholder="Descreva detalhes do núcleo"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                    </div>
                </div>
            </div>

            <div className="form-section">
                <h3>Docentes</h3>
                <div className="form-row input-with-button">
                    <div className="form-field flex-grow">
                        <label htmlFor="teacherNameInput">Nome do Docente</label>
                        <input
                            type="text"
                            id="teacherNameInput"
                            placeholder="Digite o nome do Docente"
                            value={teacherNameInput}
                            onChange={(e) => setTeacherNameInput(e.target.value)}
                        />
                    </div>
                    <button className="add-button" onClick={handleAddTeacher}>Adicionar</button>
                </div>
                <DataTable
                    data={selectedTeachers.map(teacher => ({
                        id: teacher.id, // ID temporário
                        teacherName: teacher.teacherName, // Nome do docente
                        actions: (
                            <button className="action-button delete" onClick={() => handleRemoveTeacher(teacher.id)}>Remover</button>
                        )
                    }))}
                    columns={teacherColumns}
                />
            </div>

            <div className="form-section">
                <h3>Disciplinas</h3>
                <div className="form-row input-with-button">
                    <div className="form-field flex-grow">
                        <label htmlFor="disciplineNameInput">Nome da Disciplina</label>
                        <input
                            type="text"
                            id="disciplineNameInput"
                            placeholder="Digite o nome da Disciplina"
                            value={disciplineNameInput}
                            onChange={(e) => setDisciplineNameInput(e.target.value)}                        />
                    </div>
                    <button className="add-button" onClick={handleAddDiscipline}>Adicionar</button>
                </div>
                <DataTable
                    data={selectedDisciplines.map(discipline => ({
                        id: discipline.id, // ID temporário
                        disciplineName: discipline.disciplineName, // Nome da disciplina
                        actions: (
                            <button className="action-button delete" onClick={() => handleRemoveDiscipline(discipline.id)}>Remover</button>
                        )
                    }))}
                    columns={disciplineColumns}
                />
            </div>

            <div className="form-actions">
                <button className="cancel-button" onClick={handleCancel}>Limpar Formulário</button>
                <button className="save-button" onClick={handleCreateNucleus}>Criar Núcleo</button>
            </div>

            <div className="form-section query-section">
                <h3>Consultar Núcleo por ID</h3>
                <div className="form-row input-with-button">
                    <div className="form-field flex-grow">
                        <label htmlFor="queryNucleusId">ID do Núcleo</label>
                        <input
                            type="text"
                            id="queryNucleusId"
                            placeholder="Digite o ID do núcleo"
                            value={queryNucleusId}
                            onChange={(e) => setQueryNucleusId(e.target.value)}
                        />
                    </div>
                    <button className="add-button" onClick={handleQueryNucleus}>Consultar</button>
                </div>
                {foundNucleus && (
                    <div className="found-nucleus-details">
                        <h4>Detalhes do Núcleo:</h4>
                        <p><strong>ID:</strong> {foundNucleus.id}</p>
                        <p><strong>Nome:</strong> {foundNucleus.nucleo}</p>
                        <p><strong>Área:</strong> {foundNucleus.areaNome}</p>
                        <p><strong>Facilitador:</strong> {foundNucleus.facilitadorNome}</p>
                        <p><strong>Descrição:</strong> {foundNucleus.descricao}</p>
                        {foundNucleus.docentesNomes && foundNucleus.docentesNomes.length > 0 && (
                            <>
                                <h5>Docentes:</h5>
                                <ul>
                                    {foundNucleus.docentesNomes.map((nome, index) => (
                                        <li key={index}>{nome}</li>
                                    ))}
                                </ul>
                            </>
                        )}
                        {foundNucleus.disciplinasNomes && foundNucleus.disciplinasNomes.length > 0 && (
                            <>
                                <h5>Disciplinas:</h5>
                                <ul>
                                    {foundNucleus.disciplinasNomes.map((nome, index) => (
                                        <li key={index}>{nome}</li>
                                    ))}
                                </ul>
                            </>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default CreateKnowledgeNucleusForm;