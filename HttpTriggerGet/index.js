module.exports = async function (context) {
    context.log('JavaScript HTTP trigger function processed a request.');

    var appreglistin = context.binding.appreglistin;

    if (appreglistin.length == 0) {
        context.res = {
            status: 500,
            body: "Error retriving IDs"
        };
    }
    else {
        context.bindings.appreglistout = appreglistin[0];
        context.bindings.appreglistout.used = true;
        context.bindings.appreglistout.projecttag = projecttag;

        context.res = {
            // status: 200, /* Defaults to 200 */
            body: appreglistin[0].id
        };
    }

    context.done();
}