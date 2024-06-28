const fs = require("fs");

const filePath = "changed-sources/apexScanResults.json";

if (fs.existsSync(filePath)) {
  const jsonData = fs.readFileSync(filePath, "utf8");
  const data = JSON.parse(jsonData);

  let markdownContent = "";

  // Iterar sobre cada entrada no JSON
  data.forEach((entry) => {
    const engine = entry.engine;
    const fileName = entry.fileName;

    const forceAppIndex = fileName.indexOf("force-app");
    if (forceAppIndex !== -1) {
      const pathAfterForceApp = fileName.substring(forceAppIndex);

      markdownContent += `### Análise Estática de Código - ${engine}\n`;
      markdownContent += `Arquivo: ${pathAfterForceApp}\n\n`;
    } else {
      markdownContent += `### Análise Estática de Código - ${engine}\n`;
      markdownContent += `Arquivo: ${fileName}\n\n`;
    }

    const violations = entry.violations;

    if (violations.length > 0) {
      markdownContent += "#### Detalhes das Violações:\n";
      violations.forEach((violation, index) => {
        markdownContent += `${index + 1}. **Regra:** ${violation.ruleName}\n`;
        markdownContent += `   - **Gravidade:** ${violation.severity}\n`;
        markdownContent += `   - **Categoria:** ${violation.category}\n`;
        markdownContent += `   - **Descrição:** ${violation.message.trim()}\n`;
        markdownContent += `   - **Localização:** Linha ${violation.line}, Coluna ${violation.column} até Linha ${violation.endLine}, Coluna ${violation.endColumn}\n`;
        markdownContent += `   - **[Link para Documentação](https://external.ink?to=/${violation.url})**\n\n`;
      });
    } else {
      markdownContent += "Não foram encontradas violações neste arquivo.\n\n";
    }

    // Adicionar separador entre diferentes entradas, se houver mais de uma
    markdownContent += "---\n\n";
  });

  // Escrever o conteúdo Markdown em um arquivo .md
  fs.writeFileSync("comment.md", markdownContent);
} else {
  console.error(`Arquivo não encontrado: ${filePath}`);
}
