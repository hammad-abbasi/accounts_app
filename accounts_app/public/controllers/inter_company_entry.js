// // // Copyright (c) 2023, Hammad and contributors
// // // For license information, please see license.txt
// // /* eslint-disable */

// // frappe.ui.form.on('Inter Company Entry', {
// //     // Trigger when the form is loaded or refreshed
// //     refresh: function(frm) {
// //         calculate_totals_and_difference(frm);
// //     }
// // });


// // JV Table Party Type Filter

// frappe.ui.form.on('Inter Company Entry', {
//     // Runs when the form is initialized
//     setup: function(frm) {
//         frm.fields_dict['jv_table'].grid.get_field('party_type').get_query = function(doc, cdt, cdn) {
//             return {
//                 filters: [
//                     ['DocType', 'name', 'in', ['Supplier', 'Customer', 'Employee']]
//                 ]
//             };
//         };
//     }
// });


// // Sum of Debit and Credit Calculation
// frappe.ui.form.on('JV Table', {
//     // Trigger when a field in the JV Table is changed
//     debit_in_account_currency: function(frm, cdt, cdn) {
//         calculate_totals_and_difference(frm);
//     },
//     credit_in_account_currency: function(frm, cdt, cdn) {
//         calculate_totals_and_difference(frm);
//     },
//     // Trigger when a row is added or removed in the JV Table
//     jv_table_add: function(frm) {
//         calculate_totals_and_difference(frm);
//     },
//     jv_table_remove: function(frm) {
//         calculate_totals_and_difference(frm);
//     }
// });

// // Function to calculate the total debit, total credit, and difference
// function calculate_totals_and_difference(frm) {
//     let total_debit = 0;
//     let total_credit = 0;

//     // Iterate through each row in the JV Table
//     frm.doc.jv_table.forEach(function(row) {
//         total_debit += row.debit_in_account_currency || 0; // Sum debit values
//         total_credit += row.credit_in_account_currency || 0; // Sum credit values
//     });

//     // Set the calculated totals in the respective fields
//     frm.set_value('total_debit', total_debit);
//     frm.set_value('total_credit', total_credit);

//     // Calculate the difference and set it in the difference field
//     let difference = total_debit - total_credit;
//     frm.set_value('difference', difference);
// }

// // Auto JV Creation

// // After all the changes for TO COMPANY:
// frappe.ui.form.on('Inter Company Entry', {
//     before_submit: function(frm) {
//         // Define a map for company abbreviations
//         const company_abbr_map = {
//             "AL Banjer Factory": "BJFC",
//             "AL Sharq Polystyrene Factory Company Ltd.": "SHFC",
//             "Yousuf Mohammed Al Dossary Real estate company": "DREC",
//             "Anjad factory for Advance Plastic Industries Co.": "ANFC"
//         };

//         // Get the abbreviation for the selected to_company
//         const company_abbr = company_abbr_map[frm.doc.to_company];

//         if (!company_abbr) {
//             frappe.msgprint(__('Abbreviation not found for selected company.'));
//             frappe.validated = false; // Prevent form submission
//             return;
//         }

//         // Find the account in JV Table that contains the company abbreviation
//         let matched_account = null;
//         let matched_party_type = null;
//         let matched_party = null;

//         frm.doc.jv_table.forEach(function(row) {
//             if (row.account && row.account.includes(company_abbr)) {
//                 matched_account = row.account;
//                 matched_party_type = row.party_type;
//                 matched_party = row.party;
//             }
//         });

//         if (!matched_account) {
//             frappe.msgprint(__('No matching account found in JV Table for abbreviation: {0}', [company_abbr]));
//             frappe.validated = false; // Prevent form submission
//             return;
//         }

//         // Determine naming series based on to_company and voucher_type
//         let naming_series = "";
//         const voucher_type = frm.doc.voucher_type;
//         const to_company = frm.doc.to_company;

