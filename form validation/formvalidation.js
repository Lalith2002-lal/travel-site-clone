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
const fileInput = document.getElementById("myfile");

// Variables for the table
const table = document.getElementById("dataTable");
const resetBtn = document.getElementById("reset");

// Declaring the size for the image by variable
const desiredHeight = 150;
const desiredWidth = 100;

// Reset button functionality
resetBtn.addEventListener("click", function () {
  location.reload();
});

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
  let isFormValid = true; // Setting the variable to pretend the submission if there is an error

  inputs.forEach((input) => {
    // First
    if (input.value.trim() === "") {
      isFormValid = false;
      // Error message
      errorInput(input, `${getName(input)} is Required`);
    } else if (input.tagName === "INPUT" && input.type === "file") {
      // Second
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
      // Last
      if (!input.checked) {
        isFormValid = false;
        errorInput(input, `${getName(input)} Must be checked`);
      } else {
        successInput(input);
      }
    } else {
      // Success message for other input types
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
      `${getName(input)} must be at least greater than ${min} characters`
    );
  } else if (data > max) {
    errorInput(
      input,
      `${getName(input)} must be at least lesser than ${max} characters`
    );
  } else {
    successInput(input);
  }
}

// Function to check is that the input is Email ID
function checkEmail(input) {
  const content = input.value.trim();
  const isValid = input.value.trim().isEmail;

  if (!isValid) {
    errorInput(input, `This is not a valid email address`);
  } else if (content.length === 0) {
    errorInput(input, "Enter your email address");
  } else {
    successInput(input);
  }

  return isValid;
}

// Function to check is that the input is Alphabets
function checkAlpha(input) {
  const isValid = input.value.trim().isAlpha();

  if (!isValid) {
    errorInput(input, `${getName(input)} Must be Alphabets`);
  } else {
    successInput(input);
  }
  return isValid;
}

// Function to check that is the input is Numbers
function checkNumbers(input) {
  const trimmedValue = input.value.trim();
  const isValid = trimmedValue.match(/^\d{10}$/) && trimmedValue.length === 10;

  if (!isValid) {
    errorInput(input, `Please enter a valid 10-digit mobile number.`);
  } else {
    successInput(input);
  }

  return isValid;
}

// Adding class to the td

function updateOnTable() {
  //Getting values for the table
  const name = username.value;
  const mobile = contact.value;
  const mail = email.value;
  const text = textArea.value;
  const option = select.value;
  let imageUrl;

  // Getting the value of image
  const selectedFile = file.files[0];

  // URL passing
  if (selectedFile) {
    imageUrl = URL.createObjectURL(selectedFile);
  } else {
    imageUrl = file.value;
  }

  // Updating values on the table
  const newRow = table.insertRow(table.rows.length);
  newRow.insertCell(0).innerHTML = name;
  newRow.insertCell(1).innerHTML = mobile;
  newRow.insertCell(2).innerHTML = mail;
  newRow.insertCell(3).innerHTML = text;
  newRow.insertCell(4).innerHTML = option;

  // For the image updating on the cell(4)

  // Updating the value in table
  if (selectedFile) {
    imageUrl = URL.createObjectURL(selectedFile);
    // outputImg.src = imageUrl;'

    // Declaring the image tag
    const imageTag = `<img class="output-img" src="${imageUrl}" alt="uploaded-img" width ="${desiredWidth}" height="${desiredHeight}" />`;
    newRow.insertCell(4).innerHTML = imageTag;
  } else {
    // outputImg.src = "";
    newRow.insertCell(5).innerHTML = "";
    console.log("No image here");
  }
  // Adding the class to all td elements in the row
  const tdElements = newRow.getElementsByTagName("td");
  for (let i = 0; i < tdElements.length; i++) {
    tdElements[i].classList.add("table-data");
  }

  const actionBtn =
    `<button class="small-btn edit-btn" onclick="editData(this)">EDIT</button>` +
    `<button class="small-btn delete-btn" onclick="deleteData(this)">DELETE</button>`;
  newRow.insertCell(6).innerHTML = actionBtn;
}

