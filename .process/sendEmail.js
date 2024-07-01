const fs = require("fs");
const nodemailer = require("nodemailer");

// Função para ler o arquivo JSON
function lerArquivoJSON(caminhoArquivo) {
  try {
    const jsonString = fs.readFileSync(caminhoArquivo, "utf8");
    return JSON.parse(jsonString);
  } catch (err) {
    console.error("Erro ao ler o arquivo JSON:", err);
    return null;
  }
}

// Função para enviar email com o Nodemailer
async function enviarEmail(dadosEmail) {
  // Configuração do transporte de email (substitua com seus dados)
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: 587,
    auth: {
      user: "coleman13@ethereal.email",
      pass: "WY116MAvEVHEzqdgbe"
    }
  });
  let emailBody;
  let emailTitle;
  if (dadosEmail.status == 0) {
    emailTitle = "Sucesso na Validação Deploy";
    emailBody = `
      <p>Status: ${dadosEmail.result.status}</p>
      <p>Data de Conclusão: ${dadosEmail.result.completedDate}</p>
      <p>Componentes Deployed: ${dadosEmail.result.numberComponentsDeployed}</p>
      <p>Id Deployed: ${dadosEmail.result.id}</p>
      <p><a href="${process.env.INSTANCE_URL}/lightning/setup/DeployStatus/page?address=/changemgmt/monitorDeploymentsDetails.apexp?asyncId=${dadosEmail.result.id}&retURL=%2Fchangemgmt%2FmonitorDeployment.apexp"> Abrir Detalhes </a></p>
    `;
  } else {
    emailTitle = "Erro na Validação Deploy";
    emailBody = `
    <p>Status: Falha</p>
    <p>Mensagem: ${dadosEmail.message}</p>
    <p>Id Deployed: ${dadosEmail.data.deployId}</p>
      <p><a href="${process.env.INSTANCE_URL}/lightning/setup/DeployStatus/page?address=/changemgmt/monitorDeploymentsDetails.apexp?asyncId=${dadosEmail.data.deployId}&retURL=%2Fchangemgmt%2FmonitorDeployment.apexp"> Abrir Detalhes </a></p>

    `;
  }

  // Opções do email
  let mailOptions = {
    from: "pedro.marques@beecloud.com",
    to: "pedro.marques@beecloud.com",
    subject: emailTitle,
    html: emailBody,
    attachments: [
      {
        filename: "deploy.json",
        content: fs.readFileSync(caminhoArquivoJSON, "utf8")
      }
    ]
  };

  // Enviar email
  try {
    let info = await transporter.sendMail(mailOptions);
    console.log("Email enviado:", info.response);
  } catch (err) {
    console.error("Erro ao enviar email:", err);
  }
}

console.log(process.env.INSTANCE_URL)

// Caminho para o arquivo JSON
const caminhoArquivoJSON = "deploy.json";

// Ler o arquivo JSON
const dados = lerArquivoJSON(caminhoArquivoJSON);

// Verificar se foi possível ler o arquivo e enviar o email
if (dados) {
  enviarEmail(dados);
}
