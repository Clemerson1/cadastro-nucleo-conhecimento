import React from 'react';
import './DataTable.css'; // Estilos específicos para a tabela

function DataTable({ data, columns }) {
    if (!data || data.length === 0) {
        return (
            <div className="no-entries">Nenhuma entrada encontrada</div>
        );
    }

    return (
        <div className="data-table-container">
            <table className="data-table">
                <thead>
                <tr>
                    {columns.map((col, index) => (
                        <th key={index}>{col.header}</th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {data.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        {columns.map((col, colIndex) => (
                            <td key={colIndex}>
                                {col.accessor === 'actions' ? (
                                    // Renderiza botões de ação ou outros elementos customizados
                                    <div className="table-actions">
                                        {/* Exemplo de botão de remover */}
                                        <button className="action-button delete">Remover</button>
                                    </div>
                                ) : (
                                    row[col.accessor]
                                )}
                            </td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
            <div className="pagination">
                <span>Itens por páginas:</span>
                <select>
                    <option>5</option>
                    <option>10</option>
                    <option>20</option>
                </select>
                <span>0-0 de 0</span> {/* Placeholder, precisa de lógica real */}
                <div className="pagination-controls">
                    <button>&lt;&lt;</button>
                    <button>&lt;</button>
                    <button>&gt;</button>
                    <button>&gt;&gt;</button>
                </div>
            </div>
        </div>
    );
}

export default DataTable;