let isEditing = false;
let editedRow;

function editData(button) {
  // Getting the parent row of the clicked button
  let row = button.parentNode.parentNode;

  // Storing the row being edited
  editedRow = row;

  // Updating the form fields with the existing  values
  username.value = row.cells[0].innerHTML;
  contact.value = row.cells[1].innerHTML;
  email.value = row.cells[2].innerHTML;
  textArea.value = row.cells[3].innerHTML;
  select.value = row.cells[5].innerHTML;

  // Call the function to display the path on the choose input
  const imageUrl = getImgUrlFromCell(row.cells[4]);
  updateFileInputLabelOnEdit();

  // Calling the function on to display img on the form
  displayOnForm(imageUrl);

  // Setting the var to indicate the editing
  isEditing = true;

  // Direct to the form
  setTimeout(() => {
    form.scrollIntoView({ behavior: "smooth" });
  }, 800);
}

function updateFileInputLabelOnEdit() {
  const fileInputLabel = document.getElementById("fileInputLabel");
  const imagePreviewElement = document.getElementById("preview-selected-image");

  // Display the image path when editing if editedRow is defined
  if (editedRow) {
    const imageUrl = getImgUrlFromCell(editedRow.cells[4]);
    if (imageUrl) {
      fileInputLabel.textContent = imageUrl;
      // Display the image on the form when editing
      displayOnForm(imageUrl);
    } else {
      // Reset the image preview on the form when no image is chosen during editing
      displayOnForm("");
    }
  } else {
    // Reset the image preview when no file is chosen during editing
    if (fileInput.files.length === 0) {
      imagePreviewElement.src = "";
      imagePreviewElement.style.display = "none";
    }

    // Display the file name when a file is selected
    if (fileInput.files.length > 0) {
      fileInputLabel.textContent = fileInput.files[0].name;
    } else {
      fileInputLabel.textContent = "NO FILE CHOSEN";

      // Reset the image preview when no file is chosen during editing
      imagePreviewElement.src = "";
      imagePreviewElement.style.display = "none";
    }
  }
}
document.addEventListener("DOMContentLoaded", function () {
  fileInput.addEventListener("change", updateFileInputLabelOnEdit);
});

