trigger AccountTrigger on Account(before insert) {
  if (Trigger.isBefore && Trigger.isInsert) {
    System.debug('Entrou aqui com Murilo cdasdasdccaaaaaaaa  caaaa   aa');
  }

}
