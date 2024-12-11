describe('TODOMvc App', () => {
  it('Verifica se app está abrindo', () => {
    cy.visit('')
  })

  it('Insere uma tarefa', () => {
    cy.visit(''); 

    cy.get('[data-cy=todo-input]')
      .type('TP2 de Engenharia de Software{enter}');

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1) 
      .first()
      .should('have.text', 'TP2 de Engenharia de Software'); 
  });

  it('Insere e deleta uma tarefa', () => {
    cy.visit('');

    cy.get('[data-cy=todo-input]')
      .type('TP2 de Engenharia de Software{enter}');

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1);

    cy.get('[data-cy=todos-list] > li [data-cy=remove-todo-btn]')
      .invoke('show')
      .click();

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 0);
  });

  it('Filtra tarefas completas e ativas', () => {
    cy.visit(''); 

    cy.get('[data-cy=todo-input]')
      .type('TP2 de ES{enter}')
      .type('Prova de ES{enter}');

    cy.get('[data-cy=todos-list] > li [data-cy=toggle-todo-checkbox]')
      .first()
      .click();

    cy.get('[data-cy=filter-active-link')
      .click();
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1)
      .first()
      .should('have.text', 'Prova de ES');

    cy.get('[data-cy=filter-completed-link')
      .click();
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1)
      .first()
      .should('have.text', 'TP2 de ES');

    cy.get('[data-cy=filter-all-link')
      .click();
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 2);
  });

  // Novos testes criados

  it('Edição de uma Tarefa', () => {
    cy.visit('');

    //Crio uma tarefa
    cy.get('[data-cy=todo-input]')
      .type('TP2 de Pesquisa Operacional{enter}');

    //Confiro dados da tarefa
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1)
      .first()
      .should('have.text', 'TP2 de Pesquisa Operacional')

    //Edito a tarefa dando double-click
    cy.get('[data-cy=todos-list]')
      .first()
      .dblclick()
      .type('{selectAll}{del}TP2 de Engenharia de Software{enter}');

    //Confiro os novos dados
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1)
      .first()
      .should('have.text', 'TP2 de Engenharia de Software')
  });

  it('Limpeza de Tarefas Completas', () =>{
    cy.visit('')

    //Crio 5 novas tarefas
    cy.get('[data-cy=todo-input]')
      .type('Parte 1: Testes Unidade{enter}');

    cy.get('[data-cy=todo-input]')
      .type('Parte 2: Debugar Biblioteca{enter}');

    cy.get('[data-cy=todo-input]')
      .type('Parte 3: Cobertura de Testes de Sistema{enter}');

    cy.get('[data-cy=todo-input]')
      .type('Parte 4: Testes E2E{enter}');

    cy.get('[data-cy=todo-input]')
      .type('Parte 5: Roteiro CI{enter}');

    //Confiro a contagem
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 5)

    //Completo as 3 primeiras tarefas
    cy.get('[data-cy=todos-list] > li [data-cy=toggle-todo-checkbox]')
      .filter((index,el) => index < 3)
      .click( {multiple: true} );

    //Uso o botão de apagar completas
    cy.get('[class=clear-completed]')
      .click()

    // Confiro o comportamento das restantes
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 2)
      .first()
      .should('have.text', 'Parte 4: Testes E2E')
      .next()
      .should('have.text', 'Parte 5: Roteiro CI');      
  });

  it('Botão que completa todas as tarefas', () => {
    cy.visit('')

    //Crio 5 novas tarefas
    cy.get('[data-cy=todo-input]')
      .type('Parte 1: Testes Unidade{enter}');

    cy.get('[data-cy=todo-input]')
      .type('Parte 2: Debugar Biblioteca{enter}');

    cy.get('[data-cy=todo-input]')
      .type('Parte 3: Cobertura de Testes de Sistema{enter}');

    cy.get('[data-cy=todo-input]')
      .type('Parte 4: Testes E2E{enter}');

    cy.get('[data-cy=todo-input]')
      .type('Parte 5: Roteiro CI{enter}');

    //Clico na opção de marcar todos
    cy.get('[class=toggle-all-label]')
      .click();

    // Itero pela lista checando se todos estão completas
    cy.get('[data-cy=todos-list] > li')
      .should('have.length', 5)
      .each( ($li) => {
        cy.wrap($li)
          .should('have.class', 'completed')
        })

  });

});