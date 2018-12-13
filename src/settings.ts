import * as vscode from 'vscode';

class Settings {
    username: string;
    password: string;

    constructor() {
        this.username = '';
        this.password = '';

        this.configureExtension();
    }

    configureExtension = async () => {
        if (this.username && this.password) {
            return;
        }

        const result = await vscode.window.showInformationMessage(
            'Welcome to fisheye-extensions. You need to configure the extension',
            'OK'
        );

        if (result !== 'OK') {
            return;
        }
        const username = await vscode.window.showInputBox({
            placeHolder: 'Enter your fisheye username',
            ignoreFocusOut: true,
        });

        const password = await vscode.window.showInputBox({
            placeHolder: 'Enter your fisheye password',
            ignoreFocusOut: true,
            password: true,
        });

        if (!username || !password) {
            return;
        }

        try {
            await vscode.workspace
                .getConfiguration()
                .update('fisheye.settings', {username, password}, vscode.ConfigurationTarget.Global);
        } catch (error) {
            return vscode.window.showErrorMessage('Error savig fisheye-extenions settings.');
        }

        this.username = username;
        this.password = password;

        vscode.window.showInformationMessage('Thanks. Extension ready to rock');
    };

    getSettings = () => ({
        username: this.username,
        password: this.password,
    });
}

export default Settings;
