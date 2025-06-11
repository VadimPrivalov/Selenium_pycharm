describe('тест', () => {
  it('тест добавления', () => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'constructor.json' });
    cy.visit('http://localhost:4000');
    cy.get('[data-cp=BUNUP]').contains('булочка').should('not.exist');
    cy.get('[data-cp=BUNDOWN]').contains('булочка').should('not.exist');
    cy.get('[data-cp=BUN]').contains('Добавить').click();
    cy.get('[data-cp=BUNUP]').contains('булочка').should('exist');
    cy.get('[data-cp=BUNDOWN]').contains('булочка').should('exist');
  });

  it('тест добавления', () => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'constructor.json' });
    cy.visit('http://localhost:4000');
    cy.get('[data-cp=INGREDIENTS]').should('have.length', 0);
    cy.get('[data-cp=MAIN').contains('Добавить').click();
    cy.get('[data-cp=SAUCE').contains('Добавить').click();
    cy.get('[data-cp=INGREDIENTS]').should('have.length', 1);
  });
});

describe('тест окно', () => {
  it('открыт', () => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'constructor.json' });
    cy.visit('http://localhost:4000');
    cy.get('[data-cp=MODAL]').should('not.exist');
    cy.get('[data-cp=MAIN]').contains('котлета').click();
    cy.get('[data-cp=MODAL]').should('exist');
  });

  it('закрты', () => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'constructor.json' });
    cy.visit('http://localhost:4000');
    cy.get('[data-cp=MAIN]').contains('котлета').click();
    cy.get('[data-cp=MODAL]').should('exist');
    cy.get('[data-cp=CLOSE]').click();
    cy.get('[data-cp=MODAL]').should('not.exist');
  });
});

describe('тест заказ', () => {
  it('заказать', () => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'constructor.json' });
    cy.intercept('GET', '/api/auth/user', { fixture: 'user.json' });
    cy.intercept('POST', '/api/orders', { fixture: 'order.json' });
    cy.visit('http://localhost:4000');
    window.localStorage.setItem('refreshToken', '123');
    cy.setCookie('accessToken', 'qwe');

    cy.get('[data-cp=BUN]').contains('Добавить').click();
    cy.get('[data-cp=MAIN').contains('Добавить').click();
    cy.get('[data-cp=SAUCE').contains('Добавить').click();

    cy.get('[data-cp=BUTTON]').contains('Оформить заказ').click();
    cy.get('[data-cp=ORDERNUM]').contains('1111').should('exist');
    cy.get('[data-cp=CLOSE]').click();
    cy.get('[data-cp=MODAL]').should('not.exist');

    cy.get('[data-cp=BUNUP]').contains('булочка').should('not.exist');
    cy.get('[data-cp=INGREDIENTS]').contains('котлета').should('not.exist');
    cy.get('[data-cp=INGREDIENTS]').contains('соус').should('not.exist');
  });
});