//         if (to_company == "Yousuf Mohammed Al Dossary Real estate company") {
//             naming_series = {
//                 "Journal Entry": "JV-RE-.YY.-",
//                 "Bank Entry": "BE-RE-.YY.-",
//                 "Cash Entry": "CE-RE-.YY.-",
//                 "Inter Company Journal Entry": "IN-RE-.YY.-",
//                 "Credit Card Entry": "CD-RE-.YY.-",
//                 "Credit Note": "CN-RE-.YY.-",
//                 "Debit Note": "DN-RE-.YY.-",
//                 "Contra Entry": "CO-RE-.YY.-",
//                 "Excise Entry": "EX-RE-.YY.-",
//                 "Write Off Entry": "WR-RE-.YY.-",
//                 "Opening Entry": "OP-RE-.YY.-",
//                 "Depreciation Entry": "DP-RE-.YY.-",
//                 "Exchange Rate Revaluation": "ER-RE-.YY.-",
//                 "Deferred Revenue": "ACR-RE-.YY.-",
//                 "Deferred Expense": "ACE-RE-.YY.-"
//             }[voucher_type];
//         } else if (to_company == "AL Banjer Factory") {
//             naming_series = {
//                 "Journal Entry": "JV-BJ-.YY.-",
//                 "Bank Entry": "BE-BJ-.YY.-",
//                 "Cash Entry": "CE-BJ-.YY.-",
//                 "Inter Company Journal Entry": "IN-BJ-.YY.-",
//                 "Credit Card Entry": "CD-BJ-.YY.-",
//                 "Credit Note": "CN-BJ-.YY.-",
//                 "Debit Note": "DN-BJ-.YY.-",
//                 "Contra Entry": "CO-BJ-.YY.-",
//                 "Excise Entry": "EX-BJ-.YY.-",
//                 "Write Off Entry": "WR-BJ-.YY.-",
//                 "Opening Entry": "OP-BJ-.YY.-",
//                 "Depreciation Entry": "DP-BJ-.YY.-",
//                 "Exchange Rate Revaluation": "ER-BJ-.YY.-",
//                 "Deferred Revenue": "ACR-BJ-.YY.-",
//                 "Deferred Expense": "ACE-BJ-.YY.-"
//             }[voucher_type];
//         } else if (to_company == "AL Sharq Polystyrene Factory Company Ltd.") {
//             naming_series = {
//                 "Journal Entry": "JV-SH-.YY.-",
//                 "Bank Entry": "BE-SH-.YY.-",
//                 "Cash Entry": "CE-SH-.YY.-",
//                 "Inter Company Journal Entry": "IN-SH-.YY.-",
//                 "Credit Card Entry": "CD-SH-.YY.-",
//                 "Credit Note": "CN-SH-.YY.-",
//                 "Debit Note": "DN-SH-.YY.-",
//                 "Contra Entry": "CO-SH-.YY.-",
//                 "Excise Entry": "EX-SH-.YY.-",
//                 "Write Off Entry": "WR-SH-.YY.-",
//                 "Opening Entry": "OP-SH-.YY.-",
//                 "Depreciation Entry": "DP-SH-.YY.-",
//                 "Exchange Rate Revaluation": "ER-SH-.YY.-",
//                 "Deferred Revenue": "ACR-SH-.YY.-",
//                 "Deferred Expense": "ACE-SH-.YY.-"
//             }[voucher_type];
//         }

//         if (!naming_series) {
//             frappe.msgprint(__('Naming series not found for selected voucher type and company.'));
//             frappe.validated = false; // Prevent form submission
//             return;
//         }

//         // Prepare data for Journal Entry
//         var journalEntryData = {
//             doctype: 'Journal Entry',
//             naming_series: naming_series,  // Set the naming series here
//             // voucher_type: 'Journal Entry',
//             inter_company_entry: frm.doc.name,
//             voucher_type: frm.doc.voucher_type,
//             posting_date: frm.doc.posting_date,
//             company: frm.doc.to_company,
//             cheque_no: frm.doc.cheque_no,
//             cheque_date: frm.doc.cheque_date,
//             accounts: []
//         };

//         // Add accounts data
//         journalEntryData.accounts.push(
//             {
//                 account: frm.doc.to_account,
//                 exchange_rate: 0,
//                 party_type: frm.doc.party_type,
//                 party: frm.doc.party,
//                 debit_in_account_currency: 0,
//                 debit: 0,
//                 credit_in_account_currency: flt(frm.doc.total_credit),
//                 credit: flt(frm.doc.total_credit)
//             },
//             {
//                 account: matched_account,
//                 exchange_rate: 0,
//                 party_type: matched_party_type,
//                 party: matched_party,
//                 debit_in_account_currency: flt(frm.doc.total_debit),
//                 debit: flt(frm.doc.total_debit),
//                 credit_in_account_currency: 0,
//                 credit: 0
//             }
//         );

