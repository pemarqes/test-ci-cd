const fs = require("fs");
const sendEmail = require("./send_email");

const caminhoArquivoJSON = "deploy.json";

const data = lerArquivoJSON(caminhoArquivoJSON);

if (data) {
  enviarEmail(data);
}

function lerArquivoJSON(caminhoArquivo) {
  try {
    const jsonString = fs.readFileSync(caminhoArquivo, "utf8");
    return JSON.parse(jsonString);
  } catch (err) {
    console.error("Erro ao ler o arquivo JSON:", err);
    return null;
  }
}

function enviarEmail(data) {
  let emailBody;
  let emailTitle;
  if (data.status == 0) {
    emailTitle = "Sucesso na Validação Deploy";
    emailBody = `
        <p>Status: ${data.result.status}</p>
        <p>Data de Conclusão: ${data.result.completedDate}</p>
        <p>Componentes Deployed: ${data.result.numberComponentsDeployed}</p>
        <p>Id Deployed: ${data.result.id}</p>
        <p><a href="${process.env.INSTANCE_URL}/lightning/setup/DeployStatus/page?address=/changemgmt/monitorDeploymentsDetails.apexp?asyncId=${data.result.id}&retURL=%2Fchangemgmt%2FmonitorDeployment.apexp"> Abrir Detalhes </a></p>
      `;
  } else {
    emailTitle = "Erro na Validação Deploy";
    emailBody = `
      <p>Status: Falha</p>
      <p>Mensagem: ${data.message}</p>
      <p>Id Deployed: ${data.data.deployId}</p>
        <p><a href="${process.env.INSTANCE_URL}/lightning/setup/DeployStatus/page?address=/changemgmt/monitorDeploymentsDetails.apexp?asyncId=${data.data.deployId}&retURL=%2Fchangemgmt%2FmonitorDeployment.apexp"> Abrir Detalhes </a></p>
  
      `;
  }

  let attachments = [
    {
      filename: "deploy.json",
      content: fs.readFileSync(caminhoArquivoJSON, "utf8")
    }
  ];

  sendEmail(emailTitle, emailBody, attachments);
}
