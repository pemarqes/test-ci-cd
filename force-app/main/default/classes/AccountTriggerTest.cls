@isTest
private class AccountTriggerTest {
  // Método de teste para verificar o comportamento da trigger em inserções de Account
  @isTest
  static void testTriggerOnInsert() {
    // Criando uma nova conta para inserir
    Account acc = new Account(Name = 'Test Account', Industry = 'Technology');

    // Inserindo a conta
    insert acc;
    System.debug('ULTIMO TEaaaSTaaaaaaaaEaaaaaaaaaasassaaaaaa');

    // Recuperando a conta inserida do banco de dados
    Account insertedAccount = [
      SELECT Id, Name, Industry
      FROM Account
      WHERE Id = :acc.Id
    ];

    new testClass();
    new Test();

    // Verificando se a trigger atualizou corretamente os campos esperados
    // System.assertEquals('Test Account', insertedAccount.Name);
    // System.assertEquals('Technology', insertedAccount.Industry);

    // Outras asserções podem ser adicionadas conforme necessário para testar a lógica da trigger
    // Exemplo: verificar se outros campos foram preenchidos corretamente após a inserção
  }
}