//         // Insert Journal Entry in Draft state
//         frappe.db.insert(journalEntryData).then(function(response) {
//             frappe.msgprint(__('Journal Entry {0} created successfully.', [response.name]));
//         }).catch(function(error) {
//             frappe.msgprint(__('Error creating Journal Entry: {0}', [error.message || error]));
//             console.error(error);
//         });
//     }
// });

// // FOR FOR COMPANY
// frappe.ui.form.on('Inter Company Entry', {
//     before_submit: function(frm) {
//         // Define a map for company abbreviations
//         const company_abbr_map = {
//             "AL Banjer Factory": "BJFC",
//             "AL Sharq Polystyrene Factory Company Ltd.": "SHFC",
//             "Yousuf Mohammed Al Dossary Real estate company": "DREC",
//             "Anjad factory for Advance Plastic Industries Co.": "ANFC"
//         };

//         // Get the abbreviation for the selected to_company
//         const company_abbr = company_abbr_map[frm.doc.company];

//         if (!company_abbr) {
//             frappe.msgprint(__('Abbreviation not found for selected company.'));
//             frappe.validated = false; // Prevent form submission
//             return;
//         }

//         // Find the account in JV Table that contains the company abbreviation
//         let matched_account = null;
//         let matched_party_type = null;
//         let matched_party = null;

//         frm.doc.jv_table.forEach(function(row) {
//             if (row.account && row.account.includes(company_abbr)) {
//                 matched_account = row.account;
//                 matched_party_type = row.party_type;
//                 matched_party = row.party;
//             }
//         });

//         if (!matched_account) {
//             frappe.msgprint(__('No matching account found in JV Table for abbreviation: {0}', [company_abbr]));
//             frappe.validated = false; // Prevent form submission
//             return;
//         }

//         // Determine naming series based on to_company and voucher_type
//         let naming_series = "";
//         const voucher_type = frm.doc.voucher_type;
//         const company = frm.doc.company;

//         if (company == "Yousuf Mohammed Al Dossary Real estate company") {
//             naming_series = {
//                 "Journal Entry": "JV-RE-.YY.-",
//                 "Bank Entry": "BE-RE-.YY.-",
//                 "Cash Entry": "CE-RE-.YY.-",
//                 "Inter Company Journal Entry": "IN-RE-.YY.-",
//                 "Credit Card Entry": "CD-RE-.YY.-",
//                 "Credit Note": "CN-RE-.YY.-",
//                 "Debit Note": "DN-RE-.YY.-",
//                 "Contra Entry": "CO-RE-.YY.-",
//                 "Excise Entry": "EX-RE-.YY.-",
//                 "Write Off Entry": "WR-RE-.YY.-",
//                 "Opening Entry": "OP-RE-.YY.-",
//                 "Depreciation Entry": "DP-RE-.YY.-",
//                 "Exchange Rate Revaluation": "ER-RE-.YY.-",
//                 "Deferred Revenue": "ACR-RE-.YY.-",
//                 "Deferred Expense": "ACE-RE-.YY.-"
//             }[voucher_type];
//         } else if (company == "AL Banjer Factory") {
//             naming_series = {
//                 "Journal Entry": "JV-BJ-.YY.-",
//                 "Bank Entry": "BE-BJ-.YY.-",
//                 "Cash Entry": "CE-BJ-.YY.-",
//                 "Inter Company Journal Entry": "IN-BJ-.YY.-",
//                 "Credit Card Entry": "CD-BJ-.YY.-",
//                 "Credit Note": "CN-BJ-.YY.-",
//                 "Debit Note": "DN-BJ-.YY.-",
//                 "Contra Entry": "CO-BJ-.YY.-",
//                 "Excise Entry": "EX-BJ-.YY.-",
//                 "Write Off Entry": "WR-BJ-.YY.-",
//                 "Opening Entry": "OP-BJ-.YY.-",
//                 "Depreciation Entry": "DP-BJ-.YY.-",
//                 "Exchange Rate Revaluation": "ER-BJ-.YY.-",
//                 "Deferred Revenue": "ACR-BJ-.YY.-",
//                 "Deferred Expense": "ACE-BJ-.YY.-"
//             }[voucher_type];
//         } else if (company == "AL Sharq Polystyrene Factory Company Ltd.") {
//             naming_series = {
//                 "Journal Entry": "JV-SH-.YY.-",
//                 "Bank Entry": "BE-SH-.YY.-",
//                 "Cash Entry": "CE-SH-.YY.-",
//                 "Inter Company Journal Entry": "IN-SH-.YY.-",
//                 "Credit Card Entry": "CD-SH-.YY.-",
//                 "Credit Note": "CN-SH-.YY.-",
//                 "Debit Note": "DN-SH-.YY.-",
//                 "Contra Entry": "CO-SH-.YY.-",
//                 "Excise Entry": "EX-SH-.YY.-",
//                 "Write Off Entry": "WR-SH-.YY.-",
//                 "Opening Entry": "OP-SH-.YY.-",
//                 "Depreciation Entry": "DP-SH-.YY.-",
//                 "Exchange Rate Revaluation": "ER-SH-.YY.-",
//                 "Deferred Revenue": "ACR-SH-.YY.-",
//                 "Deferred Expense": "ACE-SH-.YY.-"
//             }[voucher_type];
//         }

