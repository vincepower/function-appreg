module.exports = async function (context) {
    context.log('JavaScript HTTP trigger function processed a request.');

    var appreglistin = context.binding.appreglistin;

    if (appreglistin.length == 0) {
        context.res = {
            status: 400,
            body: "Please pass a GUID used by ARO in the URL"
        };
    }
    else {

        context.bindings.appreglistout = appreglistin[0];
        context.bindings.appreglistout.used = false;
        context.bindings.appreglistout.projecttag = null;

        context.res = {
            // status: 200, /* Defaults to 200 */
            body: appreglistin[0].id + " has been freed"
        };
    }

    context.done();
}