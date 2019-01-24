import CodeMirror from 'codemirror';
import 'codemirror/addon/edit/continuelist.js';
import './tablist';
import 'codemirror/addon/display/fullscreen.js';
import 'codemirror/mode/markdown/markdown.js';
import 'codemirror/addon/mode/overlay.js';
import 'codemirror/addon/display/placeholder.js';
import 'codemirror/addon/selection/mark-selection.js';
import 'codemirror/mode/gfm/gfm.js';
import 'codemirror/mode/xml/xml.js';
// import CodeMirrorSpellChecker from 'codemirror-spell-checker';
import marked from 'marked';
import MDEActions from './mde.actions';

/**
 * SimpleMDE
 */
export default class MDE {

    // Mapping of actions that can be bound to keyboard shortcuts or toolbar buttons
    static get bindings() {
        return {
            "toggleBold": MDEActions.toggleBold,
            "toggleItalic": MDEActions.toggleItalic,
            "drawLink": MDEActions.drawLink,
            "toggleHeadingSmaller": MDEActions.toggleHeadingSmaller,
            "toggleHeadingBigger": MDEActions.toggleHeadingBigger,
            "drawImage": MDEActions.drawImage,
            "toggleBlockquote": MDEActions.toggleBlockquote,
            "toggleOrderedList": MDEActions.toggleOrderedList,
            "toggleUnorderedList": MDEActions.toggleUnorderedList,
            "toggleCodeBlock": MDEActions.toggleCodeBlock,
            "togglePreview": MDEActions.togglePreview,
            "toggleStrikethrough": MDEActions.toggleStrikethrough,
            "toggleHeading1": MDEActions.toggleHeading1,
            "toggleHeading2": MDEActions.toggleHeading2,
            "toggleHeading3": MDEActions.toggleHeading3,
            "cleanBlock": MDEActions.cleanBlock,
            "drawTable": MDEActions.drawTable,
            "drawHorizontalRule": MDEActions.drawHorizontalRule,
            "undo": MDEActions.undo,
            "redo": MDEActions.redo,
            "toggleSideBySide": MDEActions.toggleSideBySide,
            "toggleFullScreen": MDEActions.toggleFullScreen
        }
    }

