import * as vscode from 'vscode';

export class WIPNodeProvider implements vscode.TreeDataProvider<WIP> {
    getTreeItem(element: WIP): vscode.TreeItem {
        return element;
    }

    getChildren(element?: WIP): Thenable<WIP[]> {
        console.log('Element');
        console.log(element);
        return Promise.resolve([]);

        // if (element) {
        // 	return Promise.resolve(this.getDepsInPackageJson(path.join(this.workspaceRoot, 'node_modules', element.label, 'package.json')));
        // } else {
        // 	const packageJsonPath = path.join(this.workspaceRoot, 'package.json');
        // 	if (this.pathExists(packageJsonPath)) {
        // 		return Promise.resolve(this.getDepsInPackageJson(packageJsonPath));
        // 	} else {
        // 		vscode.window.showInformationMessage('Workspace has no package.json');
        // 		return Promise.resolve([]);
        // 	}
        // }
    }
}

export class WIP extends vscode.TreeItem {}
