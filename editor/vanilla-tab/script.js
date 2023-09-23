// script for vanilla tab
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
let current_active_tab = 0;

let currentTab = 0;

function addEventTab() {
    $$("div.tab").forEach((x) => {
        const Tab_Stripe = x.querySelector(".tab-stripe");
        const Tab_Content = x.querySelector(".tab-content");
        const Tab_Stripe_a = [...Tab_Stripe.children];
        const Tab_Content_div = [...Tab_Content.children];

        function SetTab(index) {
            Tab_Stripe_a[current_active_tab].classList.remove("active");
            Tab_Content_div[current_active_tab].classList.remove("active");

            Tab_Stripe_a[index].classList.add("active");
            Tab_Content_div[index].classList.add("active");
            current_active_tab = index;
        }

        if (location.hash) {
            const UrlTab = Tab_Content.querySelector(location.hash);
            iOfUrlTab = Tab_Content_div.indexOf(UrlTab);
            iOfUrlTab = iOfUrlTab === -1 ? 0 : iOfUrlTab;
            SetTab(iOfUrlTab);
        }

        Tab_Stripe_a.forEach(
            (x, index) => (
                (x.onclick = (e) => {
                    SetTab(index);
                    e.preventDefault();
                }),
                x.addEventListener("contextmenu", (e) => {
                    e.preventDefault(); // Prevent the default context menu
                    contextMenu.style.display = "block";
                    contextMenu.style.left = e.clientX + "px";
                    contextMenu.style.top = e.clientY + "px";
                    currentTab = index;
                    // console.log(`button ${x.innerHTML} clicked`)
                })
            )
        );
    });

    // Functions for drag scrolling, scroll-button hiding & full-screen button
    $$(".tab").forEach((x) => {
        const Tab_Stripe = x.querySelector(".tab-stripe");
        const Left_Button = x.querySelector(".tab-scroll-button.left");
        const Right_Button = x.querySelector(".tab-scroll-button.right");
        const Full_screen_Button = x.querySelector(".tab-full-screen-button");

        Full_screen_Button.onclick = () => {
            if (document.fullscreenElement) document.exitFullscreen();
            else x.requestFullscreen();
        };

        // Tab Scroll Button Start
        function update_steps() {
            let steps = Tab_Stripe.clientWidth - 100;
            function Scroll(steps) {
                Tab_Stripe.scrollLeft += steps;
            }
            Left_Button.onclick = () => Scroll(-steps);
            Right_Button.onclick = () => Scroll(steps);
        }
        update_steps();
        window.addEventListener("resize", update_steps);
        // Tab Scroll Button End

        // Tab Scroll Button Hiding Start
        function check_scroll() {
            let current_scroll_pos = Tab_Stripe.scrollLeft;
            let container_width = Tab_Stripe.clientWidth;
            let scrollable_width = Tab_Stripe.scrollWidth;
            let scroll_start_offset = 20;
            let scroll_end_offset =
                scrollable_width - container_width - scroll_start_offset;

            if (current_scroll_pos <= scroll_start_offset) {
                Left_Button.classList.add("hidden");
                Right_Button.classList.remove("hidden");
            } else if (current_scroll_pos < scroll_end_offset) {
                Left_Button.classList.remove("hidden");
                Right_Button.classList.remove("hidden");
            } else if (current_scroll_pos >= scroll_end_offset) {
                Left_Button.classList.remove("hidden");
                Right_Button.classList.add("hidden");
            }
        }
        Tab_Stripe.addEventListener("scroll", check_scroll);
        // Tab Scroll Button Hiding End

        // MouseDown -> MouseMove To Scroll
        let isDown;
        let startX;
        let scrollLeft;
        // Switch To Global(Window) Event Listener https://htmldom.dev/drag-to-scroll/
        // ↳ isDown = 1, ONLY when target coming from Tab_Stripe
        Tab_Stripe.addEventListener("mousedown", (e) => {
            isDown = 1;
            startX = e.pageX - Tab_Stripe.offsetLeft;
            scrollLeft = Tab_Stripe.scrollLeft;
            Tab_Stripe.classList.add("active");
            e.preventDefault();
        });
        Tab_Stripe.addEventListener("mouseleave", () => {
            isDown = 0;
            Tab_Stripe.classList.remove("active");
        });
        Tab_Stripe.addEventListener("mouseup", () => {
            isDown = 0;
            Tab_Stripe.classList.remove("active");
        });
        Tab_Stripe.addEventListener("mousemove", (e) => {
            if (!isDown) return;
            const x = e.pageX - Tab_Stripe.offsetLeft;
            const scroll = (x - startX) * 2;
            Tab_Stripe.scrollLeft = scrollLeft - scroll;
            e.preventDefault();
        });
    });
}

