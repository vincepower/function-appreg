module.exports = async function (context) {
    context.log('JavaScript HTTP trigger function processed a request.');

    var projecttag = context.bindingData.projecttag;
    var appreglistin = context.bindings.appreglistin;

    if (appreglistin.length == 0) {
        context.res = {
            status: 400,
            body: projecttag+" not assigned"
        };
    } else {
        context.bindings.appreglistout = appreglistin[0];
        context.bindings.appreglistout.used = false;
        context.bindings.appreglistout.projecttag = null;

        context.res = {
            status: 200,
            body: projecttag+" has been released"
        };
    }

    context.done();
}