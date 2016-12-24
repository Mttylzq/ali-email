/**
 * Created by luzq on 2016/12/24.
 */
var aliEmail = require("./index");
var accessKeyID     = process.env.ALI_SMS_ACCESSKEYID || 'bVMwAU5StA8XpohG';
var accessKeySecret = process.env.ALI_SMS_ACCESSKEYSECRET || 'dibXGzHwcaIjrPhgGkXUX9cBYGU4Lb';

var configSingle = {
    action            :'BatchSendMail',
    accessKeyID       : accessKeyID,
    accessKeySecret   : accessKeySecret,
    accountName       :'service@abc.com',
    templateName      :'test',
    receiversName      :'test',
};
aliEmail(configSingle, function(err, body){
    console.log(err);
    console.log(body);
});