    static get toolbarBuiltInButtons() {
        return {
            "bold": {
                name: "bold",
                action: MDEActions.toggleBold,
                className: "material-icons",
                icon: 'format_bold',
                title: "Bold",
                default: true
            },
            "italic": {
                name: "italic",
                action: MDEActions.toggleItalic,
                className: "material-icons",
                icon: 'format_italic',
                title: "Italic",
                default: true
            },
            "strikethrough": {
                name: "strikethrough",
                action: MDEActions.toggleStrikethrough,
                className: "material-icons",
                icon: 'strikethrough_s',
                title: "Strikethrough"
            },
            "heading": {
                name: "heading",
                action: MDEActions.toggleHeadingSmaller,
                className: "material-icons",
                icon: 'title',
                title: "Heading",
                default: true
            },
            "heading-smaller": {
                name: "heading-smaller",
                action: MDEActions.toggleHeadingSmaller,
                className: "material-icons",
                icon: 'text_fields',
                title: "Smaller Heading"
            },
            "heading-bigger": {
                name: "heading-bigger",
                action: MDEActions.toggleHeadingBigger,
                className: "material-icons",
                icon: 'format_size',
                title: "Bigger Heading"
            },
            // "heading-1": {
            //     name: "heading-1",
            //     action: toggleHeading1,
            //     className: "fa fa-header fa-header-x fa-header-1",
            //     title: "Big Heading"
            // },
            // "heading-2": {
            //     name: "heading-2",
            //     action: toggleHeading2,
            //     className: "fa fa-header fa-header-x fa-header-2",
            //     title: "Medium Heading"
            // },
            // "heading-3": {
            //     name: "heading-3",
            //     action: toggleHeading3,
            //     className: "fa fa-header fa-header-x fa-header-3",
            //     title: "Small Heading"
            // },
            "separator-1": {
                name: "separator-1"
            },
            "code": {
                name: "code",
                action: MDEActions.toggleCodeBlock,
                className: "material-icons",
                icon: 'code',
                title: "Code",
                default: true
            },
            "quote": {
                name: "quote",
                action: MDEActions.toggleBlockquote,
                className: "material-icons",
                icon: 'format_quote',
                title: "Quote",
                default: true
            },
            "unordered-list": {
                name: "unordered-list",
                action: MDEActions.toggleUnorderedList,
                className: "material-icons",
                icon: 'format_list_bulleted',
                title: "Generic List",
                default: true
            },
            "ordered-list": {
                name: "ordered-list",
                action: MDEActions.toggleOrderedList,
                className: "material-icons",
                icon: 'format_list_numbered',
                title: "Numbered List",
                default: true
            },
            "clean-block": {
                name: "clean-block",
                action: MDEActions.cleanBlock,
                className: "material-icons",
                icon: 'format_clear',
                title: "Clean block"
            },
            "separator-2": {
                name: "separator-2"
            },
            "link": {
                name: "link",
                action: MDEActions.drawLink,
                className: "material-icons",
                icon: 'insert_link',
                title: "Create Link",
                default: true
            },
            "image": {
                name: "image",
                action: MDEActions.drawImage,
                className: "material-icons",
                icon: 'insert_photo',
                title: "Insert Image",
                default: true
            },
            "table": {
                name: "table",
                action: MDEActions.drawTable,
                className: "material-icons",
                icon: 'table_chart',
                title: "Insert Table"
            },
            "horizontal-rule": {
                name: "horizontal-rule",
                action: MDEActions.drawHorizontalRule,
                className: "material-icons",
                icon: 'remove',
                title: "Insert Horizontal Line"
            },
            "separator-3": {
                name: "separator-3"
            },
            "preview": {
                name: "preview",
                action: MDEActions.togglePreview,
                className: "material-icons",
                icon: 'visibility',
                title: "Toggle Preview",
                default: true
            },
            "side-by-side": {
                name: "side-by-side",
                action: MDEActions.toggleSideBySide,
                className: "material-icons",
                icon: 'pageview',
                title: "Toggle Side by Side",
                default: true
            },
            "fullscreen": {
                name: "fullscreen",
                action: MDEActions.toggleFullScreen,
                className: "material-icons",
                icon: 'fullscreen',
                title: "Toggle Fullscreen",
                default: true
            },
            "separator-4": {
                name: "separator-4"
            },
            // "guide": {
            //     name: "guide",
            //     action: "https://simplemde.com/markdown-guide",
            //     className: "fa fa-question-circle",
            //     title: "Markdown Guide",
            //     default: true
            // },
            // "separator-5": {
            //     name: "separator-5"
            // },
            "undo": {
                name: "undo",
                action: MDEActions.undo,
                className: "material-icons",
                icon: 'undo',
                title: "Undo",
                default: true
            },
            "redo": {
                name: "redo",
                action: MDEActions.redo,
                className: "material-icons",
                icon: 'redo',
                title: "Redo",
                default: true
            }
        }
    }

    // Some variables
    static get isMac() {
        return /Mac/.test(navigator.platform);
    }

    static get shortcuts() {
        return {
            "toggleBold": "Cmd-B",
            "toggleItalic": "Cmd-I",
            "drawLink": "Cmd-K",
            "toggleHeadingSmaller": "Cmd-H",
            "toggleHeadingBigger": "Shift-Cmd-H",
            "cleanBlock": "Cmd-E",
            "drawImage": "Cmd-Alt-I",
            "toggleBlockquote": "Cmd-'",
            "toggleOrderedList": "Cmd-Alt-L",
            "toggleUnorderedList": "Cmd-L",
            "toggleCodeBlock": "Cmd-Alt-C",
            "togglePreview": "Cmd-P",
            "toggleSideBySide": "F9",
            "toggleFullScreen": "F11"
        }
    }

    static get insertTexts() {
        return {
            link: ["[", "](#url#)"],
            image: ["![](", "#url#)"],
            table: ["", "\n\n| Column 1 | Column 2 | Column 3 |\n| -------- | -------- | -------- |\n| Text     | Text     | Text     |\n\n"],
            horizontalRule: ["", "\n\n-----\n\n"]
        }
    }

    static get promptTexts() {
        return {
            link: "URL for the link:",
            image: "URL of the image:"
        }
    }