updateFileInputLabelOnEdit();
// Getting the image from the cell
function getImgUrlFromCell(cell) {
  if (cell instanceof HTMLElement) {
    const imageTag = cell.querySelector("img");

    if (imageTag) {
      return imageTag.src;
    }

    const cellContent = cell.innerHTML.trim();
    if (cellContent.toLowerCase().startsWith("<img")) {
      const match = cellContent.match(/src=["'](.*?)["']/);
      return match ? match[1] : "";
    }
  }

  return "";
}

// Function  to display the img on the form
function displayOnForm(imageUrl) {
  const imagePreviewElement = document.getElementById("preview-selected-image");

  if (imagePreviewElement) {
    imagePreviewElement.src = imageUrl;
    imagePreviewElement.style.display = "block";
  }
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

  const imagePreviewElement = document.getElementById("preview-selected-image");
  if (imagePreviewElement) {
    imagePreviewElement.src = ""; // Set the src attribute to an empty string
    imagePreviewElement.style.display = "none"; // Hide the image
  }

  // Remove all the elements on the row
  const rowCount = table.rows.length;
  for (let i = rowCount - 1; i > 0; i--) {
    table.deleteRow(i);
  }

  updateFileInputLabelOnEdit();
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

  // Reset the file input label
  const fileInputLabel = document.getElementById("fileInputLabel");
  if (fileInputLabel) {
    fileInputLabel.textContent = "NO FILE CHOSEN";
  }

  const imagePreviewElement = document.getElementById("preview-selected-image");
  if (imagePreviewElement) {
    imagePreviewElement.src = "";
    imagePreviewElement.style.display = "none";
  }
  // Remove error/success classes and messages
  const formGroups = document.querySelectorAll(".form-group");
  formGroups.forEach((formGroup) => {
    formGroup.className = "form-group";
    const p = formGroup.querySelector("p");
    if (p) {
      p.innerHTML = "";
    }
  });

  // Removing the show class
  const modal = document.getElementById("myModal");
  modal.classList.remove("show");
  closeModal();
}

// Function to open the modal
function openModal(message) {
  const modal = document.getElementById("myModal");
  const modalMessage = document.getElementById("modalMessage");

  // Displaying the message on the modal content
  modalMessage.textContent = message;
  modal.classList.add("show");
}

// Function for closing the modal
function closeModal() {
  console.log("Modal Closing");
  const modal = document.getElementById("myModal");
  if (modal) {
    modal.classList.remove("show");
  }
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
  checkLength(contact, 10, 10);
  checkLength(textArea, 20, 50);

  // Verification for the input elements
  let isNameValid = checkAlpha(username);
  let isContactValid = checkNumbers(contact);
  let isEmailValid = checkEmail(email);

  if (isFormValid && isNameValid && isContactValid && isEmailValid) {
    if (isEditing) {
      updateEditedRow();
      openModal("Successfully Edited");
      setTimeout(() => {
        updateFileInputLabelOnEdit();
        resetFormState();
        closeModal();
      }, 300);
      // Direct to the table
      setTimeout(() => {
        resetBtn.scrollIntoView({ behavior: "smooth" });
      }, 300);
    } else {
      updateOnTable(username, contact, email, textArea, file, select);
      openModal("Successfully Submitted");
      setTimeout(() => {
        // Clearing the all data
        username.value = "";
        email.value = "";
        contact.value = "";
        select.value = "";
        file.value = "";
        textArea.value = "";
        terms.checked = false;
        updateFileInputLabelOnEdit();
        resetFormState();
        closeModal();
        // Direct to the table
        resetBtn.scrollIntoView({ behavior: "smooth" });
      }, 800);
    }
  } else {
    console.log("Form has validation error. Please check them");
  }
});

// Event listeners for edit and delete buttons
table.addEventListener("click", function (e) {
  if (e.target.classList.contains("edit-btn")) {
    editData(e.target);
  } else if (e.target.classList.contains("delete-btn")) {
    deleteData(e.target);
  }
});

// function to update the editing
function updateEditedRow() {
  // Mutate the data from the existing row
  editedRow.cells[0].innerHTML = username.value;
  editedRow.cells[1].innerHTML = contact.value;
  editedRow.cells[2].innerHTML = email.value;
  editedRow.cells[3].innerHTML = textArea.value;

  // For the image update
  const selectedFile = file.files[0];
  const imageCell = editedRow.cells[4];

  if (imageCell) {
    if (selectedFile) {
      const imageUrl = URL.createObjectURL(selectedFile);
      const imageTag = `<img class="output-img" src="${imageUrl}" alt="uploaded-image" width ="${desiredWidth}" height="${desiredHeight}"/>`;
      imageCell.innerHTML = imageTag;
    } else {
      imageCell.innerHTML = "";
      // Reset the image preview on the form
      displayOnForm("");
    }
  }
  editedRow.cells[5].innerHTML = select.value;

  // Add the "table-data" class to all td elements
  const tdElements = editedRow.getElementsByTagName("td");
  for (let i = 0; i < tdElements.length; i++) {
    tdElements[i].classList.add("table-data");
  }

  isEditing = false;

  // Display the modal for successful edit
  openModal("Successfully Edited");

  // Reset the form state
  resetFormState();
  closeModal();

  // Direct to the table
  setTimeout(() => {
    resetBtn.scrollIntoView({ behavior: "smooth" });
  }, 800);
}
// Function for the Edit button
