/**
 * Invoke page script which is tightly bound to the the same html page.
 * Below the are several variable definations __MUST__ be changed to reflect deployment location.
*/
var
    partnerId = CONFIG.partnerId,
	ss2domain = (partnerId=='cumuluspro')?"http://devscan-share.cumuluspro.com/":"http://scan-share.cloudapp.net/",
    // URL for fetching SS2 Localhost from server this url will have to change for local, staging and production deployment
    urlLhSS2 = ss2domain + partnerId + "/en/download/StartConfigure.exe",
    // URL for SS1(Scan-Store) Thank You page where download begins
    urlSS1ThankYou = "http://devscan-store.cloudapp.net/" + partnerId + "/en/invoke/thankyou/index.htm",
    // URL for SS2(Scan-Share) Thank You page where download beigns
    urlSS2ThankYou = ss2domain + partnerId + "/en/invoke/thankyou/index.htm",
    // URL for redirecting user to Scan-Store ScanAppp
    urlScanStore = 'http://devscan-store.cloudapp.net/' + partnerId +'/en/scanapp/default.htm',
    // URL for redirecting user to Scan-Share ScanApp
    urlScanShare = ss2domain + partnerId + "/en/scanapp/share",
    // Localhost communication URL
    urlVersion = "http://localhost:8989/CumulusService.svc/jsonp/GetFileVersion?callback=?",
    urlDetail = "http://localhost:8989/CumulusService.svc/jsonp/GetFileVersionDetails?callback=?",
    urlUpgrade = "http://localhost:8989/CumulusService.svc/jsonp/ActivateUpgradeFromUrl?callback=?",
    // for wait overlay
    $waitOverlay = $('<div class="modal-backdrop fade in hide">').append('<div class="wait-icon-box waitIcon">').appendTo(document.body);

/**
 * Utility function to parse version string from localhost to a object
 */