    static get blockStyles() {
        return {
            "bold": "**",
            "code": "```",
            "italic": "*"
        }
    }

    // Safari, in Private Browsing Mode, looks like it supports localStorage but all calls to setItem throw QuotaExceededError. We're going to detect this and set a variable accordingly.
    static isLocalStorageAvailable() {
        if (typeof localStorage === "object") {
            try {
                localStorage.setItem("smde_localStorage", '1');
                localStorage.removeItem("smde_localStorage");
            } catch (e) {
                return false;
            }
        } else {
            return false;
        }

        return true;
    }

    /**
     * Create icon element for toolbar.
     */
    static createIcon(options, enableTooltips, shortcuts) {
        options = options || {};
        let el = document.createElement("button");
        let self = this;

        enableTooltips = (enableTooltips === undefined) ? true : enableTooltips;

        if (options.title && enableTooltips) {
            el.title = self.createTootlip(options.title, options.action, shortcuts);

            if (self.isMac) {
                el.title = el.title.replace("Ctrl", "⌘");
                el.title = el.title.replace("Alt", "⌥");
            }
        }

        el.tabIndex = -1;
        el.className = 'md-icon-button md-button';//options.className;
        // el.innerHTML = options.icon;

        let icon = document.createElement('i');
        icon.className = options.className;
        icon.innerHTML = options.icon;
        el.appendChild(icon);

        return el;
    }

    static createTootlip(title, action, shortcuts) {
        let actionName;
        let tooltip = title;
        let self = this;

        if (action) {
            actionName = self.getBindingName(action);
            if (shortcuts[actionName]) {
                tooltip += " (" + self.fixShortcut(shortcuts[actionName]) + ")";
            }
        }

        return tooltip;
    }

    /**
     * Fix shortcut. Mac use Command, others use Ctrl.
     */
    static fixShortcut(name) {
        let self = this;
        return self.isMac ? name.replace("Ctrl", "Cmd") : name.replace("Cmd", "Ctrl");
    }

    static isMobile() {
        let check = false;
        let a = navigator.userAgent || navigator.vendor;// || window.opera;

        if (
            /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series([46])0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) ||
            /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br([ev])w|bumb|bw-([nu])|c55\/|capi|ccwa|cdm-|cell|chtm|cldc|cmd-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc-s|devi|dica|dmob|do([cp])o|ds(12|-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly([\-_])|g1 u|g560|gene|gf-5|g-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd-([mpt])|hei-|hi(pt|ta)|hp( i|ip)|hs-c|ht(c([\- _agpst])|tp)|hu(aw|tc)|i-(20|go|ma)|i230|iac([ \-\/])|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja([tv])a|jbro|jemu|jigs|kddi|keji|kgt([ \/])|klon|kpt |kwc-|kyo([ck])|le(no|xi)|lg( g|\/([klu])|50|54|-[a-w])|libw|lynx|m1-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t([\- ov])|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30([02])|n50([025])|n7(0([01])|10)|ne(([cm])-|on|tf|wf|wg|wt)|nok([6i])|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan([adt])|pdxg|pg(13|-([1-8]|c))|phil|pire|pl(ay|uc)|pn-2|po(ck|rt|se)|prox|psio|pt-g|qa-a|qc(07|12|21|32|60|-[2-7]|i-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h-|oo|p-)|sdk\/|se(c([\-01])|47|mc|nd|ri)|sgh-|shar|sie([\-m])|sk-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h-|v-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl-|tdg-|tel([im])|tim-|t-mo|to(pl|sh)|ts(70|m-|m3|m5)|tx-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c([\- ])|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas-|your|zeto|zte-/i.test(a.substr(0, 4))
        ) {
            check = true;
        }

        return check;
    };

    static getBindingName(f) {
        let self = this;

        for (let key in self.bindings) {
            if (self.bindings.hasOwnProperty(key) && self.bindings[key] === f) {
                return key;
            }
        }

        return null;
    };

    static createSep() {
        let el = document.createElement("i");

        el.className = "separator";
        el.innerHTML = "|";

        return el;
    }

