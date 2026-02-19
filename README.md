# Github Copilot Model Switcher

Quickly switch between GitHub Copilot models with keyboard shortcuts.

## Setup

1. Install the extension
2. Configure your shortcuts and models in VS Code settings
3. Use your custom keybindings to switch models instantly

## Configuration

Add to your `settings.json`:

```json
{
  "github-copilot-model-switcher.shortcuts": {
    "alt+f11": "claude-sonnet-4.5",
    "alt+f12": "grok-code-fast-1"
  }
}
```

## Finding Model Names

1. Open Command Palette (`Ctrl+Shift+P`)
2. Run: `Github Copilot Model Switcher: Discover Commands`
3. Check the output panel for available models

## Usage

- Press your configured shortcuts to switch models
- Models switch instantly in the chat interface
- Success notifications confirm the switch

## Available Models

Common models include:
- `claude-sonnet-4.5` - Claude Sonnet 4.5
- `gpt-5-mini` - GPT-5 mini
- `gpt-5` - GPT-5
- `auto` - Auto selection

Run the discovery command to see all available models in your environment.