addEventTab();
// Hide the context menu when clicking outside of it
document.addEventListener("click", () => {
    contextMenu.style.display = "none";
});

const deletedTab = (index) => {
    // console.log(`tab ${index} deleted`);

    const Tab_Stripe = document.querySelector(".tab-stripe");
    const Tab_Content = document.querySelector(".tab-content");
    const Tab_Stripe_a = [...Tab_Stripe.children];
    const Tab_Content_div = [...Tab_Content.children];
    let size = Tab_Stripe_a.length;
    // console.log(Tab_Content_div);
    if (size == 1) {
        alert("Không thể xóa khi có 1 tab!");
        return;
    }

    if (confirm(`Bạn có chắc chắn muốn xóa tab ${index + 1}`) == true) {
        Tab_Stripe_a[size - 1].remove();
        for (let i = index; i < size - 1; i++) {
            Tab_Content_div[i].innerHTML = Tab_Content_div[i + 1].innerHTML;
        }
        Tab_Content_div[size - 1].remove();
    }
};

const tabMoveLeft = (index) => {
    const Tab_Content = document.querySelector(".tab-content");
    const Tab_Content_div = [...Tab_Content.children];
    let size = Tab_Content_div.length;
    if (size > 1 && index > 0) {
        if (
            confirm(
                `Bạn có chắc chắn muốn di chuyển tab ${index + 1} sang trái`
            ) == true
        ) {
            [
                Tab_Content_div[index].innerHTML,
                Tab_Content_div[index - 1].innerHTML,
            ] = [
                Tab_Content_div[index - 1].innerHTML,
                Tab_Content_div[index].innerHTML,
            ];
        }
    }
};

const tabMoveRight = (index) => {
    const Tab_Stripe = document.querySelector(".tab-stripe");
    const Tab_Content = document.querySelector(".tab-content");
    const Tab_Stripe_a = [...Tab_Stripe.children];
    const Tab_Content_div = [...Tab_Content.children];
    let size = Tab_Stripe_a.length;
    if (size > 1 && index < size - 1) {
        if (
            confirm(
                `Bạn có chắc chắn muốn di chuyển tab ${index + 1} sang phải`
            ) == true
        ) {
            [
                Tab_Content_div[index].innerHTML,
                Tab_Content_div[index + 1].innerHTML,
            ] = [
                Tab_Content_div[index + 1].innerHTML,
                Tab_Content_div[index].innerHTML,
            ];
        }
    }
};

// Log the name of the clicked item when a context menu item is clicked
document.querySelectorAll(".context-menu-item").forEach((item) => {
    item.addEventListener("click", () => {
        // console.log(`${item.textContent.trim()}`);
        let s = item.textContent.trim();
        switch (s) {
            case "Delete": {
                deletedTab(currentTab);
                break;
            }
            case "Insert": {
                addTab(currentTab);
                break;
            }
            case "Move left": {
                // console.log("left");
                tabMoveLeft(currentTab);
                break;
            }
            case "Move right": {
                // console.log("right");

                tabMoveRight(currentTab);
                break;
            }
        }
    });
});