    /* The right word count in respect for CJK. */
    static wordCount(data) {
        let pattern = /[a-zA-Z0-9_\u0392-\u03c9\u0410-\u04F9]+|[\u4E00-\u9FFF\u3400-\u4dbf\uf900-\ufaff\u3040-\u309f\uac00-\ud7af]+/g;
        let m = data.match(pattern);
        let count = 0;

        if (m === null) {
            return count;
        }

        for (let i = 0; i < m.length; i++) {
            if (m[i].charCodeAt(0) >= 0x4E00) {
                count += m[i].length;
            } else {
                count += 1;
            }
        }

        return count;
    }

    constructor(options) {
        let self = this.constructor;
        // Handle options parameter
        // options = options || {};
        options = Object.assign({
            initialValue: undefined,
            renderingConfig: {
                singleLineBreaks: true,
                codeSyntaxHighlighting: false
            },
            showIcons: undefined,
            autosave: {
                unique_id: undefined
            },
            spellChecker: false,
            lineWrapping: true,
            forceSync: false,
            autofocus: false,
            indentWithTabs: true,
            toolbarGuideIcon: false,
            hideIcons: undefined,
            toolbarTips: true
        }, options);

        // Used later to refer to it"s parent
        options.parent = this;

        // Check if Font Awesome needs to be auto downloaded
        // let autoDownloadFA = true;

        // if (options.autoDownloadFontAwesome === false) {
        //     autoDownloadFA = false;
        // }

        // if (options.autoDownloadFontAwesome !== true) {
        //     let styleSheets = document.styleSheets;
        //     for (let i = 0; i < styleSheets.length; i++) {
        //         if (!styleSheets[i].href) {
        //             continue;
        //         }
        //
        //         if (styleSheets[i].href.indexOf("//maxcdn.bootstrapcdn.com/font-awesome/") > -1) {
        //             autoDownloadFA = false;
        //         }
        //     }
        // }

        // if (autoDownloadFA) {
        //     let link = document.createElement("link");
        //     link.rel = "stylesheet";
        //     link.href = "https://maxcdn.bootstrapcdn.com/font-awesome/latest/css/font-awesome.min.css";
        //     document.getElementsByTagName("head")[0].appendChild(link);
        // }

        // Find the textarea to use
        if (options.element) {
            this.element = options.element;
        } else if (options.element === null) {
            // This means that the element option was specified, but no element was found
            console.log("SimpleMDE: Error. No element was found.");
            return;
        }

        // Handle toolbar
        if (options.toolbar === undefined) {
            // Initialize
            options.toolbar = [];

            // Loop over the built in buttons, to get the preferred order
            for (let key in self.toolbarBuiltInButtons) {
                if (self.toolbarBuiltInButtons.hasOwnProperty(key)) {
                    if (key.indexOf("separator-") !== -1) {
                        options.toolbar.push("|");
                    }

                    if (self.toolbarBuiltInButtons[key].default === true || (options.showIcons && options.showIcons.constructor === Array && options.showIcons.indexOf(key) !== -1)) {
                        options.toolbar.push(key);
                    }
                }
            }
        }

        // Handle status bar
        if (!options.hasOwnProperty("status")) {
            options.status = ["autosave", "lines", "words", "cursor"];
        }

        // Add default preview rendering function
        if (!options.previewRender) {
            options.previewRender = (plainText) => {
                return options.parent.markdown(plainText);
            };
        }

        // Set default options for parsing config
        options.parsingConfig = Object.assign({
            highlightFormatting: true // needed for toggleCodeBlock to detect types of code
        }, options.parsingConfig || {});

        // Merging the insertTexts, with the given options
        options.insertTexts = Object.assign({}, self.insertTexts, options.insertTexts || {});

        // Merging the promptTexts, with the given options
        options.promptTexts = self.promptTexts;

        // Merging the blockStyles, with the given options
        options.blockStyles = Object.assign({}, self.blockStyles, options.blockStyles || {});

        // Merging the shortcuts, with the given options
        options.shortcuts = Object.assign({}, self.shortcuts, options.shortcuts || {});

        // Change unique_id to uniqueId for backwards compatibility
        if (options.autosave !== undefined && options.autosave.unique_id !== undefined && options.autosave.unique_id !== "") {
            options.autosave.uniqueId = options.autosave.unique_id;
        }

        // Update this options
        this.options = options;

        // Auto render
        this.render();

        // The codemirror component is only available after rendering
        // so, the setter for the initialValue can only run after
        // the element has been rendered
        if (options.initialValue && (!this.options.autosave || this.options.autosave.foundSavedValue !== true)) {
            this.value(options.initialValue);
        }
    }

