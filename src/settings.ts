import * as vscode from 'vscode';

const generateAuthToken = (username: string, password: string) => {
    const token = `${username}:${password}`;
    return Buffer.from(token).toString('base64');
};

class Settings {
    username: string;
    authToken: string;

    constructor() {
        this.username = '';
        this.authToken = '';

        this.configureExtension();
    }

    configureExtension = async () => {
        if (this.username && this.authToken) {
            return;
        }

        const result = await vscode.window.showInformationMessage(
            'Welcome to novum-webapp-workplace. You need to configure the extension',
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
            return vscode.window.showErrorMessage("Jira's user and password must be provided");
        }

        const authToken = generateAuthToken(username, password);

        try {
            await vscode.workspace
                .getConfiguration()
                .update(
                    'webapp-webapp-workplace.settings',
                    {username, authToken},
                    vscode.ConfigurationTarget.Workspace
                );
        } catch (error) {
            return vscode.window.showErrorMessage('Error savig fisheye-extenions settings.');
        }

        this.username = username;
        this.authToken = authToken;

        vscode.window.showInformationMessage('Thanks. Extension ready to rock');
    };

    getSettings = () => ({
        username: this.username,
        authToken: this.authToken,
    });
}

export default Settings;
