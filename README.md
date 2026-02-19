# Github Copilot Model Switcher

Quickly switch between GitHub Copilot models with keyboard shortcuts.

## Setup

1. Install the extension
2. Set your preferred model IDs in VS Code settings (optional — defaults are pre-configured)
3. Bind `switchToModel1` and `switchToModel2` to your preferred keys in `keybindings.json`

## Configuration

The extension exposes two generic model slots. **Next time you want to swap a model, just update the setting — no keybinding or code changes needed.**

### Option A — VS Code Settings UI (easiest)

1. Open Settings (`Ctrl+,`)
2. Search for `github copilot model switcher`
3. Set **Model1 Id** and **Model2 Id** to your desired model IDs

### Option B — `settings.json`

```json
{
  "github-copilot-model-switcher.model1Id": "claude-sonnet-4.6",
  "github-copilot-model-switcher.model2Id": "gpt-5-mini"
}
```

## Keybindings

Add to your `keybindings.json`:

```json
[
  {
    "key": "alt+f11",
    "command": "github-copilot-model-switcher.switchToModel1"
  },
  {
    "key": "alt+f12",
    "command": "github-copilot-model-switcher.switchToModel2"
  }
]
```

## Finding Model IDs

1. Open Command Palette (`Ctrl+Shift+P`)
2. Run: `Discover Copilot Commands`
3. Check the **Copilot Commands** output panel — all available model IDs are listed there

## Commands

| Command | Description |
|---|---|
| `github-copilot-model-switcher.switchToModel1` | Switch to the model configured in `model1Id` |
| `github-copilot-model-switcher.switchToModel2` | Switch to the model configured in `model2Id` |
| `github-copilot-model-switcher.discoverCommands` | List all available Copilot commands and model IDs |

## Available Models (examples)

Common model IDs include:
- `claude-sonnet-4.6` - Claude Sonnet 4.6
- `gpt-5-mini` - GPT-5 mini
- `gpt-5` - GPT-5
- `auto` - Auto selection

Run the **Discover Copilot Commands** command to see all models available in your environment.