    /**
     * Default markdown render.
     */
    markdown(text) {
        if (marked) {
            // Initialize
            let markedOptions = {};

            // Update options
            markedOptions.breaks = !(this.options && this.options.renderingConfig && this.options.renderingConfig.singleLineBreaks === false);

            if (this.options && this.options.renderingConfig && this.options.renderingConfig.codeSyntaxHighlighting === true && window.hljs) {
                markedOptions.highlight = function (code) {
                    return window.hljs ? window.hljs.highlightAuto(code).value : null;
                };
            }

            // Set options
            marked.setOptions(markedOptions);

            // Return
            return marked(text);
        }
    }

    /**
     * Render editor to the given element.
     */
    render(el) {
        let self = this.constructor;

        if (!el) {
            el = this.element || document.getElementsByTagName("textarea")[0];
        }

        if (this._rendered && this._rendered === el) {
            // Already rendered.
            return;
        }

        this.element = el;
        let options = this.options;

        // let self = this;
        let keyMaps = {};

        for (let key in options.shortcuts) {
            // null stands for "do not bind this command"
            if (
                options.shortcuts.hasOwnProperty(key) && options.shortcuts[key] !== null &&
                self.bindings.hasOwnProperty(key) && self.bindings[key] !== null
            ) {
                // ((key) => {
                keyMaps[self.fixShortcut(options.shortcuts[key])] = (() => {
                    self.bindings[key](this);
                });
                // })(key);
            }
        }

        keyMaps["Enter"] = "newlineAndIndentContinueMarkdownList";
        keyMaps["Tab"] = "tabAndIndentMarkdownList";
        keyMaps["Shift-Tab"] = "shiftTabAndUnindentMarkdownList";
        keyMaps["Esc"] = ((cm) => {
            if (cm.getOption("fullScreen")) {
                this.toggleFullScreen();
            }
        });

        document.addEventListener("keydown", (e) => {
            e = e || window.event;
            if (e.key === 'Escape') {
                if (this.codemirror.getOption("fullScreen")) {
                    this.toggleFullScreen();
                }
            }
        }, false);

        let mode, backdrop = undefined;

        if (options.spellChecker !== false) {
            // mode = "spell-checker";
            // backdrop = options.parsingConfig;
            // backdrop.name = "gfm";
            // backdrop.gitHubSpice = false;
            //
            // CodeMirrorSpellChecker({
            //     codeMirrorInstance: CodeMirror
            // });
        } else {
            mode = options.parsingConfig;
            mode.name = "gfm";
            mode.gitHubSpice = false;
        }

        this.codemirror = CodeMirror.fromTextArea(el, {
            mode: mode,
            backdrop: backdrop,
            theme: "paper",
            tabSize: (options.tabSize !== undefined) ? options.tabSize : 2,
            indentUnit: (options.tabSize !== undefined) ? options.tabSize : 2,
            indentWithTabs: options.indentWithTabs,
            lineNumbers: false,
            autofocus: options.autofocus,
            extraKeys: keyMaps,
            lineWrapping: options.lineWrapping,
            allowDropFileTypes: ["text/plain"],
            placeholder: options.placeholder || el.getAttribute("placeholder") || "",
            styleSelectedText: (options.styleSelectedText !== undefined) ? options.styleSelectedText : true
        });

        if (options.forceSync === true) {
            // let cm = this.codemirror;
            this.codemirror.on("change", () => {
                this.codemirror.save();
            });
        }

        this.gui = {};

        if (options.toolbar !== false) {
            this.gui.toolbar = this.createToolbar();
        }
        if (options.status !== false) {
            this.gui.statusbar = this.createStatusbar();
        }
        if (options.autosave !== undefined && options.autosave.enabled === true) {
            this.autosave();
        }

        this.gui.sideBySide = this.createSideBySide();
        this._rendered = this.element;

        // Fixes CodeMirror bug (#344)
        let temp_cm = this.codemirror;
        setTimeout(() => {
            temp_cm.refresh();
        }, 0);
    }

