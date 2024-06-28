const fs = require('fs');

// Caminho para o arquivo JSON ajustado
const filePath = 'changed-sources/apexScanResults.json';

// Verificar se o arquivo existe
if (fs.existsSync(filePath)) {
    const jsonData = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(jsonData);

    // Preparar a estrutura de saída em Markdown
    let markdownContent = "";

    // Iterar sobre cada entrada no JSON
    data.forEach(entry => {
        const violations = entry.violations;

        // Sumário das violações
        markdownContent += "### Análise Estática de Código\n";
        markdownContent += `Encontramos ${violations.length} violações de boas práticas e desempenho no seu código.\n`;

        // Detalhes das violações
        markdownContent += "#### Detalhes das Violações:\n";
        violations.forEach((violation, index) => {
            markdownContent += `${index + 1}. **Regra:** ${violation.ruleName}\n`;
            markdownContent += `   - **Severidade:** ${violation.severity}\n`;
            markdownContent += `   - **Categoria:** ${violation.category}\n`;
            markdownContent += `   - **Descrição:** ${violation.message.trim()}\n`;
            markdownContent += `   - **Localização:** Linha ${violation.line}, Coluna ${violation.column} até Linha ${violation.endLine}, Coluna ${violation.endColumn}\n`;
            markdownContent += `   - **[Link para Documentação](${violation.url})**\n\n`;
        });
    });

    // Escrever o conteúdo Markdown em um arquivo .md
    fs.writeFileSync('comment.md', markdownContent);
    console.log('Arquivo report.md gerado com sucesso.');

} else {
    console.error(`Arquivo não encontrado: ${filePath}`);
}
