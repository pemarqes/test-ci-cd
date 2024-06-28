const fs = require("fs");

// Caminho para o arquivo JSON ajustado
const filePath = "changed-sources/apexScanResults.json";

// Verificar se o arquivo existe
if (fs.existsSync(filePath)) {
  const jsonData = fs.readFileSync(filePath, "utf8");
  const data = JSON.parse(jsonData);

  // Preparar a estrutura de saída em Markdown
  let markdownContent = "";

  // Iterar sobre cada entrada no JSON
  data.forEach((entry) => {
    const engine = entry.engine;
    const fileName = entry.fileName;

    // Encontrar o índice onde 'force-app' termina no caminho do fileName
    const forceAppIndex = fileName.indexOf("force-app");
    if (forceAppIndex !== -1) {
      // Obter o caminho após 'force-app'
      const pathAfterForceApp = fileName.substring(forceAppIndex);

      // Adicionar cabeçalho com engine e caminho após 'force-app'
      markdownContent += `### Análise Estática de Código - ${engine}\n`;
      markdownContent += `Arquivo: ${pathAfterForceApp}\n\n`;
    } else {
      // Caso 'force-app' não seja encontrado, usar o caminho completo
      markdownContent += `### Análise Estática de Código - ${engine}\n`;
      markdownContent += `Arquivo: ${fileName}\n\n`;
    }

    const violations = entry.violations;

    // Verificar se há violações
    if (violations.length > 0) {
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
    } else {
      markdownContent += "Não foram encontradas violações neste arquivo.\n\n";
    }

    // Adicionar separador entre diferentes entradas, se houver mais de uma
    markdownContent += "---\n\n";
  });

  // Escrever o conteúdo Markdown em um arquivo .md
  fs.writeFileSync("comment.md", markdownContent);
  console.log("Arquivo comment.md gerado com sucesso.");
} else {
  console.error(`Arquivo não encontrado: ${filePath}`);
}
