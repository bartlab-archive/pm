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

/**
 * SimpleMDE
 */
export default class MDE {

    static get toolbarBuiltInButtons() {
        return {
            "bold": {
                name: "bold",
                action: toggleBold,
                className: "material-icons",
                icon: 'format_bold',
                title: "Bold",
                default: true
            },
            "italic": {
                name: "italic",
                action: toggleItalic,
                className: "material-icons",
                icon: 'format_italic',
                title: "Italic",
                default: true
            },
            "strikethrough": {
                name: "strikethrough",
                action: toggleStrikethrough,
                className: "material-icons",
                icon: 'strikethrough_s',
                title: "Strikethrough"
            },
            "heading": {
                name: "heading",
                action: toggleHeadingSmaller,
                className: "material-icons",
                icon: 'title',
                title: "Heading",
                default: true
            },
            "heading-smaller": {
                name: "heading-smaller",
                action: toggleHeadingSmaller,
                className: "material-icons",
                icon: 'text_fields',
                title: "Smaller Heading"
            },
            "heading-bigger": {
                name: "heading-bigger",
                action: toggleHeadingBigger,
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
                action: toggleCodeBlock,
                className: "material-icons",
                icon: 'code',
                title: "Code",
                default: true
            },
            "quote": {
                name: "quote",
                action: toggleBlockquote,
                className: "material-icons",
                icon: 'format_quote',
                title: "Quote",
                default: true
            },
            "unordered-list": {
                name: "unordered-list",
                action: toggleUnorderedList,
                className: "material-icons",
                icon: 'format_list_bulleted',
                title: "Generic List",
                default: true
            },
            "ordered-list": {
                name: "ordered-list",
                action: toggleOrderedList,
                className: "material-icons",
                icon: 'format_list_numbered',
                title: "Numbered List",
                default: true
            },
            "clean-block": {
                name: "clean-block",
                action: cleanBlock,
                className: "material-icons",
                icon: 'format_clear',
                title: "Clean block"
            },
            "separator-2": {
                name: "separator-2"
            },
            "link": {
                name: "link",
                action: drawLink,
                className: "material-icons",
                icon: 'insert_link',
                title: "Create Link",
                default: true
            },
            "image": {
                name: "image",
                action: drawImage,
                className: "material-icons",
                icon: 'insert_photo',
                title: "Insert Image",
                default: true
            },
            "table": {
                name: "table",
                action: drawTable,
                className: "material-icons",
                icon: 'table_chart',
                title: "Insert Table"
            },
            "horizontal-rule": {
                name: "horizontal-rule",
                action: drawHorizontalRule,
                className: "material-icons",
                icon: 'remove',
                title: "Insert Horizontal Line"
            },
            "separator-3": {
                name: "separator-3"
            },
            "preview": {
                name: "preview",
                action: togglePreview,
                className: "material-icons",
                icon: 'visibility',
                title: "Toggle Preview",
                default: true
            },
            "side-by-side": {
                name: "side-by-side",
                action: toggleSideBySide,
                className: "material-icons",
                icon: 'pageview',
                title: "Toggle Side by Side",
                default: true
            },
            "fullscreen": {
                name: "fullscreen",
                action: toggleFullScreen,
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
                action: undo,
                className: "material-icons",
                icon: 'undo',
                title: "Undo",
                default: true
            },
            "redo": {
                name: "redo",
                action: redo,
                className: "material-icons",
                icon: 'redo',
                title: "Redo",
                default: true
            }
        };
    }

    // Some variables
    static get isMac() {
        return /Mac/.test(navigator.platform);
    }

    // Safari, in Private Browsing Mode, looks like it supports localStorage but all calls to setItem throw QuotaExceededError. We're going to detect this and set a variable accordingly.
    static isLocalStorageAvailable() {
        if (typeof localStorage === "object") {
            try {
                localStorage.setItem("smde_localStorage", 1);
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
        let a = navigator.userAgent || navigator.vendor || window.opera;

        if (
            /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) ||
            /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))
        ) {
            check = true;
        }

