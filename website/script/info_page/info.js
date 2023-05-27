fetch("/website/json/website_data.json")
    .then(e => e.json())
    .then(data => {
    qSel("#lastupdateon").replace({ "lastupdateon_size": data.filesize.lastupdateon });
    qSel("#git_folder").replace({ "git_bytes": data.filesize.git_folder });
    qSel("#assets_folder").replace({ "assets_bytes": data.filesize.assets_folder });
    qSel("#the_rest").replace({ "other_bytes": data.filesize.the_rest });
    qSel("#total_size").replace({ "total_bytes": data.filesize.total_size });
    function fetch_() {
        fetch(`/website/json/commit_data.json?nocache=${Math.round(Math.random() * 100000)}`)
            .then(e => e.json())
            .then(e => {
            qSel("#numberofcommit").replace({ "commit": e.data.length, "lastupdateon_commit": e.last_update_on });
        });
    }
    fetch_();
});
function date_check() {
    var date1 = new Date("07/16/2020"), date2 = new Date(), DInTime = date2.getTime() - date1.getTime(), DInDays = Math.round(DInTime / (1000 * 3600 * 24));
    qSel("#days_from").replace({ "age": DInDays.toString() });
}
document.addEventListener("DOMContentLoaded", date_check);
//# sourceMappingURL=info.js.map