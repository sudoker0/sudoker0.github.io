if ("serviceWorker" in navigator) {
        window.addEventListener("load", function() {
            navigator.serviceWorker.register('./sw.js')
            .then(function(registered)
                {console.log("Successfully")
            })
            .catch(function (err) {
                console.log("Failed: ", err)
            })
        })
    }