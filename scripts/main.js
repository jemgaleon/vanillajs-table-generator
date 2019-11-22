const btnGenerate = document.getElementById("btnGenerate");
btnGenerate.addEventListener("click", fetchData);

/**
 * Requests from the entered URI.
 * @param {Object} e Bounded element
 */
function fetchData(e) { 
  const txtURI = document.getElementById("txtURI");
  const uri = txtURI.value;
  
  fetch(uri)
  .then(response => response.json())
  .then(data => GenerateTable(data));
}

/**
 * Constructs the table dynamically.
 * @param {Object} rawData JSON Object
 */
function GenerateTable(rawData) {
  const data = Object.values(rawData);
  const fields = Object.keys(data[0]);
  const tableArea = document.getElementById("tableArea");
  const table = document.createElement("table");
  const thead = createTableHeader(fields);
  const tbody = createTableBody(data);

  table.appendChild(thead);
  table.appendChild(tbody);
  tableArea.innerHTML = ""; // clear first
  tableArea.appendChild(table);
}

/**
 * Constructs the table header.
 * @param {Object} fields Field names.
 */
function createTableHeader(fields) {
  const thead = document.createElement("thead");

  fields.forEach((field, index) => {
    // if (index === 0) // skip assumed pk
    //   return;

    const name = field[0].toUpperCase() + field.substr(1).toLowerCase();
    const th = document.createElement("th");

    th.appendChild(document.createTextNode(name));
    thead.appendChild(th);
  });

  return thead;
}

/**
 * Constructs the table body.
 * @param {Object} rawData Field values.
 */
function createTableBody(rawData) {
  const tbody = document.createElement("tbody");

  rawData.forEach((data, index) => {
    const tr = createTableRow(data, index);

    tbody.appendChild(tr);
  });

  return tbody;
}

/**
 * Constructs the table rows
 * @param {Object} rawData Row values.
 * @param {*} rowIndex 
 */
function createTableRow(rawData, rowIndex) {
  const tr = document.createElement("tr");
  const handleSelectRow = function (e) {
    const rows = document.getElementsByTagName("tr");
    const row = e.currentTarget;

    for (let row of rows)
      row.className = "";

    row.className = "selected";
  }

  Object.values(rawData).forEach((data, index) => {
    // if (index === 0) // skip assumed pk
    //     return;

    const td = createTableCell(data);

    tr.appendChild(td);
  });

  tr.key = rowIndex;
  tr.addEventListener("click", handleSelectRow);

  return tr;
}

/**
 * Constructs the row cells.
 * @param {Object} rawData Cell values
 */
function createTableCell(rawData) {
  const td = document.createElement("td");

  if (typeof rawData === "object") {
    const arrData = Object.values(rawData)
      .filter(objData => {
        return typeof objData !== "object";
      })
      .flat();
    const strData = arrData.join(", ");

    td.appendChild(document.createTextNode(strData));
    td.title = strData;
  } else {
    td.appendChild(document.createTextNode(rawData));
    td.title = rawData;
  }

  return td;
}