        return check;
    };

    static getBindingName(f) {
        for (let key in bindings) {
            if (bindings[key] === f) {
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

    constructor(options) {
        let self = this.constructor;
        // Handle options parameter
        options = options || {};

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

                    if (self.toolbarBuiltInButtons[key].default === true || (options.showIcons && options.showIcons.constructor === Array && options.showIcons.indexOf(key) != -1)) {
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
        options.insertTexts = Object.assign({}, insertTexts, options.insertTexts || {});

        // Merging the promptTexts, with the given options
        options.promptTexts = promptTexts;

        // Merging the blockStyles, with the given options
        options.blockStyles = Object.assign({}, blockStyles, options.blockStyles || {});

        // Merging the shortcuts, with the given options
        options.shortcuts = Object.assign({}, shortcuts, options.shortcuts || {});

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
            if (this.options && this.options.renderingConfig && this.options.renderingConfig.singleLineBreaks === false) {
                markedOptions.breaks = false;
            } else {
                markedOptions.breaks = true;
            }

            if (this.options && this.options.renderingConfig && this.options.renderingConfig.codeSyntaxHighlighting === true && window.hljs) {
                markedOptions.highlight = function (code) {
                    return window.hljs.highlightAuto(code).value;
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
            if (options.shortcuts[key] !== null && bindings[key] !== null) {
                // ((key) => {
                keyMaps[self.fixShortcut(options.shortcuts[key])] = () => {
                    bindings[key](this);
                };
                // })(key);
            }
        }

        keyMaps["Enter"] = "newlineAndIndentContinueMarkdownList";
        keyMaps["Tab"] = "tabAndIndentMarkdownList";
        keyMaps["Shift-Tab"] = "shiftTabAndUnindentMarkdownList";
        keyMaps["Esc"] = (cm) => {
            if (cm.getOption("fullScreen")) {
                toggleFullScreen(this);
            }
        };

        document.addEventListener("keydown", (e) => {
            e = e || window.event;

            if (e.keyCode === 27) {
                if (this.codemirror.getOption("fullScreen")) {
                    toggleFullScreen(this);
                }
            }
        }, false);

        let mode, backdrop;

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
            indentWithTabs: !!options.indentWithTabs,
            lineNumbers: false,
            autofocus: !!options.autofocus,
            extraKeys: keyMaps,
            lineWrapping: !!options.lineWrapping,
            allowDropFileTypes: ["text/plain"],
            placeholder: options.placeholder || el.getAttribute("placeholder") || "",
            styleSelectedText: (options.styleSelectedText !== undefined) ? options.styleSelectedText : true
        });

        if (options.forceSync === true) {
            let cm = this.codemirror;
            cm.on("change", () => {
                cm.save();
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
        preview.onscroll = () => {
            if (pScroll) {
                pScroll = false;
                return;
            }
            cScroll = true;
            let height = preview.scrollHeight - preview.clientHeight;
            let ratio = parseFloat(preview.scrollTop) / height;
            let move = (cm.getScrollInfo().height - cm.getScrollInfo().clientHeight) * ratio;
            cm.scrollTo(0, move);
        };
        return preview;
    }

    createToolbar(items) {
        let self = this.constructor;
        items = items || this.options.toolbar;

        if (!items || items.length === 0) {
            return;
        }

        let i;
        for (i = 0; i < items.length; i++) {
            if (self.toolbarBuiltInButtons[items[i]] !== undefined) {
                items[i] = self.toolbarBuiltInButtons[items[i]];
            }
        }

        let bar = document.createElement("div");
        bar.className = "editor-toolbar";

        // let self = this;

        let toolbarData = {};
        this.toolbar = items;

        for (i = 0; i < items.length; i++) {
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
                    switch (item.action) {
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
            let stat = getState(cm);

            for (let key in toolbarData) {
                // ((key) => {
                let el = toolbarData[key];
                if (stat[key]) {
                    el.className += " active";
                } else if (key !== "fullscreen" && key !== "side-by-side") {
                    el.className = el.className.replace(/\s*active\s*/g, "");
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
        status = status || this.options.status;
        let options = this.options;
        let cm = this.codemirror;


        // Make sure the status variable is valid
        if (!status || status.length === 0) {
            return;
        }


        // Set up the built-in items
        let items = [];
        let i, onUpdate, defaultValue;

        for (i = 0; i < status.length; i++) {
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

                if (name === "words") {
                    defaultValue = (el) => {
                        el.innerHTML = wordCount(cm.getValue());
                    };
                    onUpdate = (el) => {
                        el.innerHTML = wordCount(cm.getValue());
                    };
                } else if (name === "lines") {
                    defaultValue = (el) => {
                        el.innerHTML = cm.lineCount();
                    };
                    onUpdate = (el) => {
                        el.innerHTML = cm.lineCount();
                    };
                } else if (name === "cursor") {
                    defaultValue = (el) => {
                        el.innerHTML = "0:0";
                    };
                    onUpdate = (el) => {
                        let pos = cm.getCursor();
                        el.innerHTML = pos.line + ":" + pos.ch;
                    };
                } else if (name === "autosave") {
                    defaultValue = (el) => {
                        if (options.autosave !== undefined && options.autosave.enabled === true) {
                            el.setAttribute("id", "autosaved");
                        }
                    };
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
        for (i = 0; i < items.length; i++) {
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
                this.codemirror.on("update", (function (el, item) {
                    return () => {
                        item.onUpdate(el);
                    };
                }(el, item)));
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

    toggleBold() {
        toggleBold(this);
    }

    toggleItalic() {
        toggleItalic(this);
    }

    toggleStrikethrough() {
        toggleStrikethrough(this);
    }

    toggleBlockquote() {
        toggleBlockquote(this);
    }

    toggleHeadingSmaller() {
        toggleHeadingSmaller(this);
    }

    toggleHeadingBigger() {
        toggleHeadingBigger(this);
    }

    toggleHeading1() {
        toggleHeading1(this);
    }

    toggleHeading2() {
        toggleHeading2(this);
    }

    toggleHeading3() {
        toggleHeading3(this);
    }

    toggleCodeBlock() {
        toggleCodeBlock(this);
    }

    toggleUnorderedList() {
        toggleUnorderedList(this);
    }

    toggleOrderedList() {
        toggleOrderedList(this);
    }

    cleanBlock() {
        cleanBlock(this);
    }

    drawLink() {
        drawLink(this);
    }

    drawImage() {
        drawImage(this);
    }

    drawTable() {
        drawTable(this);
    }

    drawHorizontalRule() {
        drawHorizontalRule(this);
    }

    undo() {
        undo(this);
    }

    redo() {
        redo(this);
    }

    togglePreview() {
        togglePreview(this);
    }

    toggleSideBySide() {
        toggleSideBySide(this);
    }

    toggleFullScreen() {
        toggleFullScreen(this);
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

        return getState(cm);
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

/**
 * Bind static methods for exports.
 */
MDE.toggleBold = toggleBold;
MDE.toggleItalic = toggleItalic;
MDE.toggleStrikethrough = toggleStrikethrough;
MDE.toggleBlockquote = toggleBlockquote;
MDE.toggleHeadingSmaller = toggleHeadingSmaller;
MDE.toggleHeadingBigger = toggleHeadingBigger;
MDE.toggleHeading1 = toggleHeading1;
MDE.toggleHeading2 = toggleHeading2;
MDE.toggleHeading3 = toggleHeading3;
MDE.toggleCodeBlock = toggleCodeBlock;
MDE.toggleUnorderedList = toggleUnorderedList;
MDE.toggleOrderedList = toggleOrderedList;
MDE.cleanBlock = cleanBlock;
MDE.drawLink = drawLink;
MDE.drawImage = drawImage;
MDE.drawTable = drawTable;
MDE.drawHorizontalRule = drawHorizontalRule;
MDE.undo = undo;
MDE.redo = redo;
MDE.togglePreview = togglePreview;
MDE.toggleSideBySide = toggleSideBySide;
MDE.toggleFullScreen = toggleFullScreen;

// Mapping of actions that can be bound to keyboard shortcuts or toolbar buttons
var bindings = {
    "toggleBold": toggleBold,
    "toggleItalic": toggleItalic,
    "drawLink": drawLink,
    "toggleHeadingSmaller": toggleHeadingSmaller,
    "toggleHeadingBigger": toggleHeadingBigger,
    "drawImage": drawImage,
    "toggleBlockquote": toggleBlockquote,
    "toggleOrderedList": toggleOrderedList,
    "toggleUnorderedList": toggleUnorderedList,
    "toggleCodeBlock": toggleCodeBlock,
    "togglePreview": togglePreview,
    "toggleStrikethrough": toggleStrikethrough,
    "toggleHeading1": toggleHeading1,
    "toggleHeading2": toggleHeading2,
    "toggleHeading3": toggleHeading3,
    "cleanBlock": cleanBlock,
    "drawTable": drawTable,
    "drawHorizontalRule": drawHorizontalRule,
    "undo": undo,
    "redo": redo,
    "toggleSideBySide": toggleSideBySide,
    "toggleFullScreen": toggleFullScreen
};

var shortcuts = {
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
};

/**
 * The state of CodeMirror at the given position.
 */
function getState(cm, pos) {
    pos = pos || cm.getCursor("start");
    let stat = cm.getTokenAt(pos);
    if (!stat.type) {
        return {};
    }

    let types = stat.type.split(" ");

    let ret = {}, data, text;
    for (let i = 0; i < types.length; i++) {
        data = types[i];
        if (data === "strong") {
            ret.bold = true;
        } else if (data === "variable-2") {
            text = cm.getLine(pos.line);
            if (/^\s*\d+\.\s/.test(text)) {
                ret["ordered-list"] = true;
            } else {
                ret["unordered-list"] = true;
            }
        } else if (data === "atom") {
            ret.quote = true;
        } else if (data === "em") {
            ret.italic = true;
        } else if (data === "quote") {
            ret.quote = true;
        } else if (data === "strikethrough") {
            ret.strikethrough = true;
        } else if (data === "comment") {
            ret.code = true;
        } else if (data === "link") {
            ret.link = true;
        } else if (data === "tag") {
            ret.image = true;
        } else if (data.match(/^header(-[1-6])?$/)) {
            ret[data.replace("header", "heading")] = true;
        }
    }
    return ret;
}


// Saved overflow setting
var saved_overflow = "";

/**
 * Toggle full screen of the editor.
 */
function toggleFullScreen(editor) {
    // Set fullscreen
    let cm = editor.codemirror;
    cm.setOption("fullScreen", !cm.getOption("fullScreen"));

    // Prevent scrolling on body during fullscreen active
    if (cm.getOption("fullScreen")) {
        saved_overflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
    } else {
        document.body.style.overflow = saved_overflow;
    }

    // Update toolbar class
    let wrap = cm.getWrapperElement();

    if (!/fullscreen/.test(wrap.previousSibling.className)) {
        wrap.previousSibling.className += " fullscreen";
    } else {
        wrap.previousSibling.className = wrap.previousSibling.className.replace(/\s*fullscreen\b/, "");
    }

    // Update toolbar button
    let toolbarButton = editor.toolbarElements.fullscreen;

    if (!/active/.test(toolbarButton.className)) {
        toolbarButton.className += " active";
    } else {
        toolbarButton.className = toolbarButton.className.replace(/\s*active\s*/g, "");
    }

    // Hide side by side if needed
    let sidebyside = cm.getWrapperElement().nextSibling;
    if (/editor-preview-active-side/.test(sidebyside.className)) {
        toggleSideBySide(editor);
    }
}

/**
 * Action for toggling bold.
 */
function toggleBold(editor) {
    _toggleBlock(editor, "bold", editor.options.blockStyles.bold);
}

/**
 * Action for toggling italic.
 */
function toggleItalic(editor) {
    _toggleBlock(editor, "italic", editor.options.blockStyles.italic);
}

/**
 * Action for toggling strikethrough.
 */
function toggleStrikethrough(editor) {
    _toggleBlock(editor, "strikethrough", "~~");
}

/**
 * Action for toggling code block.
 */
function toggleCodeBlock(editor) {
    let fenceCharsToInsert = editor.options.blockStyles.code;

    function fencing_line(line) {
        /* return true, if this is a ``` or ~~~ line */
        if (typeof line !== "object") {
            throw "fencing_line() takes a 'line' object (not a line number, or line text).  Got: " + typeof line + ": " + line;
        }
        return line.styles && line.styles[2] && line.styles[2].indexOf("formatting-code-block") !== -1;
    }

    function token_state(token) {
        // base goes an extra level deep when mode backdrops are used, e.g. spellchecker on
        return token.state.base.base || token.state.base;
    }

    function code_type(cm, line_num, line, firstTok, lastTok) {
        /*
         * Return "single", "indented", "fenced" or false
         *
         * cm and line_num are required.  Others are optional for efficiency
         *   To check in the middle of a line, pass in firstTok yourself.
         */
        line = line || cm.getLineHandle(line_num);
        firstTok = firstTok || cm.getTokenAt({
            line: line_num,
            ch: 1
        });
        lastTok = lastTok || (!!line.text && cm.getTokenAt({
            line: line_num,
            ch: line.text.length - 1
        }));
        let types = firstTok.type ? firstTok.type.split(" ") : [];
        if (lastTok && token_state(lastTok).indentedCode) {
            // have to check last char, since first chars of first line aren"t marked as indented
            return "indented";
        } else if (types.indexOf("comment") === -1) {
            // has to be after "indented" check, since first chars of first indented line aren"t marked as such
            return false;
        } else if (token_state(firstTok).fencedChars || token_state(lastTok).fencedChars || fencing_line(line)) {
            return "fenced";
        } else {
            return "single";
        }
    }

    function insertFencingAtSelection(cm, cur_start, cur_end, fenceCharsToInsert) {
        let start_line_sel = cur_start.line + 1,
            end_line_sel = cur_end.line + 1,
            sel_multi = cur_start.line !== cur_end.line,
            repl_start = fenceCharsToInsert + "\n",
            repl_end = "\n" + fenceCharsToInsert;

        if (sel_multi) {
            end_line_sel++;
        }
        // handle last char including \n or not
        if (sel_multi && cur_end.ch === 0) {
            repl_end = fenceCharsToInsert + "\n";
            end_line_sel--;
        }
        _replaceSelection(cm, false, [repl_start, repl_end]);
        cm.setSelection({
            line: start_line_sel,
            ch: 0
        }, {
            line: end_line_sel,
            ch: 0
        });
    }

    let cm = editor.codemirror,
        cur_start = cm.getCursor("start"),
        cur_end = cm.getCursor("end"),
        tok = cm.getTokenAt({
            line: cur_start.line,
            ch: cur_start.ch || 1
        }), // avoid ch 0 which is a cursor pos but not token
        line = cm.getLineHandle(cur_start.line),
        is_code = code_type(cm, cur_start.line, line, tok);
    let block_start, block_end, lineCount;

    if (is_code === "single") {
        // similar to some SimpleMDE _toggleBlock logic
        let start = line.text.slice(0, cur_start.ch).replace("`", ""),
            end = line.text.slice(cur_start.ch).replace("`", "");

        cm.replaceRange(start + end, {
            line: cur_start.line,
            ch: 0
        }, {
            line: cur_start.line,
            ch: 99999999999999
        });

        cur_start.ch--;
        if (cur_start !== cur_end) {
            cur_end.ch--;
        }

        cm.setSelection(cur_start, cur_end);
        cm.focus();
    } else if (is_code === "fenced") {
        if (cur_start.line !== cur_end.line || cur_start.ch !== cur_end.ch) {
            // use selection

            // find the fenced line so we know what type it is (tilde, backticks, number of them)
            for (block_start = cur_start.line; block_start >= 0; block_start--) {
                line = cm.getLineHandle(block_start);
                if (fencing_line(line)) {
                    break;
                }
            }
            let fencedTok = cm.getTokenAt({
                line: block_start,
                ch: 1
            });
            let fence_chars = token_state(fencedTok).fencedChars;
            let start_text, start_line;
            let end_text, end_line;
            // check for selection going up against fenced lines, in which case we don't want to add more fencing
            if (fencing_line(cm.getLineHandle(cur_start.line))) {
                start_text = "";
                start_line = cur_start.line;
            } else if (fencing_line(cm.getLineHandle(cur_start.line - 1))) {
                start_text = "";
                start_line = cur_start.line - 1;
            } else {
                start_text = fence_chars + "\n";
                start_line = cur_start.line;
            }
            if (fencing_line(cm.getLineHandle(cur_end.line))) {
                end_text = "";
                end_line = cur_end.line;
                if (cur_end.ch === 0) {
                    end_line += 1;
                }
            } else if (cur_end.ch !== 0 && fencing_line(cm.getLineHandle(cur_end.line + 1))) {
                end_text = "";
                end_line = cur_end.line + 1;
            } else {
                end_text = fence_chars + "\n";
                end_line = cur_end.line + 1;
            }
            if (cur_end.ch === 0) {
                // full last line selected, putting cursor at beginning of next
                end_line -= 1;
            }
            cm.operation(() => {
                // end line first, so that line numbers don't change
                cm.replaceRange(end_text, {
                    line: end_line,
                    ch: 0
                }, {
                    line: end_line + (end_text ? 0 : 1),
                    ch: 0
                });
                cm.replaceRange(start_text, {
                    line: start_line,
                    ch: 0
                }, {
                    line: start_line + (start_text ? 0 : 1),
                    ch: 0
                });
            });
            cm.setSelection({
                line: start_line + (start_text ? 1 : 0),
                ch: 0
            }, {
                line: end_line + (start_text ? 1 : -1),
                ch: 0
            });
            cm.focus();
        } else {
            // no selection, search for ends of this fenced block
            let search_from = cur_start.line;
            if (fencing_line(cm.getLineHandle(cur_start.line))) { // gets a little tricky if cursor is right on a fenced line
                if (code_type(cm, cur_start.line + 1) === "fenced") {
                    block_start = cur_start.line;
                    search_from = cur_start.line + 1; // for searching for "end"
                } else {
                    block_end = cur_start.line;
                    search_from = cur_start.line - 1; // for searching for "start"
                }
            }
            if (block_start === undefined) {
                for (block_start = search_from; block_start >= 0; block_start--) {
                    line = cm.getLineHandle(block_start);
                    if (fencing_line(line)) {
                        break;
                    }
                }
            }
            if (block_end === undefined) {
                lineCount = cm.lineCount();
                for (block_end = search_from; block_end < lineCount; block_end++) {
                    line = cm.getLineHandle(block_end);
                    if (fencing_line(line)) {
                        break;
                    }
                }
            }
            cm.operation(() => {
                cm.replaceRange("", {
                    line: block_start,
                    ch: 0
                }, {
                    line: block_start + 1,
                    ch: 0
                });
                cm.replaceRange("", {
                    line: block_end - 1,
                    ch: 0
                }, {
                    line: block_end,
                    ch: 0
                });
            });
            cm.focus();
        }
    } else if (is_code === "indented") {
        if (cur_start.line !== cur_end.line || cur_start.ch !== cur_end.ch) {
            // use selection
            block_start = cur_start.line;
            block_end = cur_end.line;
            if (cur_end.ch === 0) {
                block_end--;
            }
        } else {
            // no selection, search for ends of this indented block
            for (block_start = cur_start.line; block_start >= 0; block_start--) {
                line = cm.getLineHandle(block_start);
                if (line.text.match(/^\s*$/)) {
                    // empty or all whitespace - keep going
                    // continue;
                } else {
                    if (code_type(cm, block_start, line) !== "indented") {
                        block_start += 1;
                        break;
                    }
                }
            }
            lineCount = cm.lineCount();
            for (block_end = cur_start.line; block_end < lineCount; block_end++) {
                line = cm.getLineHandle(block_end);
                if (line.text.match(/^\s*$/)) {
                    // empty or all whitespace - keep going
                    // continue;
                } else {
                    if (code_type(cm, block_end, line) !== "indented") {
                        block_end -= 1;
                        break;
                    }
                }
            }
        }
        // if we are going to un-indent based on a selected set of lines, and the next line is indented too, we need to
        // insert a blank line so that the next line(s) continue to be indented code
        let next_line = cm.getLineHandle(block_end + 1),
            next_line_last_tok = next_line && cm.getTokenAt({
                line: block_end + 1,
                ch: next_line.text.length - 1
            }),
            next_line_indented = next_line_last_tok && token_state(next_line_last_tok).indentedCode;

        if (next_line_indented) {
            cm.replaceRange("\n", {
                line: block_end + 1,
                ch: 0
            });
        }

        for (let i = block_start; i <= block_end; i++) {
            cm.indentLine(i, "subtract"); // TODO: this doesn't get tracked in the history, so can't be undone :(
        }

        cm.focus();
    } else {
        // insert code formatting
        let no_sel_and_starting_of_line = (cur_start.line === cur_end.line && cur_start.ch === cur_end.ch && cur_start.ch === 0);
        let sel_multi = cur_start.line !== cur_end.line;

        if (no_sel_and_starting_of_line || sel_multi) {
            insertFencingAtSelection(cm, cur_start, cur_end, fenceCharsToInsert);
        } else {
            _replaceSelection(cm, false, ["`", "`"]);
        }
    }
}

/**
 * Action for toggling blockquote.
 */
function toggleBlockquote(editor) {
    let cm = editor.codemirror;
    _toggleLine(cm, "quote");
}

/**
 * Action for toggling heading size: normal -> h1 -> h2 -> h3 -> h4 -> h5 -> h6 -> normal
 */
function toggleHeadingSmaller(editor) {
    let cm = editor.codemirror;
    _toggleHeading(cm, "smaller");
}

/**
 * Action for toggling heading size: normal -> h6 -> h5 -> h4 -> h3 -> h2 -> h1 -> normal
 */
function toggleHeadingBigger(editor) {
    let cm = editor.codemirror;
    _toggleHeading(cm, "bigger");
}

/**
 * Action for toggling heading size 1
 */
function toggleHeading1(editor) {
    let cm = editor.codemirror;
    _toggleHeading(cm, undefined, 1);
}

/**
 * Action for toggling heading size 2
 */
function toggleHeading2(editor) {
    let cm = editor.codemirror;
    _toggleHeading(cm, undefined, 2);
}

/**
 * Action for toggling heading size 3
 */
function toggleHeading3(editor) {
    let cm = editor.codemirror;
    _toggleHeading(cm, undefined, 3);
}

/**
 * Action for toggling ul.
 */
function toggleUnorderedList(editor) {
    let cm = editor.codemirror;
    _toggleLine(cm, "unordered-list");
}

/**
 * Action for toggling ol.
 */
function toggleOrderedList(editor) {
    let cm = editor.codemirror;
    _toggleLine(cm, "ordered-list");
}

/**
 * Action for clean block (remove headline, list, blockquote code, markers)
 */
function cleanBlock(editor) {
    let cm = editor.codemirror;
    _cleanBlock(cm);
}

/**
 * Action for drawing a link.
 */
function drawLink(editor) {
    let cm = editor.codemirror;
    let stat = getState(cm);
    let options = editor.options;
    let url = "http://";

    if (options.promptURLs) {
        url = prompt(options.promptTexts.link);
        if (!url) {
            return false;
        }
    }
    _replaceSelection(cm, stat.link, options.insertTexts.link, url);
}

/**
 * Action for drawing an img.
 */
function drawImage(editor) {
    let cm = editor.codemirror;
    let stat = getState(cm);
    let options = editor.options;
    let url = "http://";

    if (options.promptURLs) {
        url = prompt(options.promptTexts.image);
        if (!url) {
            return false;
        }
    }

    _replaceSelection(cm, stat.image, options.insertTexts.image, url);
}

/**
 * Action for drawing a table.
 */
function drawTable(editor) {
    let cm = editor.codemirror;
    let stat = getState(cm);
    let options = editor.options;

    _replaceSelection(cm, stat.table, options.insertTexts.table);
}

/**
 * Action for drawing a horizontal rule.
 */
function drawHorizontalRule(editor) {
    let cm = editor.codemirror;
    let stat = getState(cm);
    let options = editor.options;

    _replaceSelection(cm, stat.image, options.insertTexts.horizontalRule);
}

/**
 * Undo action.
 */
function undo(editor) {
    let cm = editor.codemirror;
    cm.undo();
    cm.focus();
}

/**
 * Redo action.
 */
function redo(editor) {
    let cm = editor.codemirror;
    cm.redo();
    cm.focus();
}

/**
 * Toggle side by side preview
 */
function toggleSideBySide(editor) {
    let cm = editor.codemirror;
    let wrapper = cm.getWrapperElement();
    let preview = wrapper.nextSibling;
    let toolbarButton = editor.toolbarElements["side-by-side"];
    let useSideBySideListener = false;

    if (/editor-preview-active-side/.test(preview.className)) {
        preview.className = preview.className.replace(
            /\s*editor-preview-active-side\s*/g, ""
        );
        toolbarButton.className = toolbarButton.className.replace(/\s*active\s*/g, "");
        wrapper.className = wrapper.className.replace(/\s*CodeMirror-sided\s*/g, " ");
    } else {
        // When the preview button is clicked for the first time,
        // give some time for the transition from editor.css to fire and the view to slide from right to left,
        // instead of just appearing.
        setTimeout(() => {
            if (!cm.getOption("fullScreen")) {
                toggleFullScreen(editor);
            }
            preview.className += " editor-preview-active-side";
        }, 1);
        toolbarButton.className += " active";
        wrapper.className += " CodeMirror-sided";
        useSideBySideListener = true;
    }

    // Hide normal preview if active
    let previewNormal = wrapper.lastChild;
    if (/editor-preview-active/.test(previewNormal.className)) {
        previewNormal.className = previewNormal.className.replace(
            /\s*editor-preview-active\s*/g, ""
        );
        let toolbar = editor.toolbarElements.preview;
        let toolbar_div = wrapper.previousSibling;
        toolbar.className = toolbar.className.replace(/\s*active\s*/g, "");
        toolbar_div.className = toolbar_div.className.replace(/\s*disabled-for-preview*/g, "");
    }

    let sideBySideRenderingFunction = () => {
        preview.innerHTML = editor.options.previewRender(editor.value(), preview);
    };

    if (!cm.sideBySideRenderingFunction) {
        cm.sideBySideRenderingFunction = sideBySideRenderingFunction;
    }

    if (useSideBySideListener) {
        preview.innerHTML = editor.options.previewRender(editor.value(), preview);
        cm.on("update", cm.sideBySideRenderingFunction);
    } else {
        cm.off("update", cm.sideBySideRenderingFunction);
    }

    // Refresh to fix selection being off (#309)
    cm.refresh();
}

/**
 * Preview action.
 */
function togglePreview(editor) {
    let cm = editor.codemirror;
    let wrapper = cm.getWrapperElement();
    let toolbar_div = wrapper.previousSibling;
    let toolbar = editor.options.toolbar ? editor.toolbarElements.preview : false;
    let preview = wrapper.lastChild;

    if (!preview || !/editor-preview/.test(preview.className)) {
        preview = document.createElement("div");
        preview.className = "editor-preview";
        wrapper.appendChild(preview);
    }

    if (/editor-preview-active/.test(preview.className)) {
        preview.className = preview.className.replace(
            /\s*editor-preview-active\s*/g, ""
        );

        if (toolbar) {
            toolbar.className = toolbar.className.replace(/\s*active\s*/g, "");
            toolbar_div.className = toolbar_div.className.replace(/\s*disabled-for-preview*/g, "");
        }
    } else {
        // When the preview button is clicked for the first time,
        // give some time for the transition from editor.css to fire and the view to slide from right to left,
        // instead of just appearing.
        setTimeout(() => {
            preview.className += " editor-preview-active";
        }, 1);

        if (toolbar) {
            toolbar.className += " active";
            toolbar_div.className += " disabled-for-preview";
        }
    }

    preview.innerHTML = editor.options.previewRender(editor.value(), preview);

    // Turn off side by side if needed
    let sidebyside = cm.getWrapperElement().nextSibling;
    if (/editor-preview-active-side/.test(sidebyside.className)) {
        toggleSideBySide(editor);
    }
}

function _replaceSelection(cm, active, startEnd, url) {
    if (/editor-preview-active/.test(cm.getWrapperElement().lastChild.className)) {
        return;
    }

    let text;
    let start = startEnd[0];
    let end = startEnd[1];
    let startPoint = cm.getCursor("start");
    let endPoint = cm.getCursor("end");

    if (url) {
        end = end.replace("#url#", url);
    }

    if (active) {
        text = cm.getLine(startPoint.line);
        start = text.slice(0, startPoint.ch);
        end = text.slice(startPoint.ch);
        cm.replaceRange(start + end, {
            line: startPoint.line,
            ch: 0
        });
    } else {
        text = cm.getSelection();
        cm.replaceSelection(start + text + end);

        startPoint.ch += start.length;
        if (startPoint !== endPoint) {
            endPoint.ch += start.length;
        }
    }

    cm.setSelection(startPoint, endPoint);
    cm.focus();
}


function _toggleHeading(cm, direction, size) {
    if (/editor-preview-active/.test(cm.getWrapperElement().lastChild.className)) {
        return;
    }

    let startPoint = cm.getCursor("start");
    let endPoint = cm.getCursor("end");

    for (let i = startPoint.line; i <= endPoint.line; i++) {
        (function (i) {
            let text = cm.getLine(i);
            let currHeadingLevel = text.search(/[^#]/);

            if (direction !== undefined) {
                if (currHeadingLevel <= 0) {
                    if (direction === "bigger") {
                        text = "###### " + text;
                    } else {
                        text = "# " + text;
                    }
                } else if (currHeadingLevel === 6 && direction === "smaller") {
                    text = text.substr(7);
                } else if (currHeadingLevel === 1 && direction === "bigger") {
                    text = text.substr(2);
                } else {
                    if (direction === "bigger") {
                        text = text.substr(1);
                    } else {
                        text = "#" + text;
                    }
                }
            } else {
                if (size === 1) {
                    if (currHeadingLevel <= 0) {
                        text = "# " + text;
                    } else if (currHeadingLevel === size) {
                        text = text.substr(currHeadingLevel + 1);
                    } else {
                        text = "# " + text.substr(currHeadingLevel + 1);
                    }
                } else if (size === 2) {
                    if (currHeadingLevel <= 0) {
                        text = "## " + text;
                    } else if (currHeadingLevel === size) {
                        text = text.substr(currHeadingLevel + 1);
                    } else {
                        text = "## " + text.substr(currHeadingLevel + 1);
                    }
                } else {
                    if (currHeadingLevel <= 0) {
                        text = "### " + text;
                    } else if (currHeadingLevel === size) {
                        text = text.substr(currHeadingLevel + 1);
                    } else {
                        text = "### " + text.substr(currHeadingLevel + 1);
                    }
                }
            }

            cm.replaceRange(text, {
                line: i,
                ch: 0
            }, {
                line: i,
                ch: 99999999999999
            });
        })(i);
    }

    cm.focus();
}

function _toggleLine(cm, name) {
    if (/editor-preview-active/.test(cm.getWrapperElement().lastChild.className)) {
        return;
    }

    let stat = getState(cm);
    let startPoint = cm.getCursor("start");
    let endPoint = cm.getCursor("end");
    let repl = {
        "quote": /^(\s*)>\s+/,
        "unordered-list": /^(\s*)([*\-+])\s+/,
        "ordered-list": /^(\s*)\d+\.\s+/
    };
    let map = {
        "quote": "> ",
        "unordered-list": "* ",
        "ordered-list": "1. "
    };

    for (let i = startPoint.line; i <= endPoint.line; i++) {
        (function (i) {
            let text = cm.getLine(i);

            if (stat[name]) {
                text = text.replace(repl[name], "$1");
            } else {
                text = map[name] + text;
            }

            cm.replaceRange(text, {
                line: i,
                ch: 0
            }, {
                line: i,
                ch: 99999999999999
            });
        })(i);
    }
    cm.focus();
}

function _toggleBlock(editor, type, start_chars, end_chars) {
    if (/editor-preview-active/.test(editor.codemirror.getWrapperElement().lastChild.className)) {
        return;
    }

    end_chars = (typeof end_chars === "undefined") ? start_chars : end_chars;
    let cm = editor.codemirror;
    let stat = getState(cm);

    let text;
    let start = start_chars;
    let end = end_chars;

    let startPoint = cm.getCursor("start");
    let endPoint = cm.getCursor("end");

    if (stat[type]) {
        text = cm.getLine(startPoint.line);
        start = text.slice(0, startPoint.ch);
        end = text.slice(startPoint.ch);
        if (type === "bold") {
            start = start.replace(/(\*\*|__)(?![\s\S]*(\*\*|__))/, "");
            end = end.replace(/(\*\*|__)/, "");
        } else if (type === "italic") {
            start = start.replace(/([*_])(?![\s\S]*([*_]))/, "");
            end = end.replace(/([*_])/, "");
        } else if (type === "strikethrough") {
            start = start.replace(/(\*\*|~~)(?![\s\S]*(\*\*|~~))/, "");
            end = end.replace(/(\*\*|~~)/, "");
        }

        cm.replaceRange(start + end, {
            line: startPoint.line,
            ch: 0
        }, {
            line: startPoint.line,
            ch: 99999999999999
        });

        if (type === "bold" || type === "strikethrough") {
            startPoint.ch -= 2;
            if (startPoint !== endPoint) {
                endPoint.ch -= 2;
            }
        } else if (type === "italic") {
            startPoint.ch -= 1;
            if (startPoint !== endPoint) {
                endPoint.ch -= 1;
            }
        }
    } else {
        text = cm.getSelection();
        if (type === "bold") {
            text = text.split("**").join("");
            text = text.split("__").join("");
        } else if (type === "italic") {
            text = text.split("*").join("");
            text = text.split("_").join("");
        } else if (type === "strikethrough") {
            text = text.split("~~").join("");
        }

        cm.replaceSelection(start + text + end);

        startPoint.ch += start_chars.length;
        endPoint.ch = startPoint.ch + text.length;
    }

    cm.setSelection(startPoint, endPoint);
    cm.focus();
}

function _cleanBlock(cm) {
    if (/editor-preview-active/.test(cm.getWrapperElement().lastChild.className)) {
        return;
    }

    let startPoint = cm.getCursor("start");
    let endPoint = cm.getCursor("end");
    let text;

    for (let line = startPoint.line; line <= endPoint.line; line++) {
        text = cm.getLine(line);
        text = text.replace(/^[ ]*([# ]+|\*|-|[> ]+|[0-9]+(.|\)))[ ]*/, "");

        cm.replaceRange(text, {
            line: line,
            ch: 0
        }, {
            line: line,
            ch: 99999999999999
        });
    }
}

// Merge the properties of one object into another.
// function _mergeProperties(target, source) {
//     for (let property in source) {
//         if (source.hasOwnProperty(property)) {
//             if (source[property] instanceof Array) {
//                 target[property] = source[property].concat(target[property] instanceof Array ? target[property] : []);
//             } else if (
//                 source[property] !== null &&
//                 typeof source[property] === "object" &&
//                 source[property].constructor === Object
//             ) {
//                 target[property] = _mergeProperties(target[property] || {}, source[property]);
//             } else {
//                 target[property] = source[property];
//             }
//         }
//     }
//
//     return target;
// }

// Merge an arbitrary number of objects into one.
// function extend(target) {
//     for (var i = 1; i < arguments.length; i++) {
//         target = _mergeProperties(target, arguments[i]);
//     }
//
//     return target;
// }

/* The right word count in respect for CJK. */
function wordCount(data) {
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

var insertTexts = {
    link: ["[", "](#url#)"],
    image: ["![](", "#url#)"],
    table: ["", "\n\n| Column 1 | Column 2 | Column 3 |\n| -------- | -------- | -------- |\n| Text     | Text     | Text     |\n\n"],
    horizontalRule: ["", "\n\n-----\n\n"]
};

var promptTexts = {
    link: "URL for the link:",
    image: "URL of the image:"
};

var blockStyles = {
    "bold": "**",
    "code": "```",
    "italic": "*"
};