describe("Primer test", function () {
  it("Logea exitosamente", function () {
    cy.visit("http://localhost:8080/");
    cy.contains("Ingresar").click();
    cy.url().should("include", "login");
    cy.contains("Recuerdame");
    cy.get(".sign_input_mail").type("cypress@gmail.com");
    cy.get(".sign_input_password").type("123456");
    cy.get(".ingresar-button").click();
    cy.contains("Mi perfil");
  });
  it("Agrega un comentario", function () {
    cy.get(".movieTitle").first().click();
    cy.contains("Reparto");
    const comentario = "Comentario con cypress";
    cy.get(".agregarComentario").type(comentario);
    cy.get(".agregarComentario_btn").click();
    cy.contains(comentario);
  });

  it("Agrega una pelicula a lista", function () {
    cy.get(".cy-agregar").first().click({ force: true });
    cy.contains("Favoritos").click();
  });
});
