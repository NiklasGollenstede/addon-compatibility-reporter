self.port.on("init", function(data) {
    console.log("Initializing submit report dialog for: " + data.guid);

    document.getElementById("addon").textContent = data.addon;
    document.getElementById("version").textContent = data.version;
    document.getElementById("addon-image").src = data.iconURL;
    //document.getElementById("application").textContent = data.application;
    //document.getElementById("operatingSystem").textContent = data.operatingSystem;

    var submit = function(comment) {
        var submitData = {
            guid: data.guid,
            details: comment,
            includeAddons: false/*document.getElementById("includeAddons").checked*/,
            disableAddon: false/*document.getElementById("disableAddon").checked*/
        };
        self.port.emit("submit_report", submitData);
        document.getElementById("skipcomment").style.display = 'none';
        document.getElementById("buttons").style.display = 'none';
        document.getElementById("spinner").style.display = 'block';
    };

    document.getElementById("submitReportButton").addEventListener("click",
	function() { submit(document.getElementById("details").value); },
	true);

    document.getElementById("skipcommenta").addEventListener("click",
	function() { submit(""); },
	true);

    setTimeout(function() {
        document.getElementById("details").focus();
    }, 500);
});

self.port.on("submit_report_error", function(data) {
    document.getElementById("spinner").style.display = 'none';
    document.getElementById("error").style.display = 'block';
});

self.port.on("submit_report_success", function(data) {
    document.getElementById("spinner").style.display = 'none';
    document.getElementById("success").style.display = 'block';
});

document.getElementById("closeButton").addEventListener("click", function() { self.port.emit("user_closed_panel"); }, true);

