/**
 * Created by luzq on 2016/12/24.
 */
var aliEmail = require("./index");
var accessKeyID     = process.env.ALI_SMS_ACCESSKEYID ;
var accessKeySecret = process.env.ALI_SMS_ACCESSKEYSECRET ;

var configSingle = {
    action:'SingleSendMail',
    accessKeyID       : accessKeyID,
    accessKeySecret   : accessKeySecret,
    accountName       :'service@abc.com',
    replyToAddress    :true,
    addressType       :0,
    toAddress         :'abc@abc.com',
    fromAlias         :'sendEmailFromAlias',
    subject           :'subject',
    textBody          :'test'
};
aliEmail(configSingle, function(err, body) {
    console.log(err);
    console.log(body);
});
