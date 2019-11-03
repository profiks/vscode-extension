const vscode = require("vscode");
const fs = require("fs");
const path = require("path");

function activate(context) {
    console.log("Extenstion activated.!!!");

    let disposable = vscode.commands.registerCommand("extension.createBoilerplate", function () {
        const htmlContent = `
            <h1>Test boilerplate</h1>
            <h2 class="subheading">Subheding test to be replaced</h2>
            <button class="button">Click here</button>`;

        htmlContent.replace(/\s+|\n|\r/g, "");

        const folderPath = vscode.workspace.workspaceFolders[0].uri._fsPath
            .toString()
            .split(":")[1];

        fs.writeFile(path.join(folderPath, "test.html"), htmlContent, err => {
            if (err) {
                return vscode.window.showErrorMessage("Failed to create template");
            } else {
                vscode.window.showInformationMessage("HTML file created.");
            }
        });
    });

    context.subscriptions.push(disposable);
}

function deactivate() {
    console.log("Extenstion desactivated :-(");
}

module.exports = {
    activate,
    deactivate
}