//         if (!naming_series) {
//             frappe.msgprint(__('Naming series not found for selected voucher type and company.'));
//             frappe.validated = false; // Prevent form submission
//             return;
//         }

//         // Prepare data for Journal Entry
//         var journalEntryData = {
//             doctype: 'Journal Entry',
//             naming_series: naming_series,  // Set the naming series here
//             // voucher_type: 'Journal Entry',
//             inter_company_entry: frm.doc.name,
//             voucher_type: frm.doc.voucher_type,
//             posting_date: frm.doc.posting_date,
//             company: frm.doc.company,
//             cheque_no: frm.doc.cheque_no,
//             cheque_date: frm.doc.cheque_date,
//             accounts: []
//         };

//         // Add accounts data
//         journalEntryData.accounts.push(
//             {
//                 account: frm.doc.from_account,
//                 exchange_rate: 0,
//                 party_type: frm.doc.party_type,
//                 party: frm.doc.party,
//                 debit_in_account_currency: flt(frm.doc.total_debit),
//                 debit: flt(frm.doc.total_debit),
//                 credit_in_account_currency: 0,
//                 credit: 0
//             },
//             {
//                 account: matched_account,
//                 exchange_rate: 0,
//                 party_type: matched_party_type,
//                 party: matched_party,
//                 debit_in_account_currency: 0,
//                 debit: 0,
//                 credit_in_account_currency: flt(frm.doc.total_credit),
//                 credit: flt(frm.doc.total_credit)
//             }
//         );

//         // Insert Journal Entry in Draft state
//         frappe.db.insert(journalEntryData).then(function(response) {
//             frappe.msgprint(__('Journal Entry {0} created successfully.', [response.name]));
//         }).catch(function(error) {
//             frappe.msgprint(__('Error creating Journal Entry: {0}', [error.message || error]));
//             console.error(error);
//         });
//     }
// });

// // FOR COMPANY1 and ACCOUNT 1

// frappe.ui.form.on('Inter Company Entry', {
//     before_submit: function(frm) {
//         // Define a map for company abbreviations
//         const company_abbr_map = {
//             "AL Banjer Factory": "BJFC",
//             "AL Sharq Polystyrene Factory Company Ltd.": "SHFC",
//             "Yousuf Mohammed Al Dossary Real estate company": "DREC",
//             "Anjad factory for Advance Plastic Industries Co.": "ANFC"
//         };

//         // Get the abbreviation for the selected company_1
//         const company_abbr = company_abbr_map[frm.doc.company_1];

//         if (!company_abbr) {
//             frappe.msgprint(__('Abbreviation not found for selected company.'));
//             frappe.validated = false; // Prevent form submission
//             return;
//         }

//         // Find the account in JV Table that contains the company abbreviation
//         let matched_account = null;
//         let matched_party_type = null;
//         let matched_party = null;

//         frm.doc.jv_table.forEach(function(row) {
//             if (row.account && row.account.includes(company_abbr)) {
//                 matched_account = row.account;
//                 matched_party_type = row.party_type;
//                 matched_party = row.party;
//             }
//         });

//         if (!matched_account) {
//             frappe.msgprint(__('No matching account found in JV Table for abbreviation: {0}', [company_abbr]));
//             frappe.validated = false; // Prevent form submission
//             return;
//         }

//         // Determine naming series based on company_1 and voucher_type
//         let naming_series = "";
//         const voucher_type = frm.doc.voucher_type;
//         const company_1 = frm.doc.company_1;