    autosave() {
        if (this.constructor.isLocalStorageAvailable()) {
            let simplemde = this;

            if (this.options.autosave.uniqueId === undefined || this.options.autosave.uniqueId === "") {
                console.log("SimpleMDE: You must set a uniqueId to use the autosave feature");
                return;
            }

            if (simplemde.element.form != null && simplemde.element.form !== undefined) {
                simplemde.element.form.addEventListener("submit", () => {
                    localStorage.removeItem("smde_" + simplemde.options.autosave.uniqueId);
                });
            }

            if (this.options.autosave.loaded !== true) {
                if (typeof localStorage.getItem("smde_" + this.options.autosave.uniqueId) === "string" && localStorage.getItem("smde_" + this.options.autosave.uniqueId) !== "") {
                    this.codemirror.setValue(localStorage.getItem("smde_" + this.options.autosave.uniqueId));
                    this.options.autosave.foundSavedValue = true;
                }

                this.options.autosave.loaded = true;
            }

            localStorage.setItem("smde_" + this.options.autosave.uniqueId, simplemde.value());

            let el = document.getElementById("autosaved");
            if (el != null && el !== undefined && el !== "") {
                let d = new Date();
                let hh = d.getHours();
                let m = d.getMinutes();
                let dd = "am";
                let h = hh;
                if (h >= 12) {
                    h = hh - 12;
                    dd = "pm";
                }
                if (h === 0) {
                    h = 12;
                }
                m = m < 10 ? "0" + m : m;

                el.innerHTML = "Autosaved: " + h + ":" + m + " " + dd;
            }

            this.autosaveTimeoutId = setTimeout(() => {
                simplemde.autosave();
            }, this.options.autosave.delay || 10000);
        } else {
            console.log("SimpleMDE: localStorage not available, cannot autosave");
        }
    }

    clearAutosavedValue() {
        if (this.constructor.isLocalStorageAvailable()) {
            if (this.options.autosave === undefined || this.options.autosave.uniqueId === undefined || this.options.autosave.uniqueId === "") {
                console.log("SimpleMDE: You must set a uniqueId to clear the autosave value");
                return;
            }

            localStorage.removeItem("smde_" + this.options.autosave.uniqueId);
        } else {
            console.log("SimpleMDE: localStorage not available, cannot autosave");
        }
    }

    createSideBySide() {
        let cm = this.codemirror;
        let wrapper = cm.getWrapperElement();
        let preview = wrapper.nextSibling;

        if (!preview || !/editor-preview-side/.test(preview.className)) {
            preview = document.createElement("div");
            preview.className = "editor-preview-side";
            wrapper.parentNode.insertBefore(preview, wrapper.nextSibling);
        }

        // Syncs scroll  editor -> preview
        let cScroll = false;
        let pScroll = false;
        cm.on("scroll", (v) => {
            if (cScroll) {
                cScroll = false;
                return;
            }
            pScroll = true;
            let height = v.getScrollInfo().height - v.getScrollInfo().clientHeight;
            let ratio = parseFloat(v.getScrollInfo().top) / height;
            preview.scrollTop = (preview.scrollHeight - preview.clientHeight) * ratio;
        });

        // Syncs scroll  preview -> editor
        preview.onscroll = (() => {
            if (pScroll) {
                pScroll = false;
                return;
            }
            cScroll = true;
            let height = preview.scrollHeight - preview.clientHeight;
            let ratio = parseFloat(preview.scrollTop) / height;
            let move = (cm.getScrollInfo().height - cm.getScrollInfo().clientHeight) * ratio;
            cm.scrollTo(0, move);
        });
        return preview;
    }

