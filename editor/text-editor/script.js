let optionsButtons = document.querySelectorAll(".option-button");
let advancedOptionButton = document.querySelectorAll(".adv-option-button");
let alignButtons = document.querySelectorAll(".align");
let spacingButtons = document.querySelectorAll(".spacing");
let formatButtons = document.querySelectorAll(".format");
let scriptButtons = document.querySelectorAll(".script");

let fontName = document.getElementById("fontName");
let fontSizeRef = document.getElementById("fontSize");
let writingArea = document.getElementById("text-input");
let linkButton = document.getElementById("createLink");

let fontList = [
    "Arial",
    "Verdana",
    "Times New Roman",
    "Garamond",
    "Georgia",
    "Courier New",
    "Cursive",
];

const intializer = () => {
    highlighter(alignButtons, true);
    highlighter(spacingButtons, true);
    highlighter(formatButtons, false);
    highlighter(scriptButtons, true);

    fontSizeRef.value = 3;
};

const modifyText = (command, defaultUi, value) => {
    console.log(command);
    document.execCommand(command, defaultUi, value);
};

optionsButtons.forEach((button) => {
    button.addEventListener("click", () => {
        modifyText(button.id, false, null);
    });
});

advancedOptionButton.forEach((button) => {
    button.addEventListener("change", () => {
        modifyText(button.id, false, button.value);
    });
});

const isImgUrl = (url) => {
    const imageExtensions = [
        ".jpg",
        ".jpeg",
        ".png",
        ".gif",
        ".bmp",
        "data:image",
    ];

    for (var i = 0; i < 6; i++) {
        if (url.search(imageExtensions[i]) > -1) return true;
    }
    return false;
};

function insertAtCursor(textarea, textToInsert) {
    // Get the current selection or cursor position
    const selectionStart = textarea.selectionStart;
    const selectionEnd = textarea.selectionEnd;

    // Get the textarea content before and after the cursor position
    const textBeforeCursor = textarea.value.substring(0, selectionStart);
    const textAfterCursor = textarea.value.substring(selectionEnd);

    // Insert the element or text at the cursor position
    const updatedText = textBeforeCursor + textToInsert + textAfterCursor;

    // Update the textarea content
    textarea.value = updatedText;

    // Update the cursor position to be just after the inserted text
    const newPosition = selectionStart + textToInsert.length;
    textarea.setSelectionRange(newPosition, newPosition);
}

const insertElement = (elem) => {
    var selection = window.getSelection();
    var range = selection.getRangeAt(0);

    range.deleteContents();
    range.insertNode(elem);

    range.setStartAfter(elem);
    range.setEndAfter(elem);

    selection.removeAllRanges();
    selection.addRange(range);
};

linkButton.addEventListener("click", () => {
    let userLink = prompt("Enter a URL");

    if (userLink.startsWith("http")) {
        if (userLink.search("youtube") > -1) {
            // console.log("youtube");
            userLink = userLink.split("=");
            userLink = userLink[1].split("&")[0];
            // console.log(userLink);
            // var embedCode = `<div class="container-iframe"><iframe class="responsive-iframe" src="https://www.youtube.com/embed/${userLink}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></div>`;
            var embedCode = `<iframe class="youtube-video" src="https://www.youtube.com/embed/${userLink}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`;
            var embedIframe = document.createElement("p");
            embedIframe.innerHTML = embedCode;
            insertElement(embedIframe);
        } else if (userLink.search("drive.google") > -1) {
            userLink = userLink.split("/");
            // var iframeCode = `<p><div class="hs-responsive-embed-youtube"><iframe src="https://drive.google.com/file/d/${userLink[5]}/preview" allowfullscreen allow="autoplay"></iframe></div></p>`;
            var iframeCode = `<p><iframe src="https://drive.google.com/file/d/${userLink[5]}/preview" allowfullscreen allow="autoplay"></iframe></p>`;
            var embedIframe = document.createElement("iframe");
            // console.log(iframeCode);
            insertElement(embedIframe);
            embedIframe.outerHTML = iframeCode;
        } else if (isImgUrl(userLink)) {
            // console.log("image");
            // document.execCommand("insertImage", false, userLink);
            var image = document.createElement("img");
            image.src = userLink;
            image.style.width = "100%";
            insertElement(image);
        } else modifyText("createLink", false, userLink);
    } else {
        if (isImgUrl(userLink)) {
            // console.log("image");
            // document.execCommand("insertImage", false, userLink);
            var image = document.createElement("img");
            image.src = userLink;
            image.style.width = "100%";
            insertElement(image);
        }
    }

    // modifyText(linkButton.id, false, userLink);

    var links = document
        .getElementsByClassName("tab-content")[0]
        .querySelectorAll("a");
    // console.log()
    links.forEach((value, index) => {
        value.addEventListener("click", () => {
            var url = value.href;
            window.open(url, "_blank");
        });
        value.style.cursor = "pointer";
    });
});

const highlighter = (className, needsRemoval) => {
    className.forEach((button) => {
        button.addEventListener("click", () => {
            if (needsRemoval) {
                let alreadyActive = false;
                if (button.classList.contains("active")) {
                    alreadyActive = true;
                }
                highlighterRemover(className);
                if (!alreadyActive) {
                    button.classList.add("active");
                }
            } else {
                button.classList.toggle("active");
            }
        });
    });
};

const highlighterRemover = (className) => {
    className.forEach((button) => {
        button.classList.remove("active");
    });
};

window.onload = intializer();
