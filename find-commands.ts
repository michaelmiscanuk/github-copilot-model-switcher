import * as vscode from 'vscode';

// This is a test command to discover available Copilot commands
export function activate(context: vscode.ExtensionContext) {
    const discoverCommands = vscode.commands.registerCommand(
        'github-copilot-model-switcher.discoverCommands',
        async () => {
            const allCommands = await vscode.commands.getCommands(true);
            const copilotCommands = allCommands.filter(cmd => 
                cmd.includes('copilot') || cmd.includes('chat') || cmd.includes('model')
            );
            
            const output = vscode.window.createOutputChannel('Copilot Commands');
            output.clear();
            output.appendLine('=== All Copilot-related commands ===');
            copilotCommands.forEach(cmd => output.appendLine(cmd));
            output.show();
            
            vscode.window.showInformationMessage(`Found ${copilotCommands.length} Copilot commands. Check output panel.`);
        }
    );
    
    context.subscriptions.push(discoverCommands);
}