    createToolbar(items) {
        let self = this.constructor;
        items = items || this.options.toolbar;

        if (!items || items.length === 0) {
            return;
        }

        // let i;
        for (let i = 0; i < items.length; i++) {
            if (self.toolbarBuiltInButtons[items[i]] !== undefined) {
                items[i] = self.toolbarBuiltInButtons[items[i]];
            }
        }

        let bar = document.createElement("div");
        bar.className = "editor-toolbar";

        // let self = this;

        let toolbarData = {};
        this.toolbar = items;

        for (let i = 0; i < items.length; i++) {
            if (items[i].name === "guide" && this.options.toolbarGuideIcon === false) {
                continue;
            }

            if (this.options.hideIcons && this.options.hideIcons.indexOf(items[i].name) !== -1) {
                continue;
            }

            // Fullscreen does not work well on mobile devices (even tablets)
            // In the future, hopefully this can be resolved
            if ((items[i].name === "fullscreen" || items[i].name === "side-by-side") && self.isMobile()) {
                continue;
            }

            // Don't include trailing separators
            if (items[i] === "|") {
                let nonSeparatorIconsFollow = false;

                for (let x = (i + 1); x < items.length; x++) {
                    if (items[x] !== "|" && (!this.options.hideIcons || this.options.hideIcons.indexOf(items[x].name) === -1)) {
                        nonSeparatorIconsFollow = true;
                    }
                }

                if (!nonSeparatorIconsFollow) {
                    continue;
                }
            }

            // Create the icon and append to the toolbar
            ((item) => {
                let el = (item === "|" ? self.createSep() : self.createIcon(item, this.options.toolbarTips, this.options.shortcuts));

                // bind events, special for info
                if (item.action) {
                    switch (typeof item.action) {
                        case 'function':
                            el.onclick = (e) => {
                                e.preventDefault();
                                item.action(this);
                            };
                            break;

                        case 'string':
                            el.href = item.action;
                            el.target = "_blank";
                            break;
                    }
                }

                toolbarData[item.name || item] = el;
                bar.appendChild(el);
            })(items[i]);
        }

        this.toolbarElements = toolbarData;

        let cm = this.codemirror;
        cm.on("cursorActivity", () => {
            let stat = this.getState(); //MDEActions.getState(cm);

            for (let key in toolbarData) {
                // ((key) => {
                if (toolbarData.hasOwnProperty(key)) {
                    let el = toolbarData[key];
                    if (stat[key]) {
                        el.className += " active";
                    } else if (key !== "fullscreen" && key !== "side-by-side") {
                        el.className = el.className.replace(/\s*active\s*/g, "");
                    }
                }
                // })(key);
            }
        });

        let cmWrapper = cm.getWrapperElement();
        cmWrapper.parentNode.insertBefore(bar, cmWrapper);
        return bar;
    }

    createStatusbar(status) {
        // Initialize
        let self = this.constructor;
        status = status || this.options.status;
        let options = this.options;
        let cm = this.codemirror;

        // Make sure the status variable is valid
        if (!status || status.length === 0) {
            return;
        }

        // Set up the built-in items
        let items = [];
        let onUpdate, defaultValue;

        for (let i = 0; i < status.length; i++) {
            // Reset some values
            onUpdate = undefined;
            defaultValue = undefined;

            // Handle if custom or not
            if (typeof status[i] === "object") {
                items.push({
                    className: status[i].className,
                    defaultValue: status[i].defaultValue,
                    onUpdate: status[i].onUpdate
                });
            } else {
                let name = status[i];

                switch (name) {
                    case 'words':
                        defaultValue = (el) => {
                            el.innerHTML = self.wordCount(cm.getValue());
                        };
                        onUpdate = (el) => {
                            el.innerHTML = self.wordCount(cm.getValue());
                        };
                        break;

                    case 'lines':
                        defaultValue = (el) => {
                            el.innerHTML = cm.lineCount();
                        };
                        onUpdate = (el) => {
                            el.innerHTML = cm.lineCount();
                        };
                        break;

                    case 'cursor':
                        defaultValue = (el) => {
                            el.innerHTML = "0:0";
                        };
                        onUpdate = (el) => {
                            let pos = cm.getCursor();
                            el.innerHTML = pos.line + ":" + pos.ch;
                        };
                        break;

                    case 'autosave':
                        defaultValue = (el) => {
                            if (options.autosave !== undefined && options.autosave.enabled === true) {
                                el.setAttribute("id", "autosaved");
                            }
                        };
                        break;
                }

                items.push({
                    className: name,
                    defaultValue: defaultValue,
                    onUpdate: onUpdate
                });
            }
        }

        // Create element for the status bar
        let bar = document.createElement("div");
        bar.className = "editor-statusbar";

        // Create a new span for each item
        for (let i = 0; i < items.length; i++) {
            // Store in temporary variable
            let item = items[i];

            // Create span element
            let el = document.createElement("span");
            el.className = item.className;

            // Ensure the defaultValue is a function
            if (typeof item.defaultValue === "function") {
                item.defaultValue(el);
            }

            // Ensure the onUpdate is a function
            if (typeof item.onUpdate === "function") {
                // Create a closure around the span of the current action, then execute the onUpdate handler
                this.codemirror.on('update', () => {
                    item.onUpdate(el);
                });
            }

            // Append the item to the status bar
            bar.appendChild(el);
        }

        // Insert the status bar into the DOM
        let cmWrapper = this.codemirror.getWrapperElement();
        cmWrapper.parentNode.insertBefore(bar, cmWrapper.nextSibling);

        return bar;
    }

