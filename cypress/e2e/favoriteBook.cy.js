const bookFirst = {
  title: "Сказки старого Вильнюса",
  description:
    "Главное - поменьше говорить. И тогда собеседник сам придумает способ все себе рационально объяснить. По крайней мере, я до сих пор не встречал такого, кто бы не справился. Люди - очень талантливые. Очень.",
  author: "Макс Фрай",
};

const bookSecond = {
  title: "Кэрри",
  description:
    "Люди не становятся лучше – только умнее. Они не перестают отрывать мухам крылышки, а лишь только придумывают себе гораздо более убедительные оправдания.",
  author: "Стивен Кинг",
};

const bookThird = {
  title: "Любовник смерти",
  description:
    "Уважай всякого человека по всей силе возможности, пока этот человек тебе не показал, что твоего уважения не достоин.",
  author: "Борис Акунин",
};

describe("Favorite book spec", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.login("test@test.com", "test");
  });

  // it("Valid login", () => {
  //   cy.contains("test@test.com").should("be.visible");
  //   cy.contains("Add new").should("have.class", "btn");
  // });

  it("Should add new book", () => {
    cy.addBook(bookFirst);
    cy.get(".card-title").should("contain.text", bookFirst.title);
  });

  it("Should add new book to favorite", () => {
    cy.addFavoriteBook(bookSecond);
    cy.visit("/favorites");
    cy.get(".card-title").should("contain.text", bookSecond.title);
  });

  it("Should add book to favorite through 'Book list' page", () => {
    cy.addBookNoFavorite(bookFirst);
    cy.contains(bookFirst.title)
      .should("be.visible")
      .within(() => cy.get(".card-footer > .btn").click({ force: true }));
    cy.visit("/favorites");
    cy.contains(bookFirst.title).should("be.visible");
  });

  it("Should delete book from favorite", () => {
    cy.visit("/favorites");
    cy.contains(bookSecond.title)
      .should("be.visible")
      .within(() => cy.get(".card-footer > .btn").click({ force: true }));
    cy.contains(bookSecond.title).should("not.exist");
  });
});