function localhostVersionParse(str) {
    // Check if valid versin string
    if(!/^[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+$/.test(str)) {
        return false;
    }

    var versionTuple = str.split('.');
    var versionObj =  {
        _rawVersion: str,
        major: versionTuple[0],
        minor: versionTuple[1],
        patch: versionTuple[2],
        build: versionTuple[3],
        toString: function() {
            return this.major + '.' + this.minor + '.' + this.patch + '.' + this.build;
        },
        toJSON: function() {
            return this.toString();
        }
    };

    // Can upgrade silently
	if((versionObj.major >= 1 && versionObj.minor >= 0 && versionObj.patch >= 0 && versionObj.build >= 78) // cater for 1.0.0.78 on wards
            || (versionObj.major >= 1 && versionObj.minor >= 1)) {// cater for 1.1.x onwards
        versionObj.canSilentUpgrade = true;
    } else {
        versionObj.canSilentUpgrade = false;
    }

    // Has new API FileVersionDetails
    if((versionObj.major >= 1 && versionObj.minor >= 0 && versionObj.patch >= 0 && versionObj.build >= 78) // cater for 1.0.0.78 on wards
            || (versionObj.major >= 1 && versionObj.minor >= 1)) {// cater for 1.1.x onwards
        versionObj.hasAdditionalVersionDetail = true;
    } else {
        versionObj.hasAdditionalVersionDetail = false;
    }
    return versionObj;
}

function _check_alive(options) {
    var config = $.extend(
        // default config
        {
            timeout: 350,
            retry: 10,
            url: urlVersion,
            urlDetail: urlDetail,
            checkIsSS2: false
        },
        // Override config with options
        options
    );
    var
    retries = config.retry;
    function _req() {
        return $.ajax({
            url: config.url,
            dataType: 'json',
            timeout: config.timeout
        }).pipe(
        // Path to Heaven
        function(versionStr) {
			$waitOverlay.addClass('hide');
            //$waitOverlay.hide();
            var version = localhostVersionParse(versionStr);
            if(version.hasAdditionalVersionDetail) {
                return $.ajax({
                    url: config.urlDetail,
                    dataType: 'json'
                }).pipe(function(versionDetail) {
                    version.detail = versionDetail;
                    // Check if SS2 should be checked
                    // iff is not SS2 retry
                    // iff is SS2 jsut return version info down
                    if(config.checkIsSS2) {
                        if(version.detail.Product !== 'ss2') {
                            if (retries-- > 1) {
                                return _req();
                            }
                        }
                    }
                    return version;
                });
            } else {
                if(config.checkIsSS2) {
                    if(version.detail.Product !== 'ss2') {
                        if (retries-- > 1) {
                            return _req();
                        }
                    }
                }
                return version;
            }
        },
        // Hell Gate
        function () {
            if (retries-- > 1) {
                return _req();
            }
			$waitOverlay.addClass('hide');
            //$waitOverlay.hide();
        });
    }

    return _req();
}

$(document).ready(function () {

    var check_alive = _check_alive();

    /**
     * Current Sequence of upgrade
     * 1. Click SS2 -> LH{product=SS1} -> request upgrade -> [1a|1b]
     * 1a. Click Upgrade -> Initiate upgrade by sending to thank you page.
     * 1b. Click x or press Escape -> new tab Scan-store
     * 2. Click SS2 -> LH{product=SS2} -> new tab Scan-Share.
     */

     /**
      * Handles for #btn-ss2 click's check_alive good flow.
      */
    var itsAlive = function(scanPlusVersion) {
        // If LH is ss1 product the user must upgrade
        if(scanPlusVersion.hasAdditionalVersionDetail && scanPlusVersion.detail.Product == 'ss1') {
            $("#UpgradeModel").modal({
                show: true,
                backdrop: 'static'
            });

        } else {
            window.location.href = urlScanShare; //-- SS2::scanapp
        }
    };

    /**
      * Handles for #btn-ss1 click's check_alive good flow.
      * It checks the runing scanplus version to decide where to redirect
      * based on scenario below
      * LH{VersionDetail.Product == SS1} -> redirect to Scan-Store ScanApp
      * LH{VersionDetail.Product == SS2} -> redirect to Scan-Share ScanApp
      */
    var itsAliveSS1 = function(scanPlusVersion) {
        if(scanPlusVersion.hasAdditionalVersionDetail && scanPlusVersion.detail.Product == 'ss2') {
            window.location.href = urlScanShare;
        } else {
            window.location.href = urlScanStore;
        }
    };

    /**
      * Handles for #btn-ss2 click's check_alive bad flow.
      */
    var itsDead = function() {
        $("#myModal").modal({
            show: true,
            backdrop: 'static'
        });
        $('#btn-ss2').removeClass('disabled');
		$waitOverlay.removeClass('show');
        $waitOverlay.addClass('hide');
        //$waitOverlay.hide();
    };

    /**
      * Handles for #btn-ss1 click's check_alive bad flow.
      */
    var itsDeadSS1 = function() {
        $("#myModalSS1").modal({
            show: true,
            backdrop: 'static'
        });
        $('#btn-ss1').removeClass('disabled');
		$waitOverlay.removeClass('show');
        $waitOverlay.addClass('hide');
        //$waitOverlay.hide();
    };

    $('#btn-ss2').live("click", function() {
        var $this = $(this);
        if ($this.hasClass('disabled')) return;
        $this.addClass('disabled');
        $waitOverlay.addClass('show');
        if (!check_alive.isResolved() && !check_alive.isRejected()) {
            check_alive.then(itsAlive).fail(itsDead);
            return;
        } else {
            // If Alive/Has reponse
            if (check_alive.isResolved()) {
                check_alive.then(itsAlive);
            };

            // If Connection timeout
            if (check_alive.isRejected()) {
                check_alive = _check_alive().then(itsAlive).fail(itsDead);
            };
        }

        //$waitOverlay.hide();
		$waitOverlay.addClass('hide');
        $this.removeClass('disabled');
    });
    //-- #btn-ss2 --
    $('#btn-ss1').live("click", function () {
        var $this = $(this);
        if ($this.hasClass('disabled')) return;
        $this.addClass('disabled');
        $waitOverlay.addClass('show');
        if (!check_alive.isResolved() && !check_alive.isRejected()) {
            check_alive.then(itsAliveSS1).fail(itsDeadSS1);
            return;
        } else {
            // If Alive/Has reponse
            if (check_alive.isResolved()) {
                check_alive.then(itsAliveSS1);
            };

            // If Connection timeout
            if (check_alive.isRejected()) {
                check_alive = _check_alive().then(itsAliveSS1).fail(itsDeadSS1);
            };
        }
		$waitOverlay.addClass('hide');
        //$waitOverlay.hide();
        $this.removeClass('disabled');
    });
    //-- #btn-ss1 --
});

/**
 * Accept Policy for SS2 button handle
 */
function Accept_Policy() {
    if (document.getElementById('optionsCheckboxList1').checked) {
        window.location.href = urlSS2ThankYou;
        $('#myModal').modal('hide');
    }
    else
        document.getElementById('AcceptPolicy').focus = true;
}

/**
 * Accept Policy for SS1 button handle
 */
function Accept_PolicySS1() {
    if (document.getElementById('optionsCheckboxListSS1').checked) {
        window.location.href = urlSS1ThankYou;
        $('#myModalSS1').modal('hide');
    }
    else
        document.getElementById('AcceptPolicySS1').focus = true;
}

/**
 * Accept Policy for Upgrade to SS2 button handle
 */
function Accept_PolicyUpgrade(options) {
    // set default options
    var _options = $.extend({onlyCheckUpgrade: false}, options || {});
    if (document.getElementById('optionsCheckboxUpgrade').checked) {
        $('#UpgradeModel').modal('hide');
        var upgradeProgressModal = $("#UpgradeInProgressModel").modal({
            show: true,
            backdrop: 'static',
            keyboard: false
        });

        // Setup timeout modal
        var upgradeTimeoutModal = $('#UpgradeTimeout').modal({
            show: false,
            backdrop: 'static',
            keyboard: false
        });
        upgradeTimeoutModal.on('click', '.action-retry', function() {
            upgradeTimeoutModal.modal('hide');
            Accept_PolicyUpgrade({onlyCheckUpgrade: true});
        });
        upgradeTimeoutModal.on('click', '.action-try-later', function() {
            check_alive = $.Deferred().reject();
            upgradeTimeoutModal.modal('hide');
        });

        // Iff flag onlyCheckUpgrade is false then skip invoking upgrade
        if(!_options.onlyCheckUpgrade) {
            $.ajax({
                url: urlUpgrade,
                dataType: 'json',
                data: {
                    url: urlLhSS2
                }
            });
        }
        // Check localhost is alive or not within 10 minutes and 2 seconds
        setTimeout(function() {
            _check_alive({
                timeout: 1000,
                retry: 300,
                checkIsSS2: true
            }).then(function(scanPlusVersion) {
                var upgradeCompleteNSuccessModal = $("#UpgradeCompleteNSuccess").modal({
                    show: false,
                    backdrop: 'static',
                    keyboard: false
                });
                upgradeCompleteNSuccessModal.on('click', '.btn', function() {
                    upgradeCompleteNSuccessModal.modal('hide');
                });
                upgradeCompleteNSuccessModal.on('hide', function() {
                    window.location.href = urlScanShare;
                });

                // Hide previous modal and show the new 1
                upgradeProgressModal.modal('hide');
                upgradeCompleteNSuccessModal.modal('show');
            }).fail(function() {
                var upgradeFailure = $("#UpgradeFailure").modal({
                    show: false,
                    backdrop: 'static',
                    keyboard: false
                });
                upgradeFailure.on('click', '.btn', function() {
                    upgradeFailure.modal('hide');
                });
                upgradeFailure.on('hide', function() {
                    $('#btn-ss1, #btn-ss2').removeClass('disabled');
                    // to restore check_alive to rejected as when user clicks the button he will initiate new check alive
                    check_alive = $.Deferred().reject();
                });
                // Hide previous modal and show the new 1
                upgradeProgressModal.modal('hide');
                upgradeTimeoutModal.modal('show');
            });
        }, 10000);
    }
    else
        document.getElementById('Accept_PolicyUpgrade').focus = true;
}

/**
 * Redirect user to scan-store
 */
function RedirectToScanStore() {
    $('#UpgradeModel').modal('hide');
    $('#btn-ss1, #btn-ss2').removeClass('disabled');
	$waitOverlay.addClass('hide');
    //$waitOverlay.hide();
    window.location.href = urlScanStore;
    return false;
}