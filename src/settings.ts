import * as vscode from 'vscode';

const generateAuthToken = (username: string, password: string) => {
    const token = `${username}:${password}`;
    return Buffer.from(token).toString('base64');
};

const Settings = {
    username: '',
    authToken: '',

    async configureExtension() {
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
            placeHolder: 'Enter your Jira username',
            ignoreFocusOut: true,
        });

        const password = await vscode.window.showInputBox({
            placeHolder: 'Enter your Jira password',
            ignoreFocusOut: true,
            password: true,
        });

        if (!username || !password) {
            return vscode.window.showErrorMessage("Jira's user and password must be provided");
        }

        const authToken = generateAuthToken(username, password);

        try {
            // TODO maybe we can show a select to use Global or Workspace
            // https://github.com/Microsoft/vscode-extension-samples/blob/master/configuration-sample/src/extension.ts
            await vscode.workspace
                .getConfiguration()
                .update(
                    'novum-webapp-workplace.settings',
                    {username, authToken},
                    vscode.ConfigurationTarget.Global
                );
        } catch (error) {
            console.error(error);
            return vscode.window.showErrorMessage('Error savig novum-webapp-workplace settings.');
        }

        this.username = username;
        this.authToken = authToken;

        vscode.window.showInformationMessage('Thanks. Extension ready to rock');
    },

    getSettings() {
        return {
            // username: this.username,
            // authToken: this.authToken,
            username: 'sfernandez',
            authToken: 'c2Zlcm5hbmRlejptSVBzM1NTYw==',
        };
    },
};

export default Settings;
