# Description
A very simple VS code extension for speeding up inline editing of Chinese or Japanese text.

# Hotkey
<kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>D</kbd>

# Example

When translating some text like:

【ココア】「おはようございます！」

In the middle of editing you will end up with something like:

【ココア】「早上好おはようございます！」

And the end result is supposed to be:

【ココア】「早上好！」

Normally the key combination to clear original text while retaining punctuations is <kbd>Shift Down</kbd>+<kbd>End</kbd>+<kbd>←</kbd>+<kbd>←</kbd>+<kbd>Shift Up</kbd>+<kbd>Delete</kbd>, which is quite lengthy and can be really annoying when you press a wrong key.

This extension selects and deletes everything that's not common characters after current cursor position. In other words, this extension is designed to produce the final result from editing state with one key combination.