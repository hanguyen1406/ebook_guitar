document.querySelector("#pdf").addEventListener("click", () => {
    // alert(current_active_tab);
    $$(".tab-content").forEach((x) => {
        var imgElements =
            x.children[current_active_tab].querySelectorAll("img");

        console.log(imgElements);
    });
});
