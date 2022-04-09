function innerHTMLClass(clas, text) { qSelAll(`.${clas}`).forEach((elem) => { elem.innerHTML = text; }); }
fetch("/website/json/website_data.json")
    .then(e => e.json())
    .then(data => {
    qSel("#git_folder").innerHTML = data.filesize.git_folder;
    qSel("#assets_folder").innerHTML = data.filesize.assets_folder;
    qSel("#project_folder").innerHTML = data.filesize.project_folder;
    qSel("#the_rest").innerHTML = data.filesize.the_rest;
    qSel("#total_size").innerHTML = data.filesize.total_size;
    qSel(".lastupdateon").innerHTML = data.filesize.lastupdateon;
    function fetch_() {
        fetch(`/website/json/commit_data.json?nocache=${Math.round(Math.random() * 100000)}`)
            .then(e => e.json())
            .then(e => {
            innerHTMLClass("lastupdateon1", e.last_update_on);
            innerHTMLClass("numberofcommit", e.data.length);
        });
    }
    fetch_();
});
function date_check() {
    var date1 = new Date("07/16/2020"), date2 = new Date(), DInTime = date2.getTime() - date1.getTime(), DInDays = Math.round(DInTime / (1000 * 3600 * 24));
    innerHTMLClass("days_from", DInDays.toString());
}
document.addEventListener("DOMContentLoaded", date_check);
//# sourceMappingURL=info.js.map