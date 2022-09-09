fetch("/website/json/website_data.json")
    .then(e => e.json())
    .then(data => {
    getId("git_folder").replace({ "bytes": data.filesize.git_folder });
    getId("assets_folder").replace({ "bytes": data.filesize.assets_folder });
    getId("project_folder").replace({ "bytes": data.filesize.project_folder });
    getId("the_rest").replace({ "bytes": data.filesize.the_rest });
    getId("total_size").replace({ "bytes": data.filesize.total_size });
    function fetch_() {
        fetch(`/website/json/commit_data.json?nocache=${Math.round(Math.random() * 100000)}`)
            .then(e => e.json())
            .then(e => {
            getId("numberofcommit").replace({ "commit": e.data.length, "lastupdateon": e.last_update_on });
        });
    }
    fetch_();
});
function date_check() {
    var date1 = new Date("07/16/2020"), date2 = new Date(), DInTime = date2.getTime() - date1.getTime(), DInDays = Math.round(DInTime / (1000 * 3600 * 24));
    getId("days_from").replace({ "age": DInDays.toString() });
}
document.addEventListener("DOMContentLoaded", date_check);
//# sourceMappingURL=info.js.map