fetch("/website/json/website_data.json")
    .then(e => e.json())
    .then(data => {
        getId("lastupdateon").replace({ "lastupdateon_size": data.filesize.lastupdateon })
        getId("git_folder").replace({ "git_bytes": data.filesize.git_folder });
        getId("assets_folder").replace({ "assets_bytes": data.filesize.assets_folder });
        getId("project_folder").replace({ "projects_bytes": data.filesize.project_folder });
        getId("the_rest").replace({ "other_bytes": data.filesize.the_rest });
        getId("total_size").replace({ "total_bytes": data.filesize.total_size });

        function fetch_() {
            // var key = ""; ["0x67", "0x68", "0x70", "0x5f", "0x30", "0x4d", "0x55", "0x58", "0x77", "0x52", "0x6e", "0x4a", "0x78", "0x38", "0x35", "0x63", "0x74", "0x37", "0x34", "0x4d", "0x37", "0x69", "0x41", "0x4a", "0x59", "0x6f", "0x46", "0x67", "0x32", "0x38", "0x31", "0x33", "0x43", "0x33", "0x31", "0x37", "0x52", "0x70", "0x4a", "0x6f"]["forEach"]((a) => {key += String["fromCharCode"](Number(a))})
            // fetch(`https://api.github.com/repos/QuanMCPC/QuanMCPC.github.io/stats/contributors?nocache=${Math.round(Math.random() * 1000000)}`, { headers: { "accept": "application/vnd.github.v3+json", "Authorization": `token ${key}` } })
            //     .then(e => e.json())
            //     .then(e_ => {
            //         if (e_.message) {
            //             innerHTMLClass("numberofcommit", "Failed to get data from GitHub API, this maybe due to number of request exceeded for your current IP. Please see the number of commit on: https://github.com/QuanMCPC/QuanMCPC.github.io")
            //         } else if (!(e_[0].weeks)) {
            //             innerHTMLClass("numberofcommit", "Re-fetching, please wait...")
            //             setTimeout(fetch_, 2000);
            //         } else {
            //             utcTime = e_[0].weeks[e_[0].weeks.length - 1].w
            //             var d_ = new Date(utcTime * 1000)
            //             innerHTMLClass("lastupdateon1", d_.toUTCString());
            //             innerHTMLClass("numberofcommit", e_[0].total);
            //         }
            //     })
            fetch(`/website/json/commit_data.json?nocache=${Math.round(Math.random() * 100000)}`)
                .then(e => e.json())
                .then(e => {
                    getId("numberofcommit").replace({ "commit": e.data.length, "lastupdateon_commit": e.last_update_on });
                })
        }
        fetch_();
    })
function date_check() {
    var date1 = new Date("07/16/2020"), date2 = new Date(),
        DInTime = date2.getTime() - date1.getTime(),
        DInDays = Math.round(DInTime / (1000 * 3600 * 24))
    getId("days_from").replace({ "age": DInDays.toString() })
}
document.addEventListener("DOMContentLoaded", date_check);