function addTab(index) {
    var tabStripe = document.querySelector(".tab-stripe");
    var tabContent = document.querySelector(".tab-content");
    var tabContent_div = [...tabContent.children];

    // tabStripe.outerHTML
    var size = [...tabStripe.children].length;
    // console.log(size);
    var a = document.createElement("a");
    a.innerHTML = size + 1;
    a.href = `#Tab1-Q${size + 1}`;

    var divTab = tabContent_div[0].cloneNode(true);
    divTab.classList.remove("active");
    divTab.querySelector("#text-input").innerHTML = "";
    tabStripe.appendChild(a);
    tabContent.insertBefore(divTab, tabContent_div[index + 1]);
    tabContent_div = [...tabContent.children];
    // console.log(tabContent_div);
    for (let i = 0; i <= size; i++) tabContent_div[i].id = `#Tab1-Q${i + 1}`;
    //readd event to new tab
    addEventTab();
}

const saveVanillaTab = () => {
    var data = document.documentElement.outerHTML;
    // console.log(data);
    // Create a POST request to the server
    fetch("saveData.php", {
        method: "POST",
        body: data,
        headers: {
            "Content-Type": "text/plain",
        },
    })
        .then((response) => response.text())
        .then((result) => {
            console.log(result);
            alert("Saved");
        })
        .catch((error) => {
            console.error("Error:", error);
        });
};

const publishForUser = () => {
    var doc = document.cloneNode(true);
    //remove .container, atribute conteneditable, .context-menu, #excute
    doc.querySelector(".container").remove();
    doc.querySelector(".context-menu").remove();
    doc.querySelector("#excute").remove();
    doc.querySelectorAll("#text-input").forEach((value) => {
        value.removeAttribute("contenteditable");
    });
    var data = doc.querySelector("html").innerHTML;

    fetch("publishUser.php", {
        method: "POST",
        body: data,
        headers: {
            "Content-Type": "text/plain",
        },
    })
        .then((response) => response.text())
        .then((result) => {
            console.log(result);
            alert("Published");
        })
        .catch((error) => {
            console.error("Error:", error);
        });
};

const exportTab = () => {
    saveVanillaTab();
    const currentDate = new Date();

    // Get the various components of the date and time
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1; // Month is 0-based, so add 1
    const day = currentDate.getDate();
    const hour = currentDate.getHours();
    const minute = currentDate.getMinutes();
    const second = currentDate.getSeconds();
    var version = `${hour}${minute}${second}_${day}${month}${year}`;

    if (confirm(`Xuất version: ${version} ra file json`)) {
        fetch("exportData.php")
            .then((response) => response.text())
            .then((code) => {
                const blob = new Blob([code], { type: "application/json" });
                const url = URL.createObjectURL(blob);

                const a = document.createElement("a");
                a.href = url;
                // const jsonCode = JSON.stringify({ code: code });
                a.download = `ebook_${version}.json`;
                a.click();
                URL.revokeObjectURL(url);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }
};

const importTab = () => {
    // Create a hidden input element of type 'file'
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = ".json"; // Specify accepted file types, if needed

    fileInput.click();

    fileInput.addEventListener("change", function (event) {
        const file = event.target.files[0];

        if (file) {
            // Check if the file has a .json extension
            if (file.name.endsWith(".json")) {
                const reader = new FileReader();
                reader.onload = function (event) {
                    try {
                        const jsonData = JSON.parse(event.target.result);
                        console.log("JSON Data:", jsonData);

                        fetch("importData.php", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify(jsonData),
                        })
                            .then((response) => response.json())
                            .then((data) => {
                                console.log(data.message);
                            })
                            .catch((error) => {
                                console.error("Error:", error);
                            });
                    } catch (error) {
                        console.error("Invalid JSON File:", error);
                    }
                };

                reader.readAsText(file);
            } else {
                console.log("File is not a JSON file.");
            }
        } else {
            console.log("No file selected.");
        }
        // Remove the hidden input element
        fileInput.remove();
        location.reload();
    });
};
