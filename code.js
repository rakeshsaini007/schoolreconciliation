/**
 * GOOGLE APPS SCRIPT CODE
 * Copy and paste this into your Google Apps Script editor.
 */

function doGet(e) {
  return handleRequest();
}

function handleRequest() {
  try {
    // 1. OPEN SPREADSHEET
    // Replace with your actual Spreadsheet ID if not using container-bound script
    // Or use SpreadsheetApp.getActiveSpreadsheet() if bound to the sheet.
    var ss = SpreadsheetApp.getActiveSpreadsheet(); 
    // If testing externally and script is not bound, use: 
    // var ss = SpreadsheetApp.openById('YOUR_SPREADSHEET_ID_HERE');

    if (!ss) {
      return createJSONOutput({ status: 'error', message: 'Spreadsheet not found' });
    }

    // 2. GET SHEETS
    var dataSheet = ss.getSheetByName("Data");
    var schoolListSheet = ss.getSheetByName("SchoolList");

    if (!dataSheet || !schoolListSheet) {
      return createJSONOutput({ status: 'error', message: 'Sheets "Data" or "SchoolList" not found' });
    }

    // 3. GET DATA & HEADERS
    var dataValues = dataSheet.getDataRange().getDisplayValues();
    var listValues = schoolListSheet.getDataRange().getDisplayValues();

    if (listValues.length < 2) {
      return createJSONOutput({ status: 'success', data: [] }); // Empty master list
    }

    // 4. MAP HEADERS TO INDICES (Assuming Row 1 is header)
    var listHeaders = listValues[0].map(function(h) { return h.toLowerCase().trim(); });
    var dataHeaders = dataValues.length > 0 ? dataValues[0].map(function(h) { return h.toLowerCase().trim(); }) : [];

    var listIdx = {
      udise: listHeaders.indexOf("udise code"),
      name: listHeaders.indexOf("school name"),
      np: listHeaders.indexOf("nyay panchayat"),
      type: listHeaders.indexOf("school type")
    };

    var dataIdx = {
      udise: dataHeaders.indexOf("udise code")
    };

    if (listIdx.udise === -1) {
      return createJSONOutput({ status: 'error', message: 'Column "Udise Code" missing in SchoolList' });
    }

    // 5. EXTRACT SUBMITTED UDISE CODES
    var submittedUdiseSet = {};
    if (dataValues.length > 1 && dataIdx.udise !== -1) {
      for (var i = 1; i < dataValues.length; i++) {
        var code = String(dataValues[i][dataIdx.udise]).trim();
        if (code) submittedUdiseSet[code] = true;
      }
    }

    // 6. FIND REMAINING SCHOOLS
    var remainingSchools = [];
    for (var i = 1; i < listValues.length; i++) {
      var row = listValues[i];
      var udise = String(row[listIdx.udise]).trim();
      
      if (udise && !submittedUdiseSet[udise]) {
        remainingSchools.push({
          udiseCode: udise,
          schoolName: listIdx.name !== -1 ? row[listIdx.name] : "",
          nyayPanchayat: listIdx.np !== -1 ? row[listIdx.np] : "",
          schoolType: listIdx.type !== -1 ? row[listIdx.type] : ""
        });
      }
    }

    return createJSONOutput({ status: 'success', data: remainingSchools });

  } catch (err) {
    return createJSONOutput({ status: 'error', message: err.toString() });
  }
}

function createJSONOutput(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
