// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: http://codemirror.net/LICENSE

import CodeMirror from 'codemirror';

CodeMirror.commands.tabAndIndentMarkdownList = (cm) => {
    let ranges = cm.listSelections();
    let pos = ranges[0].head;
    let eolState = cm.getStateAfter(pos.line);
    let inList = eolState.list !== false;

    if (inList) {
        cm.execCommand("indentMore");
        return;
    }

    if (cm.options.indentWithTabs) {
        cm.execCommand("insertTab");
    }
    else {
        let spaces = Array(cm.options.tabSize + 1).join(" ");
        cm.replaceSelection(spaces);
    }
};

CodeMirror.commands.shiftTabAndUnindentMarkdownList = (cm) => {
    let ranges = cm.listSelections();
    let pos = ranges[0].head;
    let eolState = cm.getStateAfter(pos.line);
    let inList = eolState.list !== false;

    if (inList) {
        cm.execCommand("indentLess");
        return;
    }

    if (cm.options.indentWithTabs) {
        cm.execCommand("insertTab");
    }
    else {
        var spaces = Array(cm.options.tabSize + 1).join(" ");
        cm.replaceSelection(spaces);
    }
};
