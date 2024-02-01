// Script for the form validation
// Declaration area

// Variables for the form
const form = document.getElementById("form");
const username = document.getElementById("username");
const contact = document.getElementById("mobileNumber");
const email = document.getElementById("email");
const select = document.getElementById("select");
const file = document.getElementById("myfile");
const textArea = document.getElementById("floatingTextarea");
const terms = document.getElementById("checkbox");

// Variables for the table
const table = document.getElementById("dataTable");
const resetBtn = document.getElementById("reset");
// Regular Expression for the Email Id
String.prototype.isEmail = function () {
  return !!this.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/);
};

// Regular Expression for the Alphabet
String.prototype.isAlpha = function () {
  return !!this.match(/^[a-zA-Z\s]+$/);
};

// Regular Expression for the Mobile Number
String.prototype.isMobileNumber = function () {
  return !!this.match(/^\d{10}$/);
};

function checkRequired(inputs) {
  let isFormValid = true; // Setting the variable to pretend the submission if there is error

  inputs.forEach((input) => {
    if (input.tagName === "INPUT" && input.type === "file") {
      if (input.files.length === 0) {
        isFormValid = false;
        errorInput(input, `image is required`);
      } else if (input.files[0].size > 5242880) {
        isFormValid = false;
        alert("File is too large!");
        input.value = "";
      } else {
        successInput(input);
      }
    } else if (input.type === "checkbox") {
      if (!input.checked) {
        isFormValid = false;
        errorInput(input, `${getName(input)} Must be checked`);
      } else {
        successInput(input);
      }
    } else if (input.value.trim() === "") {
      isFormValid = false;
      // Error message
      errorInput(input, `${getName(input)} is Required`);
    } else {
      // Success message
      successInput(input);
    }
  });
  return isFormValid;
}

// Function for getting the name to display next to the error message
function getName(input) {
  return input.getAttribute("data-name");
}

// Function for the error
function errorInput(input, message) {
  const formGroup = input.parentElement;
  formGroup.className = "form-group error";
  let p = formGroup.querySelector("p");
  if (!p) {
    p = document.createElement("p");
    formGroup.appendChild(p);
  }
  p.innerHTML = message;
}

// Function for the success
function successInput(input) {
  const formGroup = input.parentElement;
  formGroup.className = "form-group success";
  let p = formGroup.querySelector("p");
  if (!p) {
    p = document.createElement("p");
    formGroup.appendChild(p);
  }
  p.innerHTML = "";
}

// Function for the length checking
function checkLength(input, min, max) {
  const data = input.value.trim().length;

  if (data < min) {
    errorInput(
      input,
      `${getName(input)} must be atleast greater than ${min} characters`
    );
  } else if (data > max) {
    errorInput(
      input,
      `${getName(input)} must be atleast lesser than ${max} characters`
    );
  } else {
    successInput(input);
  }
}

// Function to check is that the input is Email ID
function checkEmail(input) {
  if (!input.value.trim().isEmail()) {
    errorInput(input, `This is not a valid email address`);
  }
}

// Function to check is that the input is Alphabets
function checkAlpha(input) {
  if (!input.value.trim().isAlpha()) {
    errorInput(input, `${getName(input)} Must be Alphabets`);
  }
}

// Function to check that is the input is Numbers
function checkNumbers(input) {
  if (input.value.trim().length !== 10) {
    errorInput(input, `Must be exactly 10 numbers`);
  } else if (!input.value.trim().isMobileNumber()) {
    errorInput(
      input,
      `This is not a valid mobile number. Please enter a 10-digit mobile number.`
    );
  } else {
    successInput(input);
  }
}

function updateOnTable() {
  //Getting values for the table
  const name = username.value;
  const mobile = contact.value;
  const mail = email.value;
  const text = textArea.value;
  let imageUrl;

  // Updating values on the table
  const newRow = table.insertRow(table.rows.length);
  newRow.insertCell(0).innerHTML = name;
  newRow.insertCell(1).innerHTML = mobile;
  newRow.insertCell(2).innerHTML = mail;
  newRow.insertCell(3).innerHTML = text;

  // For the image updating on the cell(4)
  // Getting the value of image
  const selectedFile = file.files[0];
  // Updating the value in table
  if (selectedFile) {
    imageUrl = URL.createObjectURL(selectedFile);
    // outputImg.src = imageUrl;'

    // Declaring the image tag
    const imageTag = `<img class="output-img" src="${imageUrl}" alt="uploaded-img" />`;

    newRow.insertCell(4).innerHTML = imageTag;
  } else {
    // outputImg.src = "";
    newRow.insertCell(4).innerHTML = "";
    console.log("No image here");
  }

  const actionBtn =
    `<button class="small-btn edit-btn" onclick="editData(this)">EDIT</button>` +
    `<button class="small-btn delete-btn" onclick="deleteData(this)">DELETE</button>`;
  newRow.insertCell(5).innerHTML = actionBtn;
}

function editData(button) {
  // Get the parent row of the clicked button
  let row = button.parentNode.parentNode;

  // Get the cells within the row
  let nameCell = row.cells[0];
  let mobileCell = row.cells[1];
  let mailCell = row.cells[2];
  let textCell = row.cells[3];

  // Prompt the user to enter the values
  let nameInput = prompt("Enter the updated name:", nameCell.innerHTML);
  let mobileInput = prompt("Enter the updated email:", mobileCell.innerHTML);
  let mailInput = prompt("Enter the updated mail:", mailCell.innerHTML);
  let textInput = prompt("Enter the updated review", textCell.innerHTML);

  // Update the cell with the new values
  nameCell.innerHTML = nameInput;
  mobileCell.innerHTML = mobileInput;
  mailCell.innerHTML = mailInput;
  textCell.innerHTML = textInput;
}

function deleteData(button) {
  // Get the parent row of the clicked button
  let row = button.parentNode.parentNode;
  //  Remove the row from the table
  row.parentNode.removeChild(row);
}

resetBtn.addEventListener("click", function () {
  // Clear the all data
  username.value = "";
  email.value = "";
  contact.value = "";
  select.value = "";
  file.value = "";
  textArea.value = "";
  terms.checked = false;

  // Remove all the elements on the row
  const rowCount = table.rows.length;
  for (let i = rowCount - 1; i > 0; i--) {
    table.deleteRow(i);
  }
});

// Function to reset the state after the submission
// Function to reset the form state
function resetFormState() {
  // Clear the form values
  username.value = "";
  email.value = "";
  contact.value = "";
  select.value = "";
  file.value = "";
  textArea.value = "";
  terms.checked = false;

  // Remove error/success classes and messages
  const formGroups = document.querySelectorAll(".form-group");
  formGroups.forEach((formGroup) => {
    formGroup.className = "form-group";
    const p = formGroup.querySelector("p");
    if (p) {
      p.innerHTML = "";
    }
  });
}

form.addEventListener("submit", function (e) {
  // Preventing the default event
  e.preventDefault();

  // Conditions for the inputs
  let isFormValid = checkRequired([
    username,
    email,
    contact,
    select,
    file,
    textArea,
    terms,
  ]);
  checkLength(contact);
  checkLength(textArea, 20, 50);

  // Verification for the input elements
  checkAlpha(username);
  checkEmail(email);
  checkNumbers(contact);

  if (isFormValid) {
    updateOnTable(username, contact, email, textArea, file);

    setTimeout(() => {
      // Clearing the all data
      username.value = "";
      email.value = "";
      contact.value = "";
      select.value = "";
      file.value = "";
      textArea.value = "";
      terms.checked = false;

      resetFormState();
    }, 5000);
  }
});

// Function for the Edit button
