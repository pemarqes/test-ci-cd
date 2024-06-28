### Análise Estática de Código - pmd
Arquivo: force-app\main\default\classes\AccountTriggerTest.cls

#### Detalhes das Violações:
1. **Regra:** ApexUnitTestClassShouldHaveAsserts
   - **Severidade:** 3
   - **Categoria:** Best Practices
   - **Descrição:** Apex unit tests should System.assert() or assertEquals() or assertNotEquals()
   - **Localização:** Linha 5, Coluna 10 até Linha 28, Coluna 4
   - **[Link para Documentação](https://docs.pmd-code.org/pmd-doc-7.2.0/pmd_rules_apex_bestpractices.html#apexunittestclassshouldhaveasserts)**

2. **Regra:** AvoidDebugStatements
   - **Severidade:** 3
   - **Categoria:** Performance
   - **Descrição:** Avoid debug statements since they impact on performance
   - **Localização:** Linha 11, Coluna 5 até Linha 11, Coluna 78
   - **[Link para Documentação](https://docs.pmd-code.org/pmd-doc-7.2.0/pmd_rules_apex_performance.html#avoiddebugstatements)**

3. **Regra:** DebugsShouldUseLoggingLevel
   - **Severidade:** 3
   - **Categoria:** Best Practices
   - **Descrição:** Calls to System.debug should specify a logging level.
   - **Localização:** Linha 11, Coluna 5 até Linha 11, Coluna 78
   - **[Link para Documentação](https://docs.pmd-code.org/pmd-doc-7.2.0/pmd_rules_apex_bestpractices.html#debugsshoulduselogginglevel)**

4. **Regra:** UnusedLocalVariable
   - **Severidade:** 5
   - **Categoria:** Best Practices
   - **Descrição:** Variable 'insertedAccount' defined but not used
   - **Localização:** Linha 14, Coluna 13 até Linha 18, Coluna 6
   - **[Link para Documentação](https://docs.pmd-code.org/pmd-doc-7.2.0/pmd_rules_apex_bestpractices.html#unusedlocalvariable)**

---

### Análise Estática de Código - pmd
Arquivo: force-app\main\default\triggers\AccountTrigger.trigger

#### Detalhes das Violações:
1. **Regra:** AvoidLogicInTrigger
   - **Severidade:** 3
   - **Categoria:** Best Practices
   - **Descrição:** Avoid logic in triggers
   - **Localização:** Linha 1, Coluna 1 até Linha 6, Coluna 3
   - **[Link para Documentação](https://docs.pmd-code.org/pmd-doc-7.2.0/pmd_rules_apex_bestpractices.html#avoidlogicintrigger)**

2. **Regra:** AvoidDebugStatements
   - **Severidade:** 3
   - **Categoria:** Performance
   - **Descrição:** Avoid debug statements since they impact on performance
   - **Localização:** Linha 3, Coluna 5 até Linha 3, Coluna 98
   - **[Link para Documentação](https://docs.pmd-code.org/pmd-doc-7.2.0/pmd_rules_apex_performance.html#avoiddebugstatements)**

3. **Regra:** DebugsShouldUseLoggingLevel
   - **Severidade:** 3
   - **Categoria:** Best Practices
   - **Descrição:** Calls to System.debug should specify a logging level.
   - **Localização:** Linha 3, Coluna 5 até Linha 3, Coluna 98
   - **[Link para Documentação](https://docs.pmd-code.org/pmd-doc-7.2.0/pmd_rules_apex_bestpractices.html#debugsshoulduselogginglevel)**

---

