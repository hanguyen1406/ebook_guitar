var eOutput = document.createElement("a");
var tabContent = document.querySelector(".tab-content");

var textInput = tabContent.querySelectorAll("#text-input");
// console.log("hii");
var oldTab = tabContent.cloneNode(true);
var oldTabContent = oldTab.querySelectorAll("#text-input");
textInput.forEach((item, index) => {
    // console.log(item.childNodes[0]);
    if (index > 1) {
        var a = document.createElement("a");
        a.href = "#";
        a.innerHTML = "Click để tải nội dung";
        a.addEventListener("click", () => {
            item.innerHTML = oldTabContent[index].innerHTML;
        });
        var title = item.childNodes[0];
        item.innerHTML = "";
        item.appendChild(title);
        item.appendChild(document.createElement("br"));
        item.appendChild(a);
    }
});

document.querySelector("#pdf").addEventListener("click", async () => {
    var files = [];
    $$(".tab-content").forEach((x) => {
        var images = x.children[current_active_tab].querySelectorAll("img");
        var size = images.length;
        images.forEach((image, index) => {
            convertImageToBlob(image)
                .then(async (file) => {
                    files.push(file);
                    // console.log(files);
                    if (index == size - 1) {
                        await onInputFileChange(files);
                        eOutput.setAttribute(
                            "download",
                            `tuhocguitar_${current_active_tab + 1}.pdf`
                        );

                        eOutput.click();
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        });
    });
});

async function onInputFileChange(files) {
    if (eOutput.href) URL.revokeObjectURL(eOutput.href);
    eOutput.removeAttribute("href");

    const pdfDoc = await PDFLib.PDFDocument.create();
    for (let i = 0, l = files.length; i < l; ++i) {
        const file = files[i];
        const buffer = await file.arrayBuffer();
        if (file.type == "image/jpg") {
            const image = await pdfDoc.embedJpg(buffer);
            const page = pdfDoc.addPage([image.width, image.height]);
            page.drawImage(image);
        } else if (file.type == "image/png") {
            const image = await pdfDoc.embedPng(buffer);
            const page = pdfDoc.addPage([image.width, image.height]);
            page.drawImage(image);
        }
    }

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes.buffer], { type: "application/pdf" });

    eOutput.setAttribute("href", URL.createObjectURL(blob));
}

function convertImageToBlob(imageElement) {
    return new Promise((resolve, reject) => {
        // Get the image's source URL from the image element
        const imageUrl = imageElement.src;

        fetch(imageUrl)
            .then((response) => response.blob())
            .then((blob) => {
                // Create a File object from the blob
                const fileExtension = imageUrl.includes(".png") ? "png" : "jpg";
                const file = new File([blob], `image.${fileExtension}`, {
                    type: `image/${fileExtension}`,
                });
                resolve(file);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

function smoothLoader() {}
