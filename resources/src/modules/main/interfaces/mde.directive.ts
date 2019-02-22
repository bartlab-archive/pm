export interface MDEOptions {
    autofocus: boolean;
    autosave: {
        enabled: boolean;
        uniqueId: string;
        delay: number;
    };

    blockStyles: {
        bold: string;
        italic: string;
    };

    element: HTMLElement;
    forceSync: boolean;
    hideIcons: string[];
    indentWithTabs: boolean;
    initialValue: string;
    insertTexts: {
        horizontalRule: string[];
        image: string[];
        link: string[];
        table: string[];
    };

    lineWrapping: boolean;
    parsingConfig: {
        allowAtxHeaderWithoutSpace: boolean;
        strikethrough: boolean;
        underscoresBreakWords: boolean;
    };

    placeholder: string;
    previewRender: any;
    promptURLs: any;
    shortcuts: {
        drawTable: string;
    };

    showIcons: string[];
    spellChecker: boolean;
    status: any[];
    styleSelectedText: boolean;
    tabSize: number;
    toolbar: boolean;
    toolbarTips: boolean;
}

export enum MDEActions {
    toggleBold,
    toggleItalic,
    drawLink,
    toggleHeadingSmaller,
    toggleHeadingBigger,
    drawImage,
    toggleBlockquote,
    toggleOrderedList,
    toggleUnorderedList,
    toggleCodeBlock,
    togglePreview,
    toggleStrikethrough,
    toggleHeading1,
    toggleHeading2,
    toggleHeading3,
    cleanBlock,
    drawTable,
    drawHorizontalRule,
    undo,
    redo,
    toggleSideBySide,
    toggleFullScreen,
}

export interface MDEClickEvent {
    mouseEvent: MouseEvent;
    type: MDEActions;
}