//         const naming_series_map = {
//             "Yousuf Mohammed Al Dossary Real estate company": {
//                 "Journal Entry": "JV-RE-.YY.-",
//                 "Bank Entry": "BE-RE-.YY.-",
//                 "Cash Entry": "CE-RE-.YY.-",
//                 "Inter Company Journal Entry": "IN-RE-.YY.-",
//                 "Credit Card Entry": "CD-RE-.YY.-",
//                 "Credit Note": "CN-RE-.YY.-",
//                 "Debit Note": "DN-RE-.YY.-",
//                 "Contra Entry": "CO-RE-.YY.-",
//                 "Excise Entry": "EX-RE-.YY.-",
//                 "Write Off Entry": "WR-RE-.YY.-",
//                 "Opening Entry": "OP-RE-.YY.-",
//                 "Depreciation Entry": "DP-RE-.YY.-",
//                 "Exchange Rate Revaluation": "ER-RE-.YY.-",
//                 "Deferred Revenue": "ACR-RE-.YY.-",
//                 "Deferred Expense": "ACE-RE-.YY.-"
//             },
//             "AL Banjer Factory": {
//                 "Journal Entry": "JV-BJ-.YY.-",
//                 "Bank Entry": "BE-BJ-.YY.-",
//                 "Cash Entry": "CE-BJ-.YY.-",
//                 "Inter Company Journal Entry": "IN-BJ-.YY.-",
//                 "Credit Card Entry": "CD-BJ-.YY.-",
//                 "Credit Note": "CN-BJ-.YY.-",
//                 "Debit Note": "DN-BJ-.YY.-",
//                 "Contra Entry": "CO-BJ-.YY.-",
//                 "Excise Entry": "EX-BJ-.YY.-",
//                 "Write Off Entry": "WR-BJ-.YY.-",
//                 "Opening Entry": "OP-BJ-.YY.-",
//                 "Depreciation Entry": "DP-BJ-.YY.-",
//                 "Exchange Rate Revaluation": "ER-BJ-.YY.-",
//                 "Deferred Revenue": "ACR-BJ-.YY.-",
//                 "Deferred Expense": "ACE-BJ-.YY.-"
//             },
//             "AL Sharq Polystyrene Factory Company Ltd.": {
//                 "Journal Entry": "JV-SH-.YY.-",
//                 "Bank Entry": "BE-SH-.YY.-",
//                 "Cash Entry": "CE-SH-.YY.-",
//                 "Inter Company Journal Entry": "IN-SH-.YY.-",
//                 "Credit Card Entry": "CD-SH-.YY.-",
//                 "Credit Note": "CN-SH-.YY.-",
//                 "Debit Note": "DN-SH-.YY.-",
//                 "Contra Entry": "CO-SH-.YY.-",
//                 "Excise Entry": "EX-SH-.YY.-",
//                 "Write Off Entry": "WR-SH-.YY.-",
//                 "Opening Entry": "OP-SH-.YY.-",
//                 "Depreciation Entry": "DP-SH-.YY.-",
//                 "Exchange Rate Revaluation": "ER-SH-.YY.-",
//                 "Deferred Revenue": "ACR-SH-.YY.-",
//                 "Deferred Expense": "ACE-SH-.YY.-"
//             }
//         };

//         // Set naming series
//         if (naming_series_map[company_1]) {
//             naming_series = naming_series_map[company_1][voucher_type];
//         }

//         if (!naming_series) {
//             frappe.msgprint(__('Naming series not found for selected voucher type and company.'));
//             frappe.validated = false; // Prevent form submission
//             return;
//         }

//         // Prepare data for Journal Entry
//         var journalEntryData = {
//             doctype: 'Journal Entry',
//             naming_series: naming_series || 'JV-RE-.YY.-', // Default naming series if not found
//             inter_company_entry: frm.doc.name,
//             voucher_type: frm.doc.voucher_type,
//             posting_date: frm.doc.posting_date,
//             company: frm.doc.company_1,
//             cheque_no: frm.doc.cheque_no,
//             cheque_date: frm.doc.cheque_date,
//             accounts: []
//         };

//         // Add accounts data
//         journalEntryData.accounts.push(
//             {
//                 account: frm.doc.account_1,
//                 exchange_rate: 0,
//                 party_type: frm.doc.party_type,
//                 party: frm.doc.party,
//                 debit_in_account_currency: 0,
//                 debit: 0,
//                 credit_in_account_currency: flt(frm.doc.total_credit),
//                 credit: flt(frm.doc.total_credit)
//             },
//             {
//                 account: matched_account,
//                 exchange_rate: 0,
//                 party_type: matched_party_type,
//                 party: matched_party,
//                 debit_in_account_currency: flt(frm.doc.total_debit),
//                 debit: flt(frm.doc.total_debit),
//                 credit_in_account_currency: 0,
//                 credit: 0
//             }
//         );

