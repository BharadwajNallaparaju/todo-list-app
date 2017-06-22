var EC = protractor.ExpectedConditions;

var todo = {
  inputTextBox: element(by.xpath("//input [@name = 'newTodo']")),
  btnAddTodo: element(by.xpath("//button[@type = 'submit']")),
  btnDeleteSelected: element(by.xpath("//div[@class = 'mtop20']/button")),
  btnEdit: element(by.xpath("//button[@class = 'valign-middle editbutton']")),
  btnDelete: element(by.xpath("//button[@class = 'delete-icon valign-middle delete']")),
  btnUpdate: element(by.xpath("//button[@class = 'valign-middle update']")),
  inputCheckBox: element(by.xpath("//input [@type = 'checkbox']")),
  inputEditTextBox: element(by.xpath("//input [@type = 'text']")),
  spanText: element(by.xpath("//li//span")),


  enterInputInTextBox: function(input) {
    var myThis = this;
    myThis.inputTextBox.click().clear().sendKeys(input);

  },


  clickOnButtonAddToDo: function() {
    var myThis = this;
    myThis.btnAddTodo.click();
  },

  clickOnButtonDeleteSelected: function() {
    var myThis = this;
    myThis.btnDeleteSelected.click();
  },

  clickOnButtonEdit: function() {
    var myThis = this;
    myThis.btnEdit.click();
  },

  clickOnButtonDelete: function() {
    var myThis = this;
    myThis.btnDelete.click();
  },


  clickOnButtonUpdate: function() {
    var myThis = this;
    myThis.btnUpdate.click();
  }
};

module.exports = todo;