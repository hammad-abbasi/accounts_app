// // Copyright (c) 2023, Hammad and contributors
// // For license information, please see license.txt
// /* eslint-disable */

// frappe.ui.form.on('Inter Company Entry', {
//     // Trigger when the form is loaded or refreshed
//     refresh: function(frm) {
//         calculate_totals_and_difference(frm);
//     }
// });

frappe.ui.form.on('JV Table', {
    // Trigger when a field in the JV Table is changed
    debit_in_account_currency: function(frm, cdt, cdn) {
        calculate_totals_and_difference(frm);
    },
    credit_in_account_currency: function(frm, cdt, cdn) {
        calculate_totals_and_difference(frm);
    },
    // Trigger when a row is added or removed in the JV Table
    jv_table_add: function(frm) {
        calculate_totals_and_difference(frm);
    },
    jv_table_remove: function(frm) {
        calculate_totals_and_difference(frm);
    }
});

// Function to calculate the total debit, total credit, and difference
function calculate_totals_and_difference(frm) {
    let total_debit = 0;
    let total_credit = 0;

    // Iterate through each row in the JV Table
    frm.doc.jv_table.forEach(function(row) {
        total_debit += row.debit_in_account_currency || 0; // Sum debit values
        total_credit += row.credit_in_account_currency || 0; // Sum credit values
    });

    // Set the calculated totals in the respective fields
    frm.set_value('total_debit', total_debit);
    frm.set_value('total_credit', total_credit);

    // Calculate the difference and set it in the difference field
    let difference = total_debit - total_credit;
    frm.set_value('difference', difference);
}