//         // Insert Journal Entry in Draft state
//         frappe.db.insert(journalEntryData).then(function(response) {
//             frappe.msgprint(__('Journal Entry {0} created successfully.', [response.name]));
//         }).catch(function(error) {
//             frappe.msgprint(__('Error creating Journal Entry: {0}', [error.message || error]));
//             console.error(error);
//         });
//     }
// });


// // Account Fetch

// frappe.ui.form.on('Inter Company Entry', {
//     before_save: function(frm) {
//         if (frm.doc.company && frm.doc.to_company && frm.doc.company_1) {
//             // Define the mapping between company and fields in Inter Company Accounts
//             const company_field_map = {
//                 "AL Banjer Factory": "banjer",
//                 "AL Sharq Polystyrene Factory Company Ltd.": "sharq",
//                 "Yousuf Mohammed Al Dossary Real estate company": "real_estate",
//                 "Anjad factory for Advance Plastic Industries Co.": "anjad"
//             };
            
//             // Fetch and set the to_account based on the to_company value
//             let to_account_field_name = company_field_map[frm.doc.to_company];
            
//             if (to_account_field_name) {
//                 frappe.db.get_value('Inter Company Accounts', {'company': frm.doc.company}, to_account_field_name, (r) => {
//                     if (r && r[to_account_field_name]) {
//                         frm.set_value('to_account', r[to_account_field_name]);
//                     } else {
//                         frappe.msgprint(__('No account found for the selected company in to_account.'));
//                     }
//                 });
//             } else {
//                 frappe.msgprint(__('No matching field for the selected To Company in to_account.'));
//             }

//             // Fetch and set the from_account based on the company value
//             let from_account_field_name = company_field_map[frm.doc.company];
            
//             if (from_account_field_name) {
//                 frappe.db.get_value('Inter Company Accounts', {'company': frm.doc.to_company}, from_account_field_name, (r) => {
//                     if (r && r[from_account_field_name]) {
//                         frm.set_value('from_account', r[from_account_field_name]);
//                     } else {
//                         frappe.msgprint(__('No account found for the selected company in from_account.'));
//                     }
//                 });
//             } else {
//                 frappe.msgprint(__('No matching field for the selected Company in from_account.'));
//             }
            
//             // Fetch and set the account_1 based on the company_1 value
//             let account_1_field_name = company_field_map[frm.doc.company_1];
            
//             if (account_1_field_name) {
//                 frappe.db.get_value('Inter Company Accounts', {'company': frm.doc.company}, account_1_field_name, (r) => {
//                     if (r && r[account_1_field_name]) {
//                         frm.set_value('account_1', r[account_1_field_name]);
//                     } else {
//                         frappe.msgprint(__('No account found for the selected company_1 in account_1.'));
//                     }
//                 });
//             } else {
//                 frappe.msgprint(__('No matching field for the selected Company_1 in account_1.'));
//             }
//         } else {
//             frappe.msgprint(__('Please select Company, To Company, and Company_1.'));
//         }
//     }
// });








// // frappe.ui.form.on('JV Table', {
// //     // Trigger when a field in the JV Table is changed
// //     debit_in_account_currency: function(frm, cdt, cdn) {
// //         calculate_totals_and_difference(frm);
// //     },
// //     credit_in_account_currency: function(frm, cdt, cdn) {
// //         calculate_totals_and_difference(frm);
// //     },
// //     // Trigger when a row is added or removed in the JV Table
// //     jv_table_add: function(frm) {
// //         calculate_totals_and_difference(frm);
// //     },
// //     jv_table_remove: function(frm) {
// //         calculate_totals_and_difference(frm);
// //     }
// // });

// // // Function to calculate the total debit, total credit, and difference
// // function calculate_totals_and_difference(frm) {
// //     let total_debit = 0;
// //     let total_credit = 0;

// //     // Iterate through each row in the JV Table
// //     frm.doc.jv_table.forEach(function(row) {
// //         total_debit += row.debit_in_account_currency || 0; // Sum debit values
// //         total_credit += row.credit_in_account_currency || 0; // Sum credit values
// //     });

// //     // Set the calculated totals in the respective fields
// //     frm.set_value('total_debit', total_debit);
// //     frm.set_value('total_credit', total_credit);

// //     // Calculate the difference and set it in the difference field
// //     let difference = total_debit - total_credit;
// //     frm.set_value('difference', difference);
// // }
