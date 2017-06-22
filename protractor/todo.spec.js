var todoPo = require("./todo.po.js");

describe('todo app', function() {

  beforeEach(function() {
    var urlToNavigate = browser.baseUrl;
    browser.driver.get(urlToNavigate);

  });

  it('verify edit functionality', function() {
    todoPo.enterInputInTextBox("This app is built by angular2");
    todoPo.clickOnButtonAddToDo();
    todoPo.spanText.getAttribute('innerText').then(function(textFromPage) {
      expect(textFromPage).toBe("This app is built by angular2")
    })
    todoPo.clickOnButtonEdit();
    todoPo.inputEditTextBox("This app is built by angular2 or more")
      //expect
  })

  it('verify delete functionality', function() {
    todoPo.enterInputInTextBox("This app is built by angular2");
    todoPo.clickOnButtonAddToDo();
    todoPo.clickOnButtonDeleteSelected();
  })
})