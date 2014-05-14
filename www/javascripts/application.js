// Display the native navigation bar with the title "Hello World!"
steroids.view.navigationBar.show("Hello World!");

// Set the WebView background color to white (effective on iOS only)
steroids.view.setBackgroundColor("#FFFFFF");

function openKadaiList(){
    webView = new steroids.views.WebView("/views/kadai/index.html");
    steroids.layers.push(webView);
}