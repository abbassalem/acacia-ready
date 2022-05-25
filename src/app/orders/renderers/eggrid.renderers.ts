
export function CheckboxRenderer() {}

CheckboxRenderer.prototype.init = function(params) {
  this.params = params;

  this.eGui = document.createElement('input');
  this.eGui.type = 'checkbox';
  this.eGui.checked = params.value;
  this.eGui.disabled = true;

  this.checkedHandler = this.checkedHandler.bind(this);
//   this.eGui.addEventListener('click', this.checkedHandler);
}

CheckboxRenderer.prototype.checkedHandler = function(e) {
  let checked = e.target.checked;
  let colId = this.params.column.colId;
//   this.params.node.setDataValue(colId, checked);
}

CheckboxRenderer.prototype.getGui = function(params) {
  return this.eGui;
}

CheckboxRenderer.prototype.destroy = function(params) {
  this.eGui.removeEventListener('click', this.checkedHandler);
}

export function ButtonRenderer() {}

ButtonRenderer.prototype.init = function(params) {
  this.params = params;

  this.eGui = document.createElement('input');
  this.eGui.type = 'button';
  this.eGui.value = 'Show User';
  this.eGui.disabled = false;
  this.eGui.addEventListener('click', this.buttonHandler);
  this.buttonHandler = this.buttonHandler.bind(this);
}

ButtonRenderer.prototype.buttonHandler = function(e) {
  console.log('inside buttonrenderer handler');
  let cllick = e.target.click;
  let colId = this.params.column.colId;
  this.params.columnDefs['orderUser.displayName'].hide = false;
  this.params.columnDefs['orderUser.phoneNumber'].hide = false;
  // alert('clicked on : ' + colId);
 //this.params.node.setDataValue(colId, checked);
}
