function doGet() {
  return HtmlService.createHtmlOutputFromFile('Index')
    .setTitle('CS - Client Relationship Perception Score');
}

function processCsForm(data) {
  try {
    const email = Session.getActiveUser().getEmail(); // Automatically capture user's email
    const sheet = SpreadsheetApp.openById('1HB8T8oMhn9nnngJqDXXXlr0SJQvXy6ZEKUG-Mhmpu_E').getSheetByName('Form Responses 1');
    const lastRow = sheet.getRange('A:A').getValues().filter(String).length; // Get the last non-empty row in column A
    const newRow = lastRow + 1; // Determine the next empty row

    // Append data to the next available row
    sheet.getRange(newRow, 1, 1, 6).setValues([[new Date(), data.email, data.billingOrg, data.grade, '', data.feedback]]);

    return 'Form submitted successfully!';
  } catch (e) {
    return `Error: ${e.message}`;
  }
}


function getBillingOrganizations() {
  const sheet = SpreadsheetApp.openById('1DuPJ4K6hGLIQKfR4sRARPWo2NJ9biN4VGNKQyCw5yRY').getSheetByName('2024 Total List');
  const range = sheet.getRange('A2:A');
  const values = range.getValues().flat().filter((val) => val); // Flatten and filter out empty rows
  return values;
}

function getUserEmail() {
  return Session.getActiveUser().getEmail();
}