    value(val) {
        if (val === undefined) {
            return this.codemirror.getValue();
        } else {
            this.codemirror.getDoc().setValue(val);
            return this;
        }
    }

    // ----

    // toggleBold() {
    //     MDEActions.toggleBold(this);
    // }

    // toggleItalic() {
    //     MDEActions.toggleItalic(this);
    // }
    //
    // toggleStrikethrough() {
    //     MDEActions.toggleStrikethrough(this);
    // }
    //
    // toggleBlockquote() {
    //     MDEActions.toggleBlockquote(this);
    // }
    //
    // toggleHeadingSmaller() {
    //     MDEActions.toggleHeadingSmaller(this);
    // }
    //
    // toggleHeadingBigger() {
    //     MDEActions.toggleHeadingBigger(this);
    // }
    //
    // toggleHeading1() {
    //     MDEActions.toggleHeading1(this);
    // }
    //
    // toggleHeading2() {
    //     MDEActions.toggleHeading2(this);
    // }
    //
    // toggleHeading3() {
    //     MDEActions.toggleHeading3(this);
    // }
    //
    // toggleCodeBlock() {
    //     MDEActions.toggleCodeBlock(this);
    // }
    //
    // toggleUnorderedList() {
    //     MDEActions.toggleUnorderedList(this);
    // }
    //
    // toggleOrderedList() {
    //     MDEActions.toggleOrderedList(this);
    // }
    //
    // cleanBlock() {
    //     MDEActions.cleanBlock(this);
    // }
    //
    // drawLink() {
    //     MDEActions.drawLink(this);
    // }
    //
    // drawImage() {
    //     MDEActions.drawImage(this);
    // }
    //
    // drawTable() {
    //     MDEActions.drawTable(this);
    // }
    //
    // drawHorizontalRule() {
    //     MDEActions.drawHorizontalRule(this);
    // }

    // undo() {
    //     MDEActions.undo(this);
    // }
    //
    // redo() {
    //     MDEActions.redo(this);
    // }

    // togglePreview() {
    //     MDEActions.togglePreview(this);
    // }
    //
    // toggleSideBySide() {
    //     MDEActions.toggleSideBySide(this);
    // }

    toggleFullScreen() {
        MDEActions.toggleFullScreen(this);
    }

    // ---

    isPreviewActive() {
        let cm = this.codemirror;
        let wrapper = cm.getWrapperElement();
        let preview = wrapper.lastChild;

        return /editor-preview-active/.test(preview.className);
    }

    isSideBySideActive() {
        let cm = this.codemirror;
        let wrapper = cm.getWrapperElement();
        let preview = wrapper.nextSibling;

        return /editor-preview-active-side/.test(preview.className);
    }

    isFullscreenActive() {
        let cm = this.codemirror;

        return cm.getOption("fullScreen");
    }

    getState() {
        let cm = this.codemirror;

        return MDEActions.getState(cm);
    }

    toTextArea() {
        let cm = this.codemirror;
        let wrapper = cm.getWrapperElement();

        if (wrapper.parentNode) {
            if (this.gui.toolbar) {
                wrapper.parentNode.removeChild(this.gui.toolbar);
            }
            if (this.gui.statusbar) {
                wrapper.parentNode.removeChild(this.gui.statusbar);
            }
            if (this.gui.sideBySide) {
                wrapper.parentNode.removeChild(this.gui.sideBySide);
            }
        }

        cm.toTextArea();

        if (this.autosaveTimeoutId) {
            clearTimeout(this.autosaveTimeoutId);
            this.autosaveTimeoutId = undefined;
            this.clearAutosavedValue();
        }
    };
}