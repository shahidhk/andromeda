var photo;

var ready = function ready() {
    alert("Ready");
}

document.addEventListener("deviceready", ready, false);

function onDeviceReady() {
    // Retrieve image file location from specified source
    navigator.camera.getPicture(
        storePhotoFile,
        function(message) { alert('get picture failed'); },
        {
                quality         : 50,
                destinationType : navigator.camera.DestinationType.FILE_URI,
                sourceType      : navigator.camera.PictureSourceType.PHOTOLIBRARY
        }
    );
}
function onCamReady() {
    // Retrieve image file location from specified source
    navigator.camera.getPicture(
            storePhotoCam,
            function(message) { alert('get picture failed'); },
            {
                    quality         : 10,
                    destinationType : navigator.camera.DestinationType.FILE_URI,
                    sourceType      : navigator.camera.PictureSourceType.CAMERA
            }
    );
}
function storePhotoFile(imageURI){
    photo = imageURI;
    var img = document.getElementById('picture');
    img.style.display ='block';
    img.src = imageURI;
}

var storePhotoCam = function storePhotoCam(imageURI){
    photo = imageURI;
    alert(imageURI);

    window.resolveLocalFileSystemURI(
        imageURI,
        gotFileObject,
        function(error){ alert(JSON.stringify(error)) }
    )

    var gotFileObject = function gotFileObject(file){
        alert(JSON.stringify(file));
        
        steroids.on('ready', function() {
            var targetDirURI = "file://" + steroids.app.absoluteUserFilesPath
            alert(targetDirURI);
            var fileName = "user_pic.jpg"
            
            window.resolveLocalFileSystemURI(
                targetDirURI,
                function(directory){
                    file.moveTo(
                        directory,
                        fileName,
                        fileMoved,
                        function(error){
                            alert(JSON.stringify(error))
                        }
                    )
                },
                function(error){ alert(JSON.stringify(error)) }
            );
        });

        var fileMoved = function fileMoved(file){
            var imageSrc = "/" + file.name + "?" + ((new Date()).getTime());
            alert(imageSrc);
            var img = document.getElementById('picture');
            img.style.display ='block';
            img.src = imageSrc;
        }
    }
}

var uploadPhoto = function uploadPhoto() {
    var options = new FileUploadOptions();
    options.fileKey="image";
    options.fileName=photo.substr(photo.lastIndexOf('/')+1);
    options.mimeType="image/jpeg";

    var params = {};
    params.name = document.getElementById('name').value;
    params.description = document.getElementById('description').value;

    options.params = params;

    var ft = new FileTransfer();
    ft.upload(photo, encodeURI("http://192.168.2.14:1234/api/kadai/"), win, fail, options);
}

var win = function win(r) {
    alert("Upload done!")
    webView = new steroids.views.WebView("/views/kadai/list.html");
    steroids.layers.push(webView);
    console.log("Code = " + r.responseCode);
    console.log("Response = " + r.response);
    console.log("Sent = " + r.bytesSent);
}

var fail = function fail(error) {
    alert("An error has occurred: Code = " + JSON.stringify(error));
    console.log("upload error source " + error.source);
    console.log("upload error target " + error.target);
}
