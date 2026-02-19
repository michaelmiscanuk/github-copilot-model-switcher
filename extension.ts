import * as vscode from 'vscode';

async function switchToModel(context: vscode.ExtensionContext, modelInfo: { vendor: string; id: string; family: string }, modelName: string) {
    try {
        // Show a temporary status bar message that disappears after 500ms
        vscode.window.setStatusBarMessage(`Switching to ${modelName}...`, 500);
        
        // Use the workbench command with the correct parameter format
        await vscode.commands.executeCommand('workbench.action.chat.changeModel', modelInfo);
        
        // Show success message
        vscode.window.setStatusBarMessage(`Switched to ${modelName}`, 500);
    } catch (error) {
        vscode.window.showErrorMessage(`Failed to switch model: ${error}`);
    }
}

async function switchToConfiguredModel(context: vscode.ExtensionContext, modelId: string) {
    try {
        // Get model info from available models
        const models = await vscode.lm.selectChatModels();
        const model = models.find(m => m.id === modelId);

        if (!model) {
            vscode.window.showErrorMessage(`Model "${modelId}" not found. Run "Discover Copilot Commands" to see available models.`);
            return;
        }

        const modelInfo = { vendor: model.vendor, id: model.id, family: model.family };
        await switchToModel(context, modelInfo, model.name);
    } catch (error) {
        vscode.window.showErrorMessage(`Failed to switch model: ${error}`);
    }
}

export function activate(context: vscode.ExtensionContext) {
    console.log('Github Copilot Model Switcher is now active');

    // Discovery command to find available Copilot commands
    const discoverCommands = vscode.commands.registerCommand(
        'github-copilot-model-switcher.discoverCommands',
        async () => {
            const allCommands = await vscode.commands.getCommands(true);
            const copilotCommands = allCommands.filter(cmd =>
                cmd.includes('copilot') || cmd.includes('chat') || cmd.includes('model') || cmd.includes('Chat')
            );

            const output = vscode.window.createOutputChannel('Copilot Commands');
            output.clear();
            output.appendLine('=== All Copilot/Chat/Model-related commands ===');
            output.appendLine(`Total found: ${copilotCommands.length}\n`);
            copilotCommands.sort().forEach(cmd => output.appendLine(cmd));
            output.show();

            // Also try to get available language models
            output.appendLine('\n=== Attempting to get available models ===');
            try {
                const models = await vscode.lm.selectChatModels();
                output.appendLine(`Found ${models.length} models:`);
                models.forEach(model => {
                    output.appendLine(`  - ID: ${model.id}`);
                    output.appendLine(`    Name: ${model.name}`);
                    output.appendLine(`    Family: ${model.family}`);
                    output.appendLine(`    Vendor: ${model.vendor}`);
                    output.appendLine('');
                });
            } catch (e) {
                output.appendLine(`Error getting models: ${e}`);
            }

            vscode.window.showInformationMessage(`Found ${copilotCommands.length} related commands. Check output panel.`);
        }
    );

    // Generic model slot commands — configure model IDs in VS Code settings
    const switchToModel1 = vscode.commands.registerCommand(
        'github-copilot-model-switcher.switchToModel1',
        () => {
            const modelId = vscode.workspace.getConfiguration('github-copilot-model-switcher').get<string>('model1Id', 'claude-sonnet-4.6');
            return switchToConfiguredModel(context, modelId);
        }
    );

    const switchToModel2 = vscode.commands.registerCommand(
        'github-copilot-model-switcher.switchToModel2',
        () => {
            const modelId = vscode.workspace.getConfiguration('github-copilot-model-switcher').get<string>('model2Id', 'gpt-5-mini');
            return switchToConfiguredModel(context, modelId);
        }
    );

    // New configurable command
    const switchModel = vscode.commands.registerCommand(
        'github-copilot-model-switcher.switchModel',
        async (args?: { modelId: string }) => {
            if (args?.modelId) {
                await switchToConfiguredModel(context, args.modelId);
            } else {
                vscode.window.showErrorMessage('No model ID provided');
            }
        }
    );

    context.subscriptions.push(discoverCommands, switchToModel1, switchToModel2, switchModel);
}

export function deactivate() {}