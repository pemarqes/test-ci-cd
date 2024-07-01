const fs = require("fs");
const nodemailer = require("nodemailer");

// Função para ler o arquivo de deploy
function lerArquivoDeploy(caminhoArquivo) {
  try {
    return fs.readFileSync(caminhoArquivo, "utf8");
  } catch (err) {
    console.error("Erro ao ler o arquivo de deploy:", err);
    return null;
  }
}

// Função para enviar email com o Nodemailer
async function enviarEmail(dadosEmail, caminhoArquivo) {
  // Configuração do transporte de email
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: "coleman13@ethereal.email",
      pass: "WY116MAvEVHEzqdgbe"
    }
  });

  // Corpo do email
  let emailBody = `
    <h2>Validação Deploy</h2>
    <p>Status: ${dadosEmail.result.status}</p>
    <p>Data de Conclusão: ${dadosEmail.result.completedDate}</p>
    <p>Componentes Deployed: ${dadosEmail.result.numberComponentsDeployed}</p>
    <p>Id Deployed: ${dadosEmail.result.id}</p>
  `;

  // Opções do email
  let mailOptions = {
    from: "pedro.marques@beecloud.com",
    to: "pedro.marques@beecloud.com",
    subject: "Validação Deploy",
    html: emailBody,
    attachments: [
      {
        filename: "deploy.js",
        content: lerArquivoDeploy(caminhoArquivo)
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

// Caminho para o arquivo JSON (dados do deploy)
const caminhoArquivoJSON = "deploy.json";

// Ler o arquivo JSON com os dados do deploy
const dados = lerArquivoJSON(caminhoArquivoJSON);

// Caminho para o arquivo de deploy.js
const caminhoArquivoDeploy = "deploy.js";

// Verificar se foi possível ler o arquivo de deploy.js e enviar o email
if (dados && lerArquivoDeploy(caminhoArquivoDeploy)) {
  enviarEmail(dados, caminhoArquivoDeploy);
} else {
  console.error("Não foi possível enviar o email com o anexo do arquivo de deploy